# 공통 태그 및 네이밍 규칙
locals {
  common_prefix = "${var.app_name}-${local.environment}-"
  common_tags = {
    Environment = local.environment
    Project     = var.app_name
    ManagedBy   = "Terraform"
    Repository  = "${var.github_owner}/${var.github_repo}"
    Branch      = var.github_branch
  }
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"  # Seoul region
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "devpuppy"
}

variable "github_owner" {
  description = "GitHub repository owner"
  type        = string
  default     = "KingZuto"
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  default     = "devpuppy"
}

variable "github_branch" {
  description = "GitHub branch name"
  type        = string
  default     = "dev"
}

variable "github_token" {
  description = "GitHub personal access token"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Custom domain name (optional)"
  type        = string
  default     = ""
}

variable "from_email" {
  description = "Email address to send from (must be verified in SES)"
  type        = string
}

variable "to_email" {
  description = "Email address to send to"
  type        = string
}
