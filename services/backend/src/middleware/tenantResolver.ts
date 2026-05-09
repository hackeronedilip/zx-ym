import { Request, Response, NextFunction } from 'express';

const TENANT_HOST_SUFFIX = 'auditflow.com';

export function tenantResolver(req: Request, _res: Response, next: NextFunction) {
  const host = (req.header('host') || '').toLowerCase();
  const headerTenant = req.header('x-tenant-id');
  const queryTenant = req.query.tenant as string | undefined;

  let tenantId = '';

  if (host.endsWith(`.${TENANT_HOST_SUFFIX}`)) {
    const subdomain = host.replace(`.${TENANT_HOST_SUFFIX}`, '');
    tenantId = `tenant-${subdomain}`;
  } else if (host === 'localhost' || host.startsWith('127.0.0.1')) {
    tenantId = headerTenant || queryTenant || 'tenant-acme';
  }

  if (!tenantId) {
    tenantId = 'tenant-acme';
  }

  (req as any).tenantId = tenantId;
  req.headers['x-tenant-id'] = tenantId;
  next();
}
