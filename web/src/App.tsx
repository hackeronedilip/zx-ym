import React, { useEffect, useMemo, useState } from 'react';
import { approveEvidence, fetchAuditRequests, fetchControls, fetchEvidence, login, type AuditRequest, type ControlItem, type EvidenceItem, type LoginResult } from './api';
import './styles.css';

type Page = 'dashboard' | 'evidence' | 'auditor' | 'requests';

export function App() {
  const [username, setUsername] = useState('alice');
  const [password, setPassword] = useState('password123');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<LoginResult | null>(null);
  const [page, setPage] = useState<Page>('dashboard');
  const [controls, setControls] = useState<ControlItem[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const readyPercent = useMemo(() => {
    if (!controls.length) return 0;
    const total = controls.length;
    return Math.round(controls.reduce((sum, control) => sum + control.readiness, 0) / total);
  }, [controls]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      setLoading(true);
      const result = await login(username, password);
      setToken(result.token);
      setProfile(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (authToken: string) => {
    try {
      setLoading(true);
      const [controlsResult, evidenceResult, requestsResult] = await Promise.all([
        fetchControls(authToken),
        fetchEvidence(authToken),
        fetchAuditRequests(authToken)
      ]);
      setControls(controlsResult.controls);
      setEvidence(evidenceResult.evidence);
      setAuditRequests(requestsResult.auditRequests);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadData(token);
    }
  }, [token]);

  const handleApprove = async (id: string) => {
    if (!token) return;
    setError('');

    try {
      setLoading(true);
      const result = await approveEvidence(token, id);
      setEvidence(prev => prev.map(item => (item.id === id ? result.evidence : item)));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Approval failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setProfile(null);
    setControls([]);
    setEvidence([]);
    setAuditRequests([]);
    setPage('dashboard');
    setError('');
  };

  if (!token) {
    return (
      <div className="login-shell">
        <div className="login-panel">
          <div className="login-header">
            <div className="brand-mark">AF</div>
            <div>
              <p className="eyebrow">AuditFlow</p>
              <h1>Continuous compliance, simplified.</h1>
            </div>
          </div>

          <p className="login-description">Sign in with a sample tenant account to explore the AuditFlow compliance dashboard.</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="field">
              <label>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="alice" />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password123" />
            </div>
            <button type="submit" disabled={loading} className="primary-button">Sign in</button>
            {error && <p className="alert error">{error}</p>}
          </form>

          <div className="login-footer">
            <p>Use one of the sample accounts below:</p>
            <ul>
              <li><strong>alice</strong> / password123 — admin</li>
              <li><strong>bob</strong> / password123 — auditor</li>
              <li><strong>charlie</strong> / password123 — engineer</li>
            </ul>
          </div>
        </div>

        <div className="login-aside">
          <h2>Ready for audit-ready evidence</h2>
          <p>AuditFlow collects evidence from GitHub, Jira, Terraform, and Kubernetes, then surfaces it in a tenant-aware compliance portal.</p>
          <div className="feature-grid">
            <div className="feature-card">
              <strong>Tenant-aware</strong>
              <p>Each tenant sees only their own data and evidence.</p>
            </div>
            <div className="feature-card">
              <strong>Audit readiness</strong>
              <p>Score control coverage and view evidence gaps.</p>
            </div>
            <div className="feature-card">
              <strong>Approval workflow</strong>
              <p>Review and approve evidence with a single click.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small">AF</div>
          <div>
            <p className="sidebar-title">AuditFlow</p>
            <p className="sidebar-subtitle">Compliance workspace</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={page === 'dashboard' ? 'active' : ''} onClick={() => setPage('dashboard')}>Compliance</button>
          <button className={page === 'evidence' ? 'active' : ''} onClick={() => setPage('evidence')}>Evidence</button>
          <button className={page === 'auditor' ? 'active' : ''} onClick={() => setPage('auditor')}>Auditor</button>
          <button className={page === 'requests' ? 'active' : ''} onClick={() => setPage('requests')}>Requests</button>
        </nav>

        <div className="sidebar-footer">
          <p className="muted">Signed in as</p>
          <p className="user-name">{profile?.name}</p>
          <p className="muted">{profile?.role} | {profile?.tenantId}</p>
          <button className="secondary-button" onClick={handleLogout}>Sign out</button>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Tenant Portal</p>
            <h1>{page === 'dashboard' ? 'Compliance dashboard' : page === 'evidence' ? 'Engineering evidence' : page === 'auditor' ? 'Auditor portal' : 'Audit requests'}</h1>
          </div>
          <div className="topbar-meta">
            <span>{profile?.role.toUpperCase()}</span>
            <span>{profile?.tenantId}</span>
          </div>
        </header>

        <main className="page-body">
          {error && <div className="alert error">{error}</div>}

          {page === 'dashboard' && (
            <>
              <section className="stat-grid">
                <article className="stat-card">
                  <p className="stat-label">Audit readiness</p>
                  <h2>{readyPercent}%</h2>
                  <p className="muted">Based on current control coverage</p>
                </article>
                <article className="stat-card">
                  <p className="stat-label">Control count</p>
                  <h2>{controls.length}</h2>
                  <p className="muted">Controls tracked for this tenant</p>
                </article>
                <article className="stat-card">
                  <p className="stat-label">Pending evidence</p>
                  <h2>{evidence.filter(item => item.status === 'pending').length}</h2>
                  <p className="muted">Items awaiting approval</p>
                </article>
              </section>

              <section className="section-card">
                <div className="section-title">
                  <div>
                    <h2>Control health</h2>
                    <p>Key compliance controls and current readiness.</p>
                  </div>
                </div>
                <div className="grid-column">
                  {controls.map(control => (
                    <div className="card" key={control.id}>
                      <div className="card-heading">
                        <span>{control.code}</span>
                        <strong>{control.name}</strong>
                      </div>
                      <p>{control.description}</p>
                      <div className="card-footer">
                        <span className="badge status">{control.readiness}% ready</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {page === 'evidence' && (
            <section className="section-card">
              <div className="section-title">
                <div>
                  <h2>Evidence repository</h2>
                  <p>Review captured artifacts for the current tenant.</p>
                </div>
              </div>
              {evidence.length === 0 ? (
                <div className="card empty-card">No evidence items found for this tenant.</div>
              ) : (
                <div className="table-card">
                  <div className="table-row table-header">
                    <span>Title</span>
                    <span>Status</span>
                    <span>Created</span>
                    <span>Action</span>
                  </div>
                  {evidence.map(item => (
                    <div className="table-row" key={item.id}>
                      <span>
                        <strong>{item.title}</strong>
                        <p className="muted">{item.details}</p>
                      </span>
                      <span><span className={`badge ${item.status}`}>{item.status}</span></span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      <span>
                        {item.status === 'pending' ? (
                          <button className="small-button" onClick={() => handleApprove(item.id)} disabled={loading}>Approve</button>
                        ) : (
                          <span className="muted">No action</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {page === 'auditor' && (
            <section className="section-card">
              <div className="section-title">
                <div>
                  <h2>Auditor portal</h2>
                  <p>Read-only evidence view for audit verification.</p>
                </div>
              </div>
              <div className="grid-column">
                {evidence.map(item => (
                  <div className="card" key={item.id}>
                    <div className="card-heading">
                      <strong>{item.title}</strong>
                      <span className={`badge ${item.status}`}>{item.status}</span>
                    </div>
                    <p>{item.details}</p>
                    <div className="card-footer">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page === 'requests' && (
            <section className="section-card">
              <div className="section-title">
                <div>
                  <h2>Audit requests</h2>
                  <p>Active audit tasks and evidence gaps.</p>
                </div>
              </div>
              <div className="grid-column">
                {auditRequests.length === 0 ? (
                  <div className="card empty-card">No audit requests available.</div>
                ) : auditRequests.map(request => (
                  <div className="card" key={request.id}>
                    <div className="card-heading">
                      <strong>{request.title}</strong>
                      <span className="badge status">{request.state}</span>
                    </div>
                    <p>{request.description}</p>
                    <div className="card-footer">
                      <span>Requested {new Date(request.requestedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
