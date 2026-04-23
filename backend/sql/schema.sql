-- Schema para o banco `geral` do TonJunFort.
-- Como executar (em um terminal com o MySQL já rodando):
--
--   mysql -u root -p geral < backend/sql/schema.sql
--
-- Se o banco `geral` ainda não existir, crie antes:
--   CREATE DATABASE geral CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS voluntarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(120) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  idade INT NULL,
  cpf VARCHAR(14) NULL UNIQUE,
  endereco VARCHAR(255) NULL,
  telefone VARCHAR(20) NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS diretoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(120) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NULL UNIQUE,
  cargo VARCHAR(80) NULL,
  telefone VARCHAR(20) NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS convocacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NULL,
  data_convocacao DATETIME NOT NULL,
  criado_por_diretoria_id INT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_convocacoes_diretoria
    FOREIGN KEY (criado_por_diretoria_id) REFERENCES diretoria(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS demandas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NULL,
  status ENUM('aberta', 'em_andamento', 'concluida') NOT NULL DEFAULT 'aberta',
  voluntario_id INT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_demandas_voluntario
    FOREIGN KEY (voluntario_id) REFERENCES voluntarios(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
