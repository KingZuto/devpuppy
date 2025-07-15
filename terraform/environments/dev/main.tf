terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Static site hosting with S3 + CloudFront
module "static_site" {
  source = "../../modules/static-site"

  app_name    = "devpuppy"
  environment = "dev"
}
