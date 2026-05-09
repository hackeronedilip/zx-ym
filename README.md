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

## Build with Docker

- Backend:
  ```bash
  docker build -t auditflow-backend services/backend
  ```
- Frontend:
  ```bash
  docker build -t auditflow-frontend web
  ```

## CI/CD

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml` that:

- installs and builds the backend
- installs and builds the frontend
- builds and pushes Docker images to your registry
- updates Kubernetes manifests with new image tags
- commits and pushes changes to trigger ArgoCD sync

## Kubernetes Deployment

The `infrastructure/k8s/` directory contains Kustomize configurations for deploying to Kubernetes with ArgoCD.

- `base/`: Common manifests for backend and frontend
- `overlays/dev/`: Dev environment in `auditflow-dev` namespace
- `overlays/prod/`: Prod environment in `auditflow-prod` namespace

ArgoCD applications are defined in `infrastructure/argocd/` for automated deployment.

To deploy:

1. Apply ArgoCD applications: `kubectl apply -f infrastructure/argocd/`
2. ArgoCD will sync the overlays to their respective namespaces

## Route 53 DNS setup

1. Use `terraform apply` in `infrastructure/terraform` to create the Route 53 hosted zone for `dilipsecops.blog`.
   - If this is the first Terraform run, ensure the S3 state bucket exists or bootstrap Terraform with a local backend before migrating state.
2. Copy the name servers from Terraform output `route53_name_servers`.
3. In your domain registrar, replace the current nameservers for `dilipsecops.blog` with the Route 53 nameservers.
4. Configure application hosts in Route 53:
   - `auditflow.dilipsecops.blog`
   - `dev.auditflow.dilipsecops.blog`

If you use an AWS load balancer for the Kubernetes ingress controller, create Alias records for these hostnames pointing to the load balancer DNS name.

## Infrastructure

- **Terraform**: AWS baseline in `infrastructure/terraform/` with S3 buckets and ACM certificates. Uses S3 backend for state management.
- **Kubernetes**: Kustomize configurations in `infrastructure/k8s/` with base manifests and environment overlays.
- **ArgoCD**: GitOps deployment applications in `infrastructure/argocd/`.

## SaaS Completion

The implementation includes:

- Multi-tenant backend with tenant resolver middleware
- JWT authentication and tenant-scoped data access
- PostgreSQL database for persistence
- React frontend with compliance dashboards
- Docker containerization for both services
- CI/CD pipeline with image building and deployment
- Kubernetes deployment with ingress and ArgoCD

## Next steps

1. Review `docs/ARCHITECTURE.md` for architecture alignment.
2. Add AWS credentials and configure Terraform in `infrastructure/terraform`.
3. Install dependencies for the backend and frontend.
4. Implement integration services for GitHub, Jira, AWS, ArgoCD, and evidence collection.

## Notes

This repository is intentionally scaffolded to match the architecture described in the AuditFlow design document.
