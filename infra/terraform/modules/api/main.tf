# Random ID for unique resource naming
resource "random_id" "api_suffix" {
  byte_length = 4
  
  keepers = {
    environment = var.environment
  }
}

# DynamoDB Table for Rate Limiting
resource "aws_dynamodb_table" "rate_limit" {
  name           = "${var.app_name}-${var.environment}-rate-limit-${random_id.api_suffix.hex}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }

  tags = {
    Name        = "${var.app_name}-${var.environment}-rate-limit-${random_id.api_suffix.hex}"
    Environment = var.environment
  }
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "${var.app_name}-${var.environment}-lambda-role-${random_id.api_suffix.hex}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.app_name}-${var.environment}-lambda-role-${random_id.api_suffix.hex}"
    Environment = var.environment
  }
}

# IAM Policy for Lambda
resource "aws_iam_role_policy" "lambda_policy" {
  role = aws_iam_role.lambda_role.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ]
        Resource = aws_dynamodb_table.rate_limit.arn
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      }
    ]
  })
}

# Lambda Function with inline code
resource "aws_lambda_function" "contact_email" {
  function_name = "${var.app_name}-${var.environment}-contact-email-${random_id.api_suffix.hex}"
  role         = aws_iam_role.lambda_role.arn
  handler      = "index.handler"
  runtime      = "nodejs18.x"
  timeout      = 30

  # Inline code instead of ZIP file
  filename         = "${path.module}/lambda_function.zip"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.rate_limit.name
      FROM_EMAIL     = var.from_email
      TO_EMAIL       = var.to_email
    }
  }

  tags = {
    Name        = "${var.app_name}-${var.environment}-contact-email-${random_id.api_suffix.hex}"
    Environment = var.environment
  }
}

# Create ZIP file from source code
data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "${path.module}/lambda_function.zip"
  source {
    content = file("${path.module}/lambda_source.js")
    filename = "index.js"
  }
}

# API Gateway
resource "aws_api_gateway_rest_api" "contact_api" {
  name        = "${var.app_name}-${var.environment}-contact-api-${random_id.api_suffix.hex}"
  description = "Contact form API for ${var.app_name}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name        = "${var.app_name}-${var.environment}-contact-api-${random_id.api_suffix.hex}"
    Environment = var.environment
  }
}

# API Gateway Resource
resource "aws_api_gateway_resource" "send_email" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  parent_id   = aws_api_gateway_rest_api.contact_api.root_resource_id
  path_part   = "send-email"
}

# API Gateway Method
resource "aws_api_gateway_method" "send_email_post" {
  rest_api_id   = aws_api_gateway_rest_api.contact_api.id
  resource_id   = aws_api_gateway_resource.send_email.id
  http_method   = "POST"
  authorization = "NONE"
}

# API Gateway Integration
resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.send_email.id
  http_method = aws_api_gateway_method.send_email_post.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.contact_email.invoke_arn
}

# Lambda Permission for API Gateway
resource "aws_lambda_permission" "api_gateway_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_email.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.contact_api.execution_arn}/*/*"
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "contact_api_deployment" {
  depends_on = [
    aws_api_gateway_method.send_email_post,
    aws_api_gateway_integration.lambda_integration,
  ]

  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  stage_name  = var.environment

  lifecycle {
    create_before_destroy = true
  }
}

# CORS Configuration
resource "aws_api_gateway_method" "send_email_options" {
  rest_api_id   = aws_api_gateway_rest_api.contact_api.id
  resource_id   = aws_api_gateway_resource.send_email.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "send_email_options_integration" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.send_email.id
  http_method = aws_api_gateway_method.send_email_options.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

resource "aws_api_gateway_method_response" "send_email_options_200" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.send_email.id
  http_method = aws_api_gateway_method.send_email_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "send_email_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.send_email.id
  http_method = aws_api_gateway_method.send_email_options.http_method
  status_code = aws_api_gateway_method_response.send_email_options_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Store API Gateway URL in Parameter Store for dynamic configuration
resource "aws_ssm_parameter" "api_gateway_url" {
  name        = "/${var.app_name}/${var.environment}/api-gateway-url"
  description = "API Gateway endpoint URL for contact form"
  type        = "String"
  value       = "https://${aws_api_gateway_rest_api.contact_api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}"

  tags = {
    Name        = "${var.app_name}-${var.environment}-api-url-param"
    Environment = var.environment
  }
}

# Store complete contact API endpoint
resource "aws_ssm_parameter" "contact_api_endpoint" {
  name        = "/${var.app_name}/${var.environment}/contact-api-endpoint"
  description = "Complete contact form API endpoint URL"
  type        = "String"
  value       = "https://${aws_api_gateway_rest_api.contact_api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}/send-email"

  tags = {
    Name        = "${var.app_name}-${var.environment}-contact-endpoint-param"
    Environment = var.environment
  }
}

# trigger