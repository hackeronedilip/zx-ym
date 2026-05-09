const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const request = async (path: string, token?: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorPayload.error || response.statusText);
  }

  return response.json();
};

export interface LoginResult {
  token: string;
  tenantId: string;
  role: string;
  name: string;
}

export interface ControlItem {
  id: string;
  code: string;
  name: string;
  description: string;
  readiness: number;
}

export interface EvidenceItem {
  id: string;
  title: string;
  controlId: string;
  status: string;
  createdAt: string;
  details: string;
}

export interface AuditRequest {
  id: string;
  title: string;
  description: string;
  requestedAt: string;
  state: string;
}

export async function login(username: string, password: string): Promise<LoginResult> {
  return request('/api/login', undefined, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

export async function fetchControls(token: string) {
  return request('/api/controls', token);
}

export async function fetchEvidence(token: string) {
  return request('/api/evidence', token);
}

export async function fetchAuditRequests(token: string) {
  return request('/api/audit-requests', token);
}

export async function approveEvidence(token: string, id: string) {
  return request(`/api/evidence/${id}/approve`, token, {
    method: 'POST'
  });
}
