import express from 'express';
import cors from 'cors';
import { tenantResolver } from './middleware/tenantResolver';
import authRoutes from './routes/authRoutes';
import evidenceRoutes from './routes/evidenceRoutes';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(tenantResolver);

app.use(authRoutes);
app.use(evidenceRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'auditflow-backend' });
});

app.listen(port, () => {
  console.log(`AuditFlow backend listening on port ${port}`);
});
