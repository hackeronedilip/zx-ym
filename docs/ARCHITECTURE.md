# AuditFlow Architecture

## Overview

AuditFlow is a multi-tenant compliance evidence automation platform designed to collect audit evidence continuously from GitHub, Jira, ServiceNow, AWS, Kubernetes, Terraform, and ArgoCD.

## Key goals

- Continuous evidence collection and mapping to compliance controls
- Tenant-aware access via vanity subdomains
- Read-only auditor portal for approved evidence
- Immutable audit log, tamper-evident artifacts, and long-term retention
- Hybrid tenant isolation with pooled default tenancy and optional siloed enterprise provisioning

## Core components

- `Tenant Resolver` — resolves tenant by subdomain and injects `tenant_id` into requests
- `Auth Service` — issues JWT tokens with tenant claims and RBAC scopes
- `Integration Service` — harvests evidence from external tools and maps artifacts to controls
- `Approval Workflow` — review and sign-off for evidence before auditor consumption
- `Trust Portal` — read-only access for auditors and enterprise customers
- `Audit Log` — immutable record of approvals and evidence changes

## Multi-tenant model

- Wildcard DNS for tenant subdomains: `*.auditflow.com`
- Tenant ID propagated via JWT claims and `X-Tenant-Id`
- Tenant-aware database access using PostgreSQL RLS and tenant-scoped S3 prefixes
- Default model: pooled Aurora PostgreSQL with RLS
- Optional enterprise model: dedicated clusters, dedicated EKS node groups, dedicated KMS CMKs

## AWS infrastructure

- CloudFront + WAF for ingress and edge security
- ALB / API Gateway for API traffic
- EKS for containerized backend services
- Aurora PostgreSQL for tenant data
- S3 for evidence storage with tenant-prefixed keys
- DynamoDB or object-lock S3 for immutable audit logs
- Route 53 for wildcard and per-tenant custom domains

## Developer workflows

- GitHub Actions for CI/CD
- Terraform for infrastructure provisioning
- ArgoCD for Kubernetes deployments
- Prometheus/Grafana/Loki/OpenTelemetry for observability
- Alertmanager for incident alerting
