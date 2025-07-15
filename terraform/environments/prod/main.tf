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

module "amplify" {
  source = "../../modules/amplify"

  app_name             = "devpuppy-prod"
  github_repository    = var.github_repository
  github_access_token  = var.github_access_token
  domain_name          = var.domain_name
  environment          = "prod"
  main_branch          = "main"

  branch_environment_variables = {
    NODE_ENV = "production"
  }
}
