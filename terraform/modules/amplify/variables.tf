variable "app_name" {
  description = "Name of the Amplify app"
  type        = string
}

variable "github_repository" {
  description = "GitHub repository URL"
  type        = string
}

variable "github_access_token" {
  description = "GitHub personal access token"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Custom domain name (optional)"
  type        = string
  default     = ""
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "main_branch" {
  description = "Main branch name"
  type        = string
  default     = "main"
}

variable "branch_environment_variables" {
  description = "Environment variables for the branch"
  type        = map(string)
  default     = {}
}
