# Backend TonJunFort

Backend Node.js/Express que conecta o site estático (HTML/CSS/JS na raiz do repositório) ao MySQL local.

## Stack

- [Express](https://expressjs.com/) — servidor HTTP e roteamento
- [mysql2/promise](https://github.com/sidorares/node-mysql2) — driver MySQL
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — hash das senhas
- [cors](https://github.com/expressjs/cors) — liberar requests do frontend
- [dotenv](https://github.com/motdotla/dotenv) — carregar variáveis de `.env`

## Estrutura

```
backend/
├── db.js                  # Pool de conexão MySQL
├── server.js              # App Express + registro de rotas
├── routes/
│   ├── auth.js            # POST /api/login/voluntario|diretoria
│   └── cadastro.js        # POST /api/cadastro/voluntario|diretoria
├── sql/
│   └── schema.sql         # CREATE TABLE das tabelas usadas
├── .env.example           # Modelo de configuração
└── package.json
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- MySQL 5.7+ ou 8.x rodando localmente
- Banco `geral` criado (é o que aparece no seu `show tables`)

## Passo a passo (Windows / Linux / macOS)

### 1. Criar o banco e as tabelas

Abra o cliente MySQL e rode:

```sql
CREATE DATABASE IF NOT EXISTS geral
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Depois, a partir da raiz do repositório, rode o schema:

```bash
mysql -u root -p geral < backend/sql/schema.sql
```

Isso cria (ou mantém) as tabelas `voluntarios`, `diretoria`, `convocacoes` e `demandas`.

> Obs.: `diretoria` é necessária para o login/cadastro da área de Diretoria do site. Se você já tiver dados nas tabelas antigas, faça backup antes.

### 2. Configurar variáveis de ambiente

Dentro de `backend/`, copie o `.env.example` para `.env` e ajuste:

```bash
cp .env.example .env
```

Edite `.env` e preencha `DB_USER` e `DB_PASSWORD` com as credenciais do seu MySQL local.

### 3. Instalar dependências

```bash
cd backend
npm install
```

### 4. Subir o backend

```bash
npm start
```

Você deve ver:

```
Backend TonJunFort rodando em http://localhost:3000
```

Para checar a conexão com o banco:

```
GET http://localhost:3000/api/health  →  { "ok": true, "db": "up" }
```

### 5. Abrir o frontend

Os arquivos HTML estão na **raiz do repositório** (não dentro de `backend/`). Para que o navegador consiga fazer requests para `http://localhost:3000`, abra o site por meio de um servidor estático. Opções:

- Extensão "Live Server" do VS Code (clique com o botão direito em `index.html` → *Open with Live Server*)
- Comando rápido no terminal (Python já vem instalado na maioria dos sistemas):

  ```bash
  # A partir da raiz do repositório:
  python3 -m http.server 5500
  ```

  Depois, abra [http://localhost:5500](http://localhost:5500).

Evite abrir os HTML por duplo-clique (`file://`), porque o CORS fica mais chato nesse modo.

## Endpoints

Todos retornam/recebem JSON (`Content-Type: application/json`).

### Cadastro

- `POST /api/cadastro/voluntario`

  Body:
  ```json
  {
    "nome": "Fulano",
    "usuario": "fulano",
    "email": "fulano@email.com",
    "senha": "minhasenha8",
    "idade": 20,
    "cpf": "000.000.000-00",
    "endereco": "Rua X, 123",
    "telefone": "(85) 99999-9999"
  }
  ```

- `POST /api/cadastro/diretoria`

  Body:
  ```json
  {
    "nome": "Fulano",
    "usuario": "fulano",
    "email": "fulano@email.com",
    "senha": "minhasenha8",
    "cpf": "000.000.000-00",
    "cargo": "Coordenador",
    "telefone": "(85) 99999-9999"
  }
  ```

Respostas:
- `201 { "ok": true, "id": <insertId> }` em sucesso
- `400 { "error": "..." }` se faltar campo
- `409 { "error": "..." }` se `usuario`, `email` ou `cpf` já existirem

### Login

- `POST /api/login/voluntario`
- `POST /api/login/diretoria`

Body:
```json
{ "usuario": "fulano", "senha": "minhasenha8" }
```

Respostas:
- `200 { "ok": true, "user": { "id", "nome", "usuario", "email" } }`
- `401 { "error": "Usuário ou senha inválidos." }`

## Segurança

- Senhas são guardadas como `bcryptjs` hash (nunca em texto puro).
- Toda query usa parâmetros (`?`) — o driver escapa os valores, evitando SQL injection.
- Nunca comite o `.env` (já está no `.gitignore`).
- Em produção, troque `CORS_ORIGIN=*` por uma lista explícita de domínios.
