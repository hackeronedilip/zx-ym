import { AuditRequest, Control, EvidenceItem, Tenant, User } from './types';

export const tenants: Tenant[] = [
  { id: 'tenant-acme', name: 'Acme Corp', subdomain: 'acme' },
  { id: 'tenant-freshworks', name: 'Freshworks', subdomain: 'freshworks' }
];

export const users: User[] = [
  { id: 'user-1', username: 'alice', password: 'password123', tenantId: 'tenant-acme', role: 'admin', name: 'Alice Rivera' },
  { id: 'user-2', username: 'bob', password: 'password123', tenantId: 'tenant-acme', role: 'auditor', name: 'Bob Lee' },
  { id: 'user-3', username: 'charlie', password: 'password123', tenantId: 'tenant-freshworks', role: 'engineer', name: 'Charlie Park' }
];

export const controls: Control[] = [
  { id: 'control-cc8.1', tenantId: 'tenant-acme', code: 'CC8.1', name: 'Change Management', description: 'All production deployments are peer-reviewed and approved by an authorized engineer.', readiness: 87 },
  { id: 'control-ia-2', tenantId: 'tenant-acme', code: 'IA2', name: 'Access Control', description: 'User and service access is reviewed regularly.', readiness: 93 },
  { id: 'control-cc8.1-fresh', tenantId: 'tenant-freshworks', code: 'CC8.1', name: 'Change Management', description: 'ArgoCD deployments are validated and approved for production.', readiness: 92 }
];

export const evidence: EvidenceItem[] = [
  { id: 'evidence-1', tenantId: 'tenant-acme', title: 'GitHub PR approval for production deployment', controlId: 'control-cc8.1', status: 'approved', createdAt: '2026-05-01T10:14:00Z', details: 'PR #412 approved by senior engineer.' },
  { id: 'evidence-2', tenantId: 'tenant-acme', title: 'Terraform plan review', controlId: 'control-cc8.1', status: 'pending', createdAt: '2026-05-04T15:52:00Z', details: 'Missing review artifact for emergency hotfix.' },
  { id: 'evidence-3', tenantId: 'tenant-freshworks', title: 'Kubernetes deployment audit record', controlId: 'control-cc8.1', status: 'approved', createdAt: '2026-05-02T08:23:00Z', details: 'ArgoCD sync event captured for app payment-service.' }
];

export const auditRequests: AuditRequest[] = [
  { id: 'audit-1', tenantId: 'tenant-acme', title: 'SOC 2 Q1 2026 evidence pack', description: 'Collect deployment approvals, PR reviews, and incident RCA artifacts for Q1.', requestedAt: '2026-05-05T07:00:00Z', state: 'open' },
  { id: 'audit-2', tenantId: 'tenant-freshworks', title: 'ISO 27001 readiness review', description: 'Verify control coverage and evidence completeness.', requestedAt: '2026-05-06T11:30:00Z', state: 'in-review' }
];
