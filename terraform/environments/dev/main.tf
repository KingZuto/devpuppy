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

  app_name             = "devpuppy-dev"
  github_repository    = var.github_repository
  github_access_token  = var.github_access_token
  domain_name          = var.domain_name
  environment          = "dev"
  main_branch          = "dev"

  branch_environment_variables = {
    NODE_ENV = "development"
  }
}
