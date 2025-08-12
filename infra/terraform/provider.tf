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
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
