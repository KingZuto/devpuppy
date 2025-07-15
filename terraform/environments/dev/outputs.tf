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
