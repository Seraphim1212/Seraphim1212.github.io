require('dotenv').config();
const express = require('express');
const cors = require('cors');

const pool = require('./db');
const cadastroRoutes = require('./routes/cadastro');
const authRoutes = require('./routes/auth');

const app = express();

const corsEnv = (process.env.CORS_ORIGIN || '*').trim();
const corsOrigin =
  corsEnv === '*'
    ? true
    : corsEnv
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'up' });
  } catch (err) {
    res.status(500).json({ ok: false, db: 'down', error: err.message });
  }
});

app.use('/api/cadastro', cadastroRoutes);
app.use('/api/login', authRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Backend TonJunFort rodando em http://localhost:${port}`);
});
