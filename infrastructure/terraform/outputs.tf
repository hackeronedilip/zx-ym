output "acm_certificate_arn" {
  description = "ARN of the wildcard ACM certificate"
  value       = aws_acm_certificate.wildcard.arn
}

output "auditflow_bucket_name" {
  description = "S3 bucket name for evidence storage"
  value       = aws_s3_bucket.auditflow_evidence.bucket
}

output "route53_zone_id" {
  description = "Route 53 hosted zone ID for the AuditFlow domain"
  value       = aws_route53_zone.primary.zone_id
}

output "route53_name_servers" {
  description = "Nameservers for the Route 53 hosted zone"
  value       = aws_route53_zone.primary.name_servers
}
