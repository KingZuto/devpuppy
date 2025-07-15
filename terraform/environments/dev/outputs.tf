output "app_id" {
  description = "Amplify App ID"
  value       = module.amplify.app_id
}

output "app_url" {
  description = "Application URL"
  value       = module.amplify.branch_url
}

output "custom_domain_url" {
  description = "Custom domain URL"
  value       = module.amplify.custom_domain_url
}
