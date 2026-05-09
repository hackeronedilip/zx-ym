terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }

  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

resource "aws_s3_bucket" "auditflow_evidence" {
  bucket = "auditflow-evidence-${var.environment}"
  acl    = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "aws:kms"
        kms_master_key_id = var.kms_key_id
      }
    }
  }
}

resource "aws_acm_certificate" "wildcard" {
  domain_name       = "*.auditflow.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

output "s3_evidence_bucket" {
  value = aws_s3_bucket.auditflow_evidence.id
}
