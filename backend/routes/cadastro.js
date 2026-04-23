const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

function validarComum(body) {
  const { nome, usuario, email, senha } = body;
  if (!nome || !usuario || !email || !senha) {
    return 'Nome, usuário, email e senha são obrigatórios.';
  }
  if (String(senha).length < 8) {
    return 'A senha deve ter no mínimo 8 caracteres.';
  }
  return null;
}

function tratarDuplicidade(err, res) {
  if (err && err.code === 'ER_DUP_ENTRY') {
    res.status(409).json({
      error: 'Usuário, email ou CPF já cadastrado.',
    });
    return true;
  }
  return false;
}

router.post('/voluntario', async (req, res, next) => {
  try {
    const erro = validarComum(req.body);
    if (erro) return res.status(400).json({ error: erro });

    const {
      nome,
      usuario,
      email,
      senha,
      idade = null,
      cpf = null,
      endereco = null,
      telefone = null,
    } = req.body;

    const senhaHash = await bcrypt.hash(String(senha), 10);

    const [result] = await pool.query(
      `INSERT INTO voluntarios
         (nome, usuario, email, senha_hash, idade, cpf, endereco, telefone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, usuario, email, senhaHash, idade, cpf, endereco, telefone]
    );

    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    if (tratarDuplicidade(err, res)) return;
    next(err);
  }
});

router.post('/diretoria', async (req, res, next) => {
  try {
    const erro = validarComum(req.body);
    if (erro) return res.status(400).json({ error: erro });

    const {
      nome,
      usuario,
      email,
      senha,
      cpf = null,
      cargo = null,
      telefone = null,
    } = req.body;

    const senhaHash = await bcrypt.hash(String(senha), 10);

    const [result] = await pool.query(
      `INSERT INTO diretoria
         (nome, usuario, email, senha_hash, cpf, cargo, telefone)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, usuario, email, senhaHash, cpf, cargo, telefone]
    );

    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    if (tratarDuplicidade(err, res)) return;
    next(err);
  }
});

module.exports = router;
