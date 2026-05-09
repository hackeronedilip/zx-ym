export type UserRole = 'admin' | 'auditor' | 'engineer';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  tenantId: string;
  role: UserRole;
  name: string;
}

export interface EvidenceItem {
  id: string;
  tenantId: string;
  title: string;
  controlId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  details: string;
}

export interface Control {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  description: string;
  readiness: number;
}

export interface AuditRequest {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  requestedAt: string;
  state: 'open' | 'in-review' | 'closed';
}
