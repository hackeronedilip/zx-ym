import express from 'express';
import { controls, evidence, auditRequests } from '../data';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

function withTenant(items: any[], tenantId: string) {
  return items.filter(item => item.tenantId === tenantId);
}

router.get('/api/controls', requireAuth, (req, res) => {
  const tenantId = (req as any).tenantId;
  res.json({ controls: withTenant(controls, tenantId) });
});

router.get('/api/evidence', requireAuth, (req, res) => {
  const tenantId = (req as any).tenantId;
  res.json({ evidence: withTenant(evidence, tenantId) });
});

router.get('/api/audit-requests', requireAuth, (req, res) => {
  const tenantId = (req as any).tenantId;
  res.json({ auditRequests: withTenant(auditRequests, tenantId) });
});

router.post('/api/evidence/:id/approve', requireAuth, (req, res) => {
  const tenantId = (req as any).tenantId;
  const item = evidence.find(e => e.id === req.params.id && e.tenantId === tenantId);

  if (!item) {
    return res.status(404).json({ error: 'Evidence item not found' });
  }

  item.status = 'approved';
  res.json({ evidence: item });
});

export default router;
