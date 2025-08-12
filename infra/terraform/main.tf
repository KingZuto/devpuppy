# Terraform Cloud 연동 테스트 - 2025.08.07
# 완전한 DevOps 환경 구축! 🚀
# IAM 역할 삭제 완료 - 재시도!
# 동적 이름 생성 적용 - 2025.08.08
# 태그 시스템 추가 - 2025.08.12

# 브랜치에 따른 환경 결정
locals {
  # Terraform Cloud workspace name에서 환경 추출
  # devpuppy-dev -> dev, devpuppy-prod -> prod
  environment = split("-", terraform.workspace)[1]
}

# Static site hosting with S3 + CloudFront
module "static_site" {
  source = "./modules/static-site"

  app_name      = var.app_name
  environment   = local.environment
  common_prefix = local.common_prefix
  common_tags   = local.common_tags
}

# CI/CD Pipeline with CodeBuild and CodePipeline
module "cicd" {
  source = "./modules/cicd"

  app_name                   = var.app_name
  environment               = local.environment
  aws_region                = var.aws_region
  s3_bucket_name            = module.static_site.s3_bucket_name
  s3_bucket_arn             = module.static_site.s3_bucket_arn
  cloudfront_distribution_id = module.static_site.cloudfront_distribution_id
  github_owner              = var.github_owner
  github_repo               = var.github_repo
  github_branch             = var.github_branch
  github_token              = var.github_token
  from_email                = var.from_email
  to_email                  = var.to_email
  common_prefix             = local.common_prefix
  common_tags               = local.common_tags
}

# API Gateway + Lambda for Contact Form
module "api" {
  source = "./modules/api"

  app_name      = var.app_name
  environment   = local.environment
  aws_region    = var.aws_region
  from_email    = var.from_email
  to_email      = var.to_email
  common_prefix = local.common_prefix
  common_tags   = local.common_tags
}

