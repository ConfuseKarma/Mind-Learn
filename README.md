# 📚 Mind&Learn — Reducing Functional Illiteracy with Gamified Learning

<p align="right">
  <strong>Language:</strong>
  <a href="./README_pt-BR.md">🇧🇷 Português (Brasil)</a> |
  <strong>🇺🇸 English</strong>
</p>

Academic prototype developed by Computer Engineering students at **Engenheiro Salvador Arena College**, focused on:

- reading comprehension
- critical thinking
- interpretation skills

The application uses **quizzes**, **points**, **badges**, and **progress tracking** to engage learners in a gamified environment.

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Project Goals](#-project-goals)
3. [MVP Scope and Features](#-mvp-scope-and-features)
4. [Academic Context](#-academic-context)
   - [Timeline](#academic-timeline-3-months)
   - [Team](#team-and-roles)
   - [Project Management](#-project-management)
   - [Pedagogical Validation](#-pedagogical-validation)
   - [Simulated Budget](#-budget-academic-simulated-context)
   - [Future Work](#-future-work)

5. [Technical Architecture](#-technical-architecture)
   - [Architecture Overview](#-architecture-overview)
   - [Technologies Used](#-technologies-used)
   - [Repository Structure](#-repository-structure)

6. [Backend](#-backend)
   - [Configuration and Environment Variables](#configuration-and-environment-variables)
   - [Authentication and Roles (RBAC)](#authentication-and-roles-rbac)
   - [Data Models and Seeds](#data-models-and-seeds)

7. [Frontend](#-frontend)
   - [SPA and Navigation](#spa-and-navigation)
   - [Authentication Flow](#authentication-flow)
   - [Session and Debug Panel](#session-and-debug-panel)
   - [Activity History](#activity-history)

8. [Running with Docker](#-running-with-docker)
   - [Prerequisites](#prerequisites)
   - [Configuring the root-env](#configuring-the-root-env)
   - [Bringing up the stack](#bringing-up-the-stack)
   - [Running Seeds with Docker](#running-seeds-with-docker)

9. [Running without Docker](#-running-without-docker)
   - [Local Database](#local-database)
   - [Backend without Docker](#backend-without-docker)
   - [Frontend without Docker](#frontend-without-docker)

10. [Postman Collections](#-postman-collections)
11. [Technical Summary](#-technical-summary)
12. [License](#-license)
13. [Authors](#-authors)

---

## 🔍 Overview

Mind&Learn is an **academic prototype** developed by 4 Computer Engineering students as part of an interdisciplinary project involving:

- Project Management
- Software Engineering
- Computer Networks

The main goal is to **design and implement a gamified web application** to help reduce **functional illiteracy in Brazil** through:

- reading activities
- interpretative quizzes
- instructive feedback
- light gamification (points, badges, progress)

---

## 🎯 Project Goals

- Develop a **functional MVP** within a 3-month academic period.
- Apply **gamification** and **microlearning** to reinforce reading comprehension.
- Validate the pedagogical design through **interviews with education professionals**.
- Integrate concepts from **Software Engineering, Networks, and Project Management** into a single product.

---

## 🚀 MVP Scope and Features

Main features:

- User authentication (admin, teacher, student)
- **Multiple-choice quizzes** with configurable difficulty
- Thematic lessons linked to questions and explanations
- **Points** and **badges** system
- **Progress dashboard** and **student activity history**
- Separate dashboards for:
  - Administrator
  - Teacher
  - Student

> Note: This project is an academic prototype and was not designed for large-scale production use.

---

## 🧑‍🏫 Academic Context

### Academic timeline - 3 months

- Requirements gathering and Figma prototype
- Exploratory interviews with pedagogy professionals
- Backend and frontend implementation
- Integration, testing, UX refinement, and final documentation

### Team and roles

- 4 Computer Engineering students
- Rotating roles:
  - Product Owner
  - Scrum Master
  - Developers

### 📊 Project Management

- Methodology: **Agile** (Scrum-inspired)
- Tools:
  - **GitHub** (code, issues, reviews)
  - **Trello** or equivalent (Kanban)
  - **Google Meet / Discord** (meetings)

### 🧪 Pedagogical Validation

Interviews with pedagogy professionals indicated that:

- Short, contextualized quizzes are more effective.
- Feedback should be **instructive**, not only competitive.
- Daily micro-sessions of 5 to 10 minutes tend to improve engagement.
- Pre- and post-activity tests help measure learning progression.

### 💰 Budget (simulated)

- Infrastructure, domain, materials, and interviews: ~R$ 1,880
- Personnel costs (academic simulation): ~R$ 3,840
- Total estimated: ~R$ 5,720

### 🔮 Future Work

If evolved beyond the academic context:

- Content recommendation and adaptation algorithms
- Integration with school networks and public programs
- Advanced dashboards for teachers and education managers
- Accessibility features and support for multiple devices

---

## 🧠 Technical Architecture

### 🧱 Architecture Overview

```text
[Frontend SPA]  React + Vite + Nginx
      |
      | HTTP (REST, JSON) at /api/v1
      v
[Backend API]   Node.js + Express + Sequelize + JWT
      |
      | SQL
      v
[MariaDB 11]    Relational database
```

- The application is a **SPA** served by **Nginx** in production.
- The backend exposes a versioned RESTful API under **`/api/v1`**.
- The MariaDB database stores users, themes, lessons, quizzes, attempts, badges, and audit logs.

---

### 🖥️ Technologies Used

#### Backend

- **Node.js 20**
- **Express.js**
- **Sequelize ORM**
- **MariaDB 11**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Zod** for payload validation
- **dotenv** for `.env` configuration
- Modular organization:
  - `controllers/admin`, `controllers/teacher`, `controllers/student`
  - `routes/*.routes.js`
  - `middleware/auth.js`, `middleware/validate.js`

#### Frontend

- **React 18**
- **Vite**
- **React Router DOM**
- **Axios** for HTTP calls
- **Auth context** in `utils/auth.jsx`
- **Toast provider** in `ui/ToastProvider.jsx`
- SPA with role-based routes:
  - Public: `PublicHome`, `Login`, `Signup`
  - Student: `Home`, `Lessons`, `Lesson`, `Quiz`, `Quizzes`, `Progress`, `ActivityHistory`, `Me`
  - Teacher: `Teacher` (lessons and quizzes management)
  - Admin: `Admin` (users, themes, lessons, quizzes management)

#### Infrastructure

- **Docker** and **Docker Compose**

- Images:
  - Backend (`mindlearn-backend/Dockerfile`)
  - Frontend (`mindlearn-frontend/Dockerfile`)
  - Database (official `mariadb:11` image)

- **Nginx** with:
  - fallback to `index.html` (SPA)
  - reverse proxy `/api` → backend

- Seeds:
  - `seed-base`: recreates schema, creates badges and an admin user
  - `seed-demo`: base plus demo teacher, demo student, and demo content

#### Auxiliary Tools

- **Postman** collection and environment
- **ESM modules**
- npm scripts for seed and start

---

### 📁 Repository Structure

```text
.
├── AUTHORS
├── Documentation
│   ├── Software Engineering Report.md
│   ├── Project Management Report.md
│   └── Networks Report.md
├── LICENSE
├── Postman
│   ├── mindlearn-api.postman_collection.json
│   └── mindlearn-local.postman_environment.json
├── README.md
├── README_pt-BR.md
├── database
│   └── init.sql
├── docker-compose.yml
├── .env.example            # root env (Docker)
├── mindlearn-backend
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── .env.example        # backend env (direct execution)
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
    ├── .env.example        # frontend env (direct execution)
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

### Configuration and Environment Variables

The backend central configuration is in `src/config/appConfig.js` and reads:

- `PORT`
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_PORT`
- `CORS_ORIGINS`
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `PASSING_SCORE_PERCENT`

These values come from the local `.env` or from the root `.env` when running via Docker.

### Authentication and Roles (RBAC)

- Login route: `POST /api/v1/auth/login`
- Generates a JWT containing `id`, `email`, `role`.
- `auth.js` middleware:
  - validates the token
  - injects `req.user`
  - offers helpers to require specific roles, such as `requireRole('admin')`.

Roles:

- `admin`:
  - manages users, themes, lessons, and quizzes

- `teacher`:
  - manages only their own content

- `student`:
  - consumes lessons and quizzes, accumulates attempts and progress

### Data Models and Seeds

Main models:

- `User`, `Theme`, `Lesson`, `Question`, `Option`, `Quiz`
- `Attempt`, `Badge`, `UserBadge`, `AuditLog`

Seed (`src/seed.js`):

- `sequelize.sync({ force: true })` recreates the schema.

- Creates basic badges:
  - `FIRST_STEPS`
  - `PERFECT_SCORE`

- Creates an admin user with:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - or defaults `admin@example.com / admin123` if not configured.

With `SEED_DEMO === "true"`:

- Creates demo teacher
- Creates demo student
- Populates themes, lessons, quizzes, and questions from `questionBank.demo.js`.

---

## 🎨 Frontend

### SPA and Navigation

- Entry point: `src/main.jsx`
- App shell: `src/ui/App.jsx`
- React Router controls public and authenticated routes.
- There are role-protected routes for admin, teacher, and student.

### Authentication Flow

In `src/utils/auth.jsx`:

- The token is stored in `localStorage`.
- The auth context exposes:
  - `user`, `role`, `token`
  - `setUser`, `setRole`, `setToken`

Typical flow:

1. User sends email and password on `/login`.
2. Frontend calls `api.login(email, password)` (`utils/api.js`).
3. JWT token is saved.
4. Frontend calls `api.me()` to load the profile.
5. Redirects according to role:
   - admin → `/admin`
   - teacher → `/teacher`
   - student → `/home`

### Session and Debug Panel

On the `Me.jsx` page:

- Shows basic data (name, email, role).
- A triple-click "easter egg":
  - clicking 3 times on the session area toggles a debug panel showing:
    - `token`
    - `role`
    - `user`
    - `apiBase`
    - `mode` (production or development)

This works both in local execution and Docker production builds.

### Activity History

The `ActivityHistory.jsx` page:

- Displays completed lessons and quizzes.
- Shows percentages, correct answers, and details when applicable.
- The API returns attempts and detailed resolution, including option explanations.

---

## 🐳 Running with Docker

### Prerequisites

- Docker
- Docker Compose

### Configuring the root `.env`

At the project root there is a `.env.example`.
Create your `.env` from it:

```bash
cp .env.example .env
```

### Bringing up the stack

At the root:

```bash
docker compose up --build -d
```

Services:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`
- MariaDB: `localhost:3307` (if you want direct access)

Nginx:

- serves the SPA
- falls back to `index.html` for any client-side route
- proxies `/api` to the backend (`backend:3000`)

### Running Seeds with Docker

Base seed (schema + badges + admin):

```bash
docker compose run --rm seed-base
```

Demo seed (base + demo data):

```bash
docker compose run --rm seed-demo
```

---

## 🛠 Running without Docker

### Local Database

1. Install **MariaDB** or **MySQL** locally.
2. Create a database and user, or adapt `database/init.sql`.
3. Basic example configuration:
   - database: `mindlearn`
   - user: `mindlearn`
   - password: `pass123`
   - host: `127.0.0.1` or `%`

### Backend without Docker

Inside `mindlearn-backend`:

1. Create the `.env`:

```bash
cd mindlearn-backend
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Run the seed:

- Base:

  ```bash
  npm run db:seed
  ```

- Demo:

  ```bash
  npm run db:seed:demo
  ```

4. Start the API:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

### Frontend without Docker

Inside `mindlearn-frontend`:

1. Create the `.env`:

```bash
cd mindlearn-frontend
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Run the dev server:

```bash
npm run dev
```

The SPA will be available at `http://localhost:5173`.

---

## 📬 Postman Collections

Directory `Postman/`:

- `mindlearn-api.postman_collection.json`
  - complete routes for:
    - authentication
    - `/me`
    - student (lessons, quizzes, progress, activity)
    - teacher (lessons and quizzes management)
    - admin (users, themes, lessons, quizzes management)

- `mindlearn-local.postman_environment.json`
  - contains variables such as:
    - `base_url` (for example `http://localhost:3000/api/v1`)
    - optional variables to store admin, teacher, and student tokens

---

## 🧾 Technical Summary

- **Backend**: Node + Express + Sequelize + JWT + MariaDB

- **Frontend**: React + Vite + SPA with React Router

- **Running with Docker**:
  - copy root `.env.example` to `.env`
  - `docker compose up --build -d`
  - `docker compose run --rm seed-base` or `seed-demo`

- **Running without Docker**:
  - configure a local database
  - copy `.env.example` in `mindlearn-backend` and `mindlearn-frontend`
  - seeds via `npm run db:seed` / `npm run db:seed:demo`
  - `npm start` for the backend and `npm run dev` for the frontend

---

## 📜 License

Distributed under the terms described in **[LICENSE](./LICENSE)**.
➡️ Refer to the full license text in the repository root.

---

## 👥 Authors

Students from **Engenheiro Salvador Arena College**.
➡️ See **[AUTHORS](./AUTHORS)** for the complete contributors list.

---

<div align="center">
  <sub>Built with ♥ by Computer Engineering students</sub><br>
  <sub>Interdisciplinary Software Engineering Project • 2025</sub>
</div>
