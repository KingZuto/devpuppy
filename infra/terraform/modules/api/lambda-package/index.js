const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { DynamoDBClient, GetItemCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');

// AWS 클라이언트 초기화
const sesClient = new SESClient({ region: process.env.AWS_REGION });
const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

// Rate limit 설정
const RATE_LIMIT = {
  maxRequests: 3,        // 최대 요청 수
  windowMs: 60 * 1000,   // 1분 (60초)
  blockDurationMs: 5 * 60 * 1000  // 5분 차단
};

// IP 주소 추출
function getClientIP(event) {
  return event.requestContext?.identity?.sourceIp || 
         event.headers?.['x-forwarded-for']?.split(',')[0] || 
         'unknown';
}

// Rate limit 체크
async function checkRateLimit(ip) {
  const now = Date.now();
  const key = `rate_limit:${ip}`;
  
  try {
    // DynamoDB에서 현재 기록 조회
    const getCommand = new GetItemCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: { S: key }
      }
    });
    
    const result = await dynamoClient.send(getCommand);
    
    if (!result.Item) {
      // 첫 요청 - 새 기록 생성
      const putCommand = new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: { S: key },
          count: { N: '1' },
          reset_time: { N: (now + RATE_LIMIT.windowMs).toString() },
          expires_at: { N: Math.floor((now + RATE_LIMIT.blockDurationMs) / 1000).toString() }
        }
      });
      
      await dynamoClient.send(putCommand);
      return { allowed: true };
    }
    
    const count = parseInt(result.Item.count.N);
    const resetTime = parseInt(result.Item.reset_time.N);
    
    if (now > resetTime) {
      // 시간 윈도우가 지났으므로 리셋
      const putCommand = new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: { S: key },
          count: { N: '1' },
          reset_time: { N: (now + RATE_LIMIT.windowMs).toString() },
          expires_at: { N: Math.floor((now + RATE_LIMIT.blockDurationMs) / 1000).toString() }
        }
      });
      
      await dynamoClient.send(putCommand);
      return { allowed: true };
    }
    
    if (count >= RATE_LIMIT.maxRequests) {
      // 제한 초과
      return { 
        allowed: false, 
        resetTime: resetTime,
        waitTime: Math.ceil((resetTime - now) / 1000)
      };
    }
    
    // 카운트 증가
    const putCommand = new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: { S: key },
        count: { N: (count + 1).toString() },
        reset_time: { N: resetTime.toString() },
        expires_at: { N: Math.floor((now + RATE_LIMIT.blockDurationMs) / 1000).toString() }
      }
    });
    
    await dynamoClient.send(putCommand);
    return { allowed: true };
    
  } catch (error) {
    console.error('Rate limit check error:', error);
    // 에러 시 허용 (fail-open)
    return { allowed: true };
  }
}

// 메인 핸들러
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  // CORS 헤더
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    // Rate limiting 체크
    const clientIP = getClientIP(event);
    const rateLimitResult = await checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return {
        statusCode: 429,
        headers: {
          ...corsHeaders,
          'Retry-After': rateLimitResult.waitTime.toString()
        },
        body: JSON.stringify({
          error: `Too many requests. Please wait ${rateLimitResult.waitTime} seconds before trying again.`,
          retryAfter: rateLimitResult.waitTime
        })
      };
    }
    
    // 요청 본문 파싱
    const body = JSON.parse(event.body || '{}');
    const { name, email, message } = body;
    
    // 입력 검증
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }
    
    // 메시지 길이 제한
    if (message.length > 1000) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Message too long (max 1000 characters)' })
      };
    }
    
    // SES 이메일 전송
    const emailParams = {
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.TO_EMAIL],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `DevPuppy Contact: ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">
                  🐶 DevPuppy 새 문의
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>👤 이름:</strong> ${name}</p>
                  <p><strong>📧 이메일:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>🌐 IP:</strong> ${clientIP}</p>
                </div>
                
                <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #555; margin-top: 0;">💬 메시지:</h3>
                  <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #1976d2; font-size: 14px;">
                    💡 <strong>답장 방법:</strong> 이 이메일에 "답장" 버튼을 누르면 ${email}로 직접 답장됩니다.
                  </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="color: #666; font-size: 12px; text-align: center;">
                  DevPuppy Contact Form (API Gateway + Lambda) | ${new Date().toLocaleString('ko-KR')}
                </p>
              </div>
            `,
            Charset: 'UTF-8',
          },
          Text: {
            Data: `
🐶 DevPuppy 새 문의

👤 이름: ${name}
📧 이메일: ${email}
🌐 IP: ${clientIP}

💬 메시지:
${message}

---
💡 답장하려면 ${email}로 이메일을 보내세요.
DevPuppy Contact Form (API Gateway + Lambda) | ${new Date().toLocaleString('ko-KR')}
            `,
            Charset: 'UTF-8',
          },
        },
      },
    };
    
    const command = new SendEmailCommand(emailParams);
    const result = await sesClient.send(command);
    
    console.log('Email sent successfully:', {
      messageId: result.MessageId,
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      ip: clientIP
    });
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: 'Message sent successfully! I\'ll get back to you soon.',
        messageId: result.MessageId
      })
    };
    
  } catch (error) {
    console.error('Lambda error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Failed to send message. Please try again later.'
      })
    };
  }
};
