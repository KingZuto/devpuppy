output "s3_bucket_name" {
  description = "S3 bucket name for website hosting"
  value       = module.static_site.s3_bucket_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  value       = module.static_site.cloudfront_distribution_id
}

output "website_url" {
  description = "Website URL"
  value       = module.static_site.website_url
}

# CI/CD 관련 출력
output "codebuild_project_name" {
  description = "CodeBuild project name"
  value       = module.cicd.codebuild_project_name
}

output "codepipeline_name" {
  description = "CodePipeline name"
  value       = module.cicd.codepipeline_name
}
