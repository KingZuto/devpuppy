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
