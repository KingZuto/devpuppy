variable "app_name" {
  description = "Name of the application"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

variable "from_email" {
  description = "Email address to send from (must be verified in SES)"
  type        = string
}

variable "to_email" {
  description = "Email address to send to"
  type        = string
}
