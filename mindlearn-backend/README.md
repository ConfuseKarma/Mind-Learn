# Mind&Learn Backend (Express + Sequelize + MariaDB)

Extended backend with Lessons, Themes, admin endpoints, badges by theme, and progress tracking.

## Setup

1. Run database/init.sql in MariaDB.
2. cp .env.example .env
3. npm install
4. npm run seed
5. npm run dev

## Routes

Auth:

- POST /auth/signup
- POST /auth/login

Lessons:

- GET /themes
- GET /themes/:id/lessons
- GET /lessons/:id
- POST /lessons/:id/attempt

Progress:

- GET /progress/me

Admin (MVP):

- POST /admin/theme
- POST /admin/lesson
  Header: x-admin-secret = JWT_SECRET
