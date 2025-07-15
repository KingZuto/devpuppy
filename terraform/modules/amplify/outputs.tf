output "app_id" {
  description = "Amplify App ID"
  value       = aws_amplify_app.devpuppy.id
}

output "app_arn" {
  description = "Amplify App ARN"
  value       = aws_amplify_app.devpuppy.arn
}

output "default_domain" {
  description = "Default domain for the Amplify app"
  value       = aws_amplify_app.devpuppy.default_domain
}

output "branch_url" {
  description = "URL for the main branch"
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.devpuppy.default_domain}"
}

output "custom_domain_url" {
  description = "Custom domain URL (if configured)"
  value       = var.domain_name != "" ? "https://${var.domain_name}" : null
}
