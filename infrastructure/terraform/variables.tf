variable "aws_region" {
  description = "AWS region for AuditFlow infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "AWS CLI profile name"
  type        = string
  default     = "default"
}

variable "environment" {
  description = "Deployment environment name"
  type        = string
  default     = "prod"
}

variable "kms_key_id" {
  description = "KMS key ID for S3 server-side encryption"
  type        = string
  default     = ""
}
