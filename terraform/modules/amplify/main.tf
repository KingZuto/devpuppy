terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Amplify App
resource "aws_amplify_app" "devpuppy" {
  name       = var.app_name
  repository = var.github_repository

  # GitHub access token
  access_token = var.github_access_token

  # Build settings for Next.js
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  # Environment variables
  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "."
    AMPLIFY_DIFF_DEPLOY       = "false"
    _LIVE_UPDATES             = jsonencode([{
      pkg     = "next"
      type    = "npm"
      version = "latest"
    }])
  }

  # Enable auto branch creation
  enable_auto_branch_creation = true
  auto_branch_creation_patterns = [
    "*",
    "*/**",
  ]

  auto_branch_creation_config {
    enable_auto_build = true
  }

  # Custom rules for Next.js SPA routing
  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"
  }

  tags = {
    Name        = var.app_name
    Environment = var.environment
  }
}

# Main branch
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.devpuppy.id
  branch_name = var.main_branch

  framework = "Next.js - SSG"
  stage     = var.environment == "prod" ? "PRODUCTION" : "DEVELOPMENT"

  enable_auto_build = true

  environment_variables = var.branch_environment_variables
}

# Domain association (optional)
resource "aws_amplify_domain_association" "devpuppy" {
  count       = var.domain_name != "" ? 1 : 0
  app_id      = aws_amplify_app.devpuppy.id
  domain_name = var.domain_name

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}
