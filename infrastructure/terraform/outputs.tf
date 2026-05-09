output "acm_certificate_arn" {
  description = "ARN of the wildcard ACM certificate"
  value       = aws_acm_certificate.wildcard.arn
}

output "auditflow_bucket_name" {
  description = "S3 bucket name for evidence storage"
  value       = aws_s3_bucket.auditflow_evidence.bucket
}
