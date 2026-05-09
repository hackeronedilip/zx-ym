# AuditFlow

AuditFlow is a production-grade multi-tenant SaaS platform for compliance evidence automation, built to support SOC 2, ISO 27001, HIPAA, PCI-DSS, and enterprise audit workflows.

## Project structure

- `docs/` - architecture and design documentation
- `infrastructure/terraform/` - Terraform baseline for AWS infrastructure
- `services/backend/` - backend API service skeleton for tenant-aware evidence workflows
- `web/` - frontend portal skeleton for compliance dashboards and auditor access

## What’s included

- Multi-tenant architecture notes
- Tenant resolver middleware pattern
- AWS infrastructure baseline using Terraform
- Starter backend service with tenant context propagation
- Frontend scaffolding for AuditFlow portal UI

## Run locally

1. Start the backend:
   ```bash
   cd services/backend
   npm install
   npm run dev
   ```
2. Start the frontend:
   ```bash
   cd ../web
   npm install
   cp .env.example .env
   npm run dev
   ```

## Next steps

1. Review `docs/ARCHITECTURE.md` for architecture alignment.
2. Add AWS credentials and configure Terraform in `infrastructure/terraform`.
3. Install dependencies for the backend and frontend.
4. Implement integration services for GitHub, Jira, AWS, ArgoCD, and evidence collection.

## Notes

This repository is intentionally scaffolded to match the architecture described in the AuditFlow design document.
