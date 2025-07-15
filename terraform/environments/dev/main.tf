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

# CI/CD Pipeline with CodeBuild and CodePipeline
module "cicd" {
  source = "../../modules/cicd"

  app_name                   = "devpuppy"
  environment               = "dev"
  s3_bucket_name            = module.static_site.s3_bucket_name
  s3_bucket_arn             = module.static_site.s3_bucket_arn
  cloudfront_distribution_id = module.static_site.cloudfront_distribution_id
  github_owner              = var.github_owner
  github_repo               = var.github_repo
  github_branch             = var.github_branch
  github_token              = var.github_token
}
