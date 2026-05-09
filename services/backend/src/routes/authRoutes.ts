import express from 'express';
import { users } from '../data';
import { signToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/api/login', (req, res) => {
  const username = (req.body.username || '').toString().trim().toLowerCase();
  const password = (req.body.password || '').toString().trim();

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const user = users.find(u => u.username.toLowerCase() === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials (try alice/password123, bob/password123, or charlie/password123)' });
  }

  const token = signToken({
    sub: user.id,
    tenantId: user.tenantId,
    role: user.role,
    name: user.name
  });

  res.json({ token, tenantId: user.tenantId, role: user.role, name: user.name });
});

export default router;
