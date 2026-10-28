import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'nichetechcareer-api', version: '0.1.0' });
});

/** Placeholder — wire contact/career forms from the React app here later. */
app.post('/api/contact', (_req, res) => {
  res.status(501).json({
    message: 'Contact API not implemented yet. Frontend currently uses static form handling.',
  });
});

app.post('/api/careers/apply', (_req, res) => {
  res.status(501).json({
    message: 'Careers apply API not implemented yet.',
  });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
