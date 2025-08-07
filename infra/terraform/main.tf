terraform {
  cloud {
    organization = "jsw4562"  # 실제 조직명
    
    workspaces {
      tags = ["devpuppy"]
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Terraform Cloud 연동 테스트 - 2025.08.07
# 깔끔한 새 시작! 🚀

provider "aws" {
  region = var.aws_region
}

# 브랜치에 따른 환경 결정
locals {
  # Terraform Cloud workspace name에서 환경 추출
  # devpuppy-dev -> dev, devpuppy-prod -> prod
  environment = split("-", terraform.workspace)[1]
}

# Static site hosting with S3 + CloudFront
module "static_site" {
  source = "./modules/static-site"

  app_name    = var.app_name
  environment = local.environment
}

# CI/CD Pipeline with CodeBuild and CodePipeline
# 일단 테스트를 위해 주석 처리
# module "cicd" {
#   source = "./modules/cicd"
#
#   app_name                   = var.app_name
#   environment               = local.environment
#   s3_bucket_name            = module.static_site.s3_bucket_name
#   s3_bucket_arn             = module.static_site.s3_bucket_arn
#   cloudfront_distribution_id = module.static_site.cloudfront_distribution_id
#   github_owner              = var.github_owner
#   github_repo               = var.github_repo
#   github_branch             = var.github_branch
#   github_token              = var.github_token
# }
