// Lambda function for DevPuppy Contact Form with SES integration
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // OPTIONS request handling (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { name, email, message } = body;
    
    // Input validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }
    
    // Message length limit
    if (message.length > 1000) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Message too long (max 1000 characters)' })
      };
    }
    
    // Get client IP for rate limiting
    const clientIP = event.requestContext?.identity?.sourceIp || 
                    event.headers?.['x-forwarded-for']?.split(',')[0] || 
                    'unknown';
    
    // Environment variables
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;
    const dynamoTable = process.env.DYNAMODB_TABLE;
    
    console.log('Contact form submission:', {
      name,
      email: email.substring(0, 3) + '***',
      messageLength: message.length,
      ip: clientIP,
      fromEmail: fromEmail ? fromEmail.substring(0, 5) + '***' : 'not set',
      toEmail: toEmail ? toEmail.substring(0, 5) + '***' : 'not set'
    });
    
    // Send email using AWS SDK v3 (available in Lambda runtime)
    if (fromEmail && toEmail) {
      try {
        // Use AWS SDK v3 which is available in Lambda runtime
        const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
        
        const sesClient = new SESClient({ 
          region: process.env.AWS_REGION || 'ap-northeast-2' 
        });
        
        const emailParams = {
          Source: fromEmail,
          Destination: {
            ToAddresses: [toEmail]
          },
          ReplyToAddresses: [email], // Reply goes to the sender
          Message: {
            Subject: {
              Data: `DevPuppy Contact: ${name}`,
              Charset: 'UTF-8'
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
                      <p><strong>⏰ 시간:</strong> ${new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}</p>
                    </div>
                    
                    <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <h3 style="color: #555; margin-top: 0;">💬 메시지:</h3>
                      <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                      <p style="margin: 0; color: #1976d2; font-size: 14px;">
                        💡 <strong>답장 방법:</strong> 이 이메일에 "답장" 버튼을 누르면 ${email}로 직접 답장됩니다.
                      </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #666; font-size: 12px; text-align: center;">
                      DevPuppy Contact Form | API Gateway + Lambda + SES
                    </p>
                  </div>
                `,
                Charset: 'UTF-8'
              },
              Text: {
                Data: `
🐶 DevPuppy 새 문의

👤 이름: ${name}
📧 이메일: ${email}
🌐 IP: ${clientIP}
⏰ 시간: ${new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}

💬 메시지:
${message}

---
💡 답장하려면 ${email}로 이메일을 보내세요.
DevPuppy Contact Form | API Gateway + Lambda + SES
                `,
                Charset: 'UTF-8'
              }
            }
          }
        };
        
        console.log('Sending email via SES...');
        const command = new SendEmailCommand(emailParams);
        const result = await sesClient.send(command);
        console.log('Email sent successfully:', result.MessageId);
        
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({
            message: 'Message sent successfully! I\'ll get back to you soon. 📧',
            messageId: result.MessageId,
            timestamp: new Date().toISOString(),
            contactInfo: {
              name,
              email: email.substring(0, 3) + '***',
              messageLength: message.length
            }
          })
        };
        
      } catch (sesError) {
        console.error('SES Error:', sesError);
        
        // Handle specific SES errors
        let errorMessage = 'Failed to send email. Please try again later.';
        if (sesError.name === 'MessageRejected') {
          errorMessage = 'Email was rejected. Please check your email address.';
        } else if (sesError.name === 'SendingPausedException') {
          errorMessage = 'Email sending is temporarily paused. Please try again later.';
        } else if (sesError.name === 'MailFromDomainNotVerifiedException') {
          errorMessage = 'Email domain not verified. Please contact administrator.';
        }
        
        return {
          statusCode: 500,
          headers: corsHeaders,
          body: JSON.stringify({
            error: errorMessage,
            details: sesError.message,
            errorType: sesError.name
          })
        };
      }
    } else {
      // Email configuration not set
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Email configuration not set. Please contact the administrator.',
          environment: {
            fromEmailSet: !!fromEmail,
            toEmailSet: !!toEmail,
            dynamoTableSet: !!dynamoTable
          }
        })
      };
    }
    
  } catch (error) {
    console.error('Lambda error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Internal server error. Please try again later.',
        details: error.message
      })
    };
  }
};
