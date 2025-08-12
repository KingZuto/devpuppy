variable "app_name" {
  description = "Name of the application"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket for website hosting"
  type        = string
}

variable "s3_bucket_arn" {
  description = "ARN of the S3 bucket for website hosting"
  type        = string
}

variable "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  type        = string
}

variable "github_owner" {
  description = "GitHub repository owner"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

variable "github_branch" {
  description = "GitHub branch to track"
  type        = string
  default     = "dev"
}

variable "github_token" {
  description = "GitHub personal access token"
  type        = string
  sensitive   = true
}

variable "from_email" {
  description = "Email address to send from (must be verified in SES)"
  type        = string
}

variable "to_email" {
  description = "Email address to send to"
  type        = string
}
