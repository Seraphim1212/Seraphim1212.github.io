const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

const TABELAS_VALIDAS = {
  voluntario: 'voluntarios',
  diretoria: 'diretoria',
};

async function autenticar(tabela, usuario, senha) {
  const [rows] = await pool.query(
    `SELECT id, nome, usuario, email, senha_hash
       FROM ${tabela}
       WHERE usuario = ?
       LIMIT 1`,
    [usuario]
  );
  if (rows.length === 0) return null;

  const user = rows[0];
  const confere = await bcrypt.compare(String(senha), user.senha_hash);
  if (!confere) return null;

  return {
    id: user.id,
    nome: user.nome,
    usuario: user.usuario,
    email: user.email,
  };
}

function criarRota(tipo) {
  return async (req, res, next) => {
    try {
      const { usuario, senha } = req.body;
      if (!usuario || !senha) {
        return res
          .status(400)
          .json({ error: 'Usuário e senha são obrigatórios.' });
      }
      const tabela = TABELAS_VALIDAS[tipo];
      const user = await autenticar(tabela, usuario, senha);
      if (!user) {
        return res
          .status(401)
          .json({ error: 'Usuário ou senha inválidos.' });
      }
      res.json({ ok: true, user });
    } catch (err) {
      next(err);
    }
  };
}

router.post('/voluntario', criarRota('voluntario'));
router.post('/diretoria', criarRota('diretoria'));

module.exports = router;
