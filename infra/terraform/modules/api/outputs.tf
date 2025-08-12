output "api_gateway_url" {
  description = "API Gateway endpoint URL"
  value       = "${aws_api_gateway_rest_api.contact_api.execution_arn}/${var.environment}"
}

output "api_gateway_invoke_url" {
  description = "API Gateway invoke URL"
  value       = "https://${aws_api_gateway_rest_api.contact_api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}"
}

output "dynamodb_table_name" {
  description = "DynamoDB table name for rate limiting"
  value       = aws_dynamodb_table.rate_limit.name
}

output "lambda_function_name" {
  description = "Lambda function name"
  value       = aws_lambda_function.contact_email.function_name
}
