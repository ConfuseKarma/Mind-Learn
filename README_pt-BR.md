# 📚 Mind&Learn — Reduzindo o Analfabetismo Funcional com Aprendizado Gamificado

<p align="right">
  <strong>Idioma:</strong>
  <strong>🇧🇷 Português (Brasil)</strong> |
  <a href="./README.md">🇺🇸 English</a>
</p>

Protótipo acadêmico desenvolvido por estudantes de Engenharia da Computação da **Faculdade Engenheiro Salvador Arena**, com foco em:

- compreensão de leitura
- pensamento crítico
- habilidades de interpretação

A aplicação utiliza **quizzes**, **pontos**, **badges** e **acompanhamento de progresso** para engajar os aprendizes em um ambiente gamificado.

---

## 📑 Índice

1. [Visão Geral](#-visão-geral)
2. [Objetivos do Projeto](#-objetivos-do-projeto)
3. [Escopo e Funcionalidades do MVP](#-escopo-e-funcionalidades-do-mvp)
4. [Contexto Acadêmico](#-contexto-acadêmico)
   - [Cronograma](#cronograma-acadêmico--3-meses)
   - [Equipe](#equipe-e-funções)
   - [Gestão do Projeto](#-gerenciamento-do-projeto)
   - [Validação Pedagógica](#-validação-pedagógica)
   - [Orçamento Simulado](#-orçamento-contexto-acadêmico-simulado)
   - [Trabalhos Futuros](#-trabalhos-futuros)

5. [Arquitetura Técnica](#-arquitetura-técnica)
   - [Visão Geral da Arquitetura](#-visão-geral-da-arquitetura)
   - [Tecnologias Utilizadas](#-tecnologias-utilizadas)
   - [Estrutura do Repositório](#-estrutura-do-repositório)

6. [Backend](#-backend)
   - [Configuração e Variáveis de Ambiente](#configuração-e-variáveis-de-ambiente)
   - [Autenticação e Papéis (RBAC)](#autenticação-e-papéis-rbac)
   - [Modelos de Dados e Seeds](#modelos-de-dados-e-seeds)

7. [Frontend](#-frontend)
   - [SPA e Navegação](#spa-e-navegação)
   - [Fluxo de Autenticação](#fluxo-de-autenticação)
   - [Sessão e Painel de Depuração](#sessão-e-painel-de-depuração)
   - [Histórico de Atividade](#histórico-de-atividade)

8. [Execução com Docker](#-execução-com-docker)
   - [Pré requisitos](#pré-requisitos)
   - [Configurando o-env-raiz](#configurando-o-env-raiz)
   - [Subindo a Stack](#subindo-a-stack)
   - [Rodando Seeds com Docker](#rodando-seeds-com-docker)

9. [Execução sem Docker](#-execução-sem-docker)
   - [Banco de Dados Local](#banco-de-dados-local)
   - [Backend sem Docker](#backend-sem-docker)
   - [Frontend sem Docker](#frontend-sem-docker)

10. [Coleções Postman](#-coleções-postman)
11. [Resumo Técnico](#-resumo-técnico)
12. [Licença](#-license)
13. [Autores](#-authors)

---

## 🔍 Visão Geral

Mind&Learn é um **protótipo acadêmico** desenvolvido por 4 estudantes de Engenharia da Computação como parte de um projeto interdisciplinar envolvendo:

- Gestão de Projetos
- Engenharia de Software
- Redes de Computadores

O objetivo principal é **projetar e implementar um aplicativo web gamificado** para apoiar a redução do **analfabetismo funcional no Brasil**, por meio de:

- atividades de leitura
- quizzes interpretativos
- feedback instrutivo
- gamificação leve (pontos, badges, progresso)

---

## 🎯 Objetivos do Projeto

- Desenvolver um **MVP funcional** em um período acadêmico de 3 meses.
- Aplicar **gamificação** e **microlearning** para reforçar a compreensão de leitura.
- Validar o design pedagógico com **entrevistas com profissionais de pedagogia**.
- Integrar conceitos de **Engenharia de Software, Redes e Gestão de Projetos** em um produto único.

---

## 🚀 Escopo e Funcionalidades do MVP

Funcionalidades principais:

- Autenticação de usuários (admin, professor, aluno)
- **Quizzes de múltipla escolha** com dificuldade configurável
- Lições temáticas associadas a questões e explicações
- Sistema de **pontos** e **badges**
- **Painel de progresso** e **histórico de atividade** do aluno
- Painéis distintos para:
  - Administrador
  - Professor
  - Estudante

> Observação: O projeto é um protótipo acadêmico e não foi projetado para uso em produção em larga escala.

---

## 🧑‍🏫 Contexto Acadêmico

### Cronograma acadêmico – 3 meses

- Levantamento de requisitos e protótipo em Figma
- Entrevistas exploratórias com profissionais de pedagogia
- Implementação do backend e frontend
- Integração, testes, ajustes de UX e documentação final

### Equipe e funções

- 4 estudantes de Engenharia da Computação
- Funções distribuídas e rotativas:
  - Product Owner
  - Scrum Master
  - Developers

### 📊 Gerenciamento do Projeto

- Metodologia: **Ágil** (inspirado em Scrum)
- Ferramentas:
  - **GitHub** (código, issues, revisão)
  - **Trello** ou equivalente (Kanban)
  - **Google Meet / Discord** (reuniões)

### 🧪 Validação Pedagógica

Entrevistas com profissionais de pedagogia indicaram:

- Quizzes curtos e contextualizados são mais eficazes.
- Feedback deve ser **instrutivo**, não apenas competitivo.
- Micro-sessões diárias de 5 a 10 minutos tendem a melhorar o engajamento.
- Testes pré e pós atividade ajudam a medir progressão de aprendizagem.

### 💰 Orçamento (simulado)

- Custos de infraestrutura, domínio, materiais e entrevistas: ~R$ 1.880
- Custo de pessoal (simulação acadêmica): ~R$ 3.840
- Total estimado: ~R$ 5.720

### 🔮 Trabalhos futuros

Se evoluído além do contexto acadêmico:

- Algoritmos de recomendação/adaptação de conteúdo
- Integração com redes de ensino e programas públicos
- Painéis avançados para professores e gestores
- Recursos de acessibilidade e suporte a múltiplos dispositivos

---

## 🧠 Arquitetura Técnica

### 🧱 Visão geral da arquitetura

```text
[Frontend SPA]  React + Vite + Nginx
      |
      | HTTP (REST, JSON) em /api/v1
      v
[Backend API]   Node.js + Express + Sequelize + JWT
      |
      | SQL
      v
[MariaDB 11]    Banco relacional
```

- A aplicação é uma **SPA** servida pelo **Nginx** em produção.
- O backend expõe uma API RESTful versionada em **`/api/v1`**.
- O banco MariaDB armazena usuários, temas, lições, quizzes, tentativas, badges e audit log.

---

### 🖥️ Tecnologias Utilizadas

#### Backend

- **Node.js 20**
- **Express.js**
- **Sequelize ORM**
- **MariaDB 11**
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Zod** para validação de payloads
- **dotenv** para configuração via `.env`
- Organização modular:
  - `controllers/admin`, `controllers/teacher`, `controllers/student`
  - `routes/*.routes.js`
  - `middleware/auth.js`, `middleware/validate.js`

#### Frontend

- **React 18**
- **Vite**
- **React Router DOM**
- **Axios** para chamadas HTTP
- **Contexto de autenticação** em `utils/auth.jsx`
- **Toast provider** em `ui/ToastProvider.jsx`
- SPA com rotas separadas por papel:
  - Público: `PublicHome`, `Login`, `Signup`
  - Aluno: `Home`, `Lessons`, `Lesson`, `Quiz`, `Quizzes`, `Progress`, `ActivityHistory`, `Me`
  - Professor: `Teacher` (gestão de lições e quizzes)
  - Admin: `Admin` (gestão de usuários, temas, lições, quizzes)

#### Infraestrutura

- **Docker** e **Docker Compose**
- Imagens:
  - Backend (`mindlearn-backend/Dockerfile`)
  - Frontend (`mindlearn-frontend/Dockerfile`)
  - Banco (imagem oficial `mariadb:11`)

- **Nginx** com:
  - fallback para `index.html` (SPA)
  - proxy reverso `/api` → backend

- Seeds:
  - `seed-base`: recria schema, cria badges e um admin
  - `seed-demo`: base + professor demo + aluno demo + conteúdos de demonstração

#### Ferramentas auxiliares

- **Postman** Collection + Environment
- **ESM modules**
- Scripts de npm para seed e start

---

### 📁 Estrutura do Repositório

```text
.
├── AUTHORS
├── Documentation
│   ├── Relatório de Engenharia de Software.md
│   ├── Relatório de Gestão de Projetos.md
│   └── Relatório de Redes.md
├── LICENSE
├── Postman
│   ├── mindlearn-api.postman_collection.json
│   └── mindlearn-local.postman_environment.json
├── README.md
├── README_pt-BR.md
├── database
│   └── init.sql
├── docker-compose.yml
├── .env.example            # env raiz (Docker)
├── mindlearn-backend
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── .env.example        # env do backend (execução direta)
│   └── src
│       ├── app.js
│       ├── config/appConfig.js
│       ├── controllers/...
│       ├── db.js
│       ├── middleware/...
│       ├── models/...
│       ├── questionBank.demo.js
│       ├── routes/...
│       ├── seed.js
│       ├── server.js
│       └── utils/...
└── mindlearn-frontend
    ├── Dockerfile
    ├── index.html
    ├── nginx.conf
    ├── package-lock.json
    ├── package.json
    ├── .env.example        # env do frontend (execução direta)
    ├── public/favicon.svg
    └── src
        ├── main.jsx
        ├── styles/main.css
        ├── ui/...
        ├── utils/...
        └── views/...
```

---

## 🧩 Backend

### Configuração e variáveis de ambiente

A configuração central do backend está em `src/config/appConfig.js` e lê:

- `PORT`
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_PORT`
- `CORS_ORIGINS`
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `PASSING_SCORE_PERCENT`

Esses valores vêm do `.env` local ou do `.env` da raiz quando rodando via Docker.

### Autenticação e papéis (RBAC)

- Rota de login: `POST /api/v1/auth/login`
- Gera um JWT contendo `id`, `email`, `role`.
- Middleware `auth.js`:
  - valida o token
  - injeta `req.user`
  - oferece helpers para exigir papéis específicos, como `requireRole('admin')`.

Papéis:

- `admin`:
  - gerencia usuários, temas, lições, quizzes

- `teacher`:
  - gerencia apenas seus próprios conteúdos

- `student`:
  - consome lições e quizzes, acumula tentativas e progresso

### Modelos de dados e seeds

Principais models:

- `User`, `Theme`, `Lesson`, `Question`, `Option`, `Quiz`
- `Attempt`, `Badge`, `UserBadge`, `AuditLog`

Seed (`src/seed.js`):

- `sequelize.sync({ force: true })` recria o schema.
- Cria badges básicos:
  - `FIRST_STEPS`
  - `PERFECT_SCORE`

- Cria um usuário admin com:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - ou padrões `admin@example.com / admin123` se não configurados.

Com `SEED_DEMO === "true"`:

- Cria professor demo
- Cria aluno demo
- Popula temas, lições, quizzes e questões a partir de `questionBank.demo.js`.

---

## 🎨 Frontend

### SPA e navegação

- Entrypoint: `src/main.jsx`
- App shell: `src/ui/App.jsx`
- React Router controla rotas autenticadas e públicas.
- Há rotas protegidas por papel para admin, teacher e student.

### Fluxo de autenticação

Em `src/utils/auth.jsx`:

- Token é armazenado em `localStorage`.
- Contexto de auth expõe:
  - `user`, `role`, `token`
  - `setUser`, `setRole`, `setToken`

Fluxo típico:

1. Usuário envia email e senha em `/login`.
2. Frontend chama `api.login(email, password)` (`utils/api.js`).
3. Token JWT é salvo.
4. Frontend chama `api.me()` para carregar perfil.
5. Redireciona de acordo com o papel:
   - admin → `/admin`
   - teacher → `/teacher`
   - student → `/home`

### Sessão e painel de depuração

Na página `Me.jsx`:

- Mostra dados básicos (nome, email, papel).
- Um "easter egg" de triple click:
  - ao clicar 3 vezes na área de sessão, um painel de debug exibe:
    - `token`
    - `role`
    - `user`
    - `apiBase`
    - `mode` (produção ou desenvolvimento)

Funciona tanto em execução local quanto em Docker (build de produção).

### Histórico de atividade

A página `ActivityHistory.jsx`:

- Exibe lições e quizzes já realizados.
- Mostra porcentagens, acertos e detalhes quando aplicável.
- A API retorna tentativas e resolução detalhada, incluindo explicações das alternativas.

---

## 🐳 Execução com Docker

### Pré requisitos

- Docker
- Docker Compose

### Configurando o `.env` raiz

Na raiz do projeto há um `.env.example`.
Crie seu `.env` a partir dele:

```bash
cp .env.example .env
```

### Subindo a stack

Na raiz:

```bash
docker compose up --build -d
```

Serviços:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`
- MariaDB: `localhost:3307` (caso queira acessar diretamente)

O Nginx:

- serve a SPA
- faz fallback de qualquer rota para `index.html`
- faz proxy de `/api` para o backend (`backend:3000`)

### Rodando seeds com Docker

Seed base (schema + badges + admin):

```bash
docker compose run --rm seed-base
```

Seed demo (base + dados de demonstração):

```bash
docker compose run --rm seed-demo
```

---

## 🛠 Execução sem Docker

### Banco de dados local

1. Instale **MariaDB** ou **MySQL** localmente.
2. Crie um banco e usuário, ou adapte o `database/init.sql`.
3. Exemplo de configuração básica:
   - banco: `mindlearn`
   - usuário: `mindlearn`
   - senha: `pass123`
   - host: `127.0.0.1` ou `%`

### Backend sem Docker

Dentro de `mindlearn-backend`:

1. Crie o `.env`:

```bash
cd mindlearn-backend
cp .env.example .env
```

2. Instale dependências:

```bash
npm install
```

3. Rode o seed:

- Base:

  ```bash
  npm run db:seed
  ```

- Demo:

  ```bash
  npm run db:seed:demo
  ```

4. Inicie a API:

```bash
npm start
```

A API ficará em `http://localhost:3000`.

### Frontend sem Docker

Dentro de `mindlearn-frontend`:

1. Crie o `.env`:

```bash
cd mindlearn-frontend
cp .env.example .env
```

2. Instale dependências:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

A SPA ficará acessível em `http://localhost:5173`.

---

## 📬 Coleções Postman

Diretório `Postman/`:

- `mindlearn-api.postman_collection.json`
  - rotas completas de:
    - autenticação
    - `/me`
    - student (lições, quizzes, progresso, atividade)
    - teacher (gestão de lições e quizzes)
    - admin (gestão de usuários, temas, lições, quizzes)

- `mindlearn-local.postman_environment.json`
  - contém variáveis como:
    - `base_url` (por exemplo `http://localhost:3000/api/v1`)
    - variáveis opcionais para armazenar tokens de admin, teacher e student

---

## 🧾 Resumo Técnico

- **Backend**: Node + Express + Sequelize + JWT + MariaDB
- **Frontend**: React + Vite + SPA com React Router
- **Execução com Docker**:
  - copiar `.env.example` da raiz para `.env`
  - `docker compose up --build -d`
  - `docker compose run --rm seed-base` ou `seed-demo`

- **Execução sem Docker**:
  - configurar banco local
  - copiar `.env.example` em `mindlearn-backend` e `mindlearn-frontend`
  - seeds via `npm run db:seed` / `npm run db:seed:demo`
  - `npm start` no backend e `npm run dev` no frontend

---

## 📜 Licença

Distribuído sob os termos descritos em **[LICENSE](./LICENSE)**.  
➡️ Consulte o texto completo da licença na raiz do repositório.

---

## 👥 Autores

Estudantes da **Faculdade Engenheiro Salvador Arena**.  
➡️ Veja **[AUTHORS](./AUTHORS)** para a lista completa de contribuidores.

---

<div align="center">
  <sub>Construído com ♥ por estudantes de Engenharia de Computação</sub><br>
  <sub>Projeto Interdisciplinar de Engenharia de Software • 2025</sub>
</div>
