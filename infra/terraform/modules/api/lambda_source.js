// Lambda function for DevPuppy Contact Form
// This is a simplified version without external dependencies for Terraform deployment

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
    
    // Environment variables (AWS_REGION is automatically available in Lambda)
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;
    const dynamoTable = process.env.DYNAMODB_TABLE;
    
    console.log('Contact form submission:', {
      name,
      email: email.substring(0, 3) + '***', // Log partial email for privacy
      messageLength: message.length,
      ip: clientIP,
      fromEmail: fromEmail ? fromEmail.substring(0, 5) + '***' : 'not set',
      toEmail: toEmail ? toEmail.substring(0, 5) + '***' : 'not set',
      dynamoTable: dynamoTable || 'not set'
    });
    
    // TODO: Implement rate limiting with DynamoDB
    // TODO: Implement SES email sending
    // For now, just return success with environment info
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: 'Message received! Lambda function is working correctly.',
        timestamp: new Date().toISOString(),
        region: process.env.AWS_REGION || 'unknown', // This is automatically set by AWS
        environment: {
          fromEmailSet: !!fromEmail,
          toEmailSet: !!toEmail,
          dynamoTableSet: !!dynamoTable
        }
      })
    };
    
  } catch (error) {
    console.error('Lambda error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Internal server error. Please try again later.'
      })
    };
  }
};
