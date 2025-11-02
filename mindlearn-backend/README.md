# Mind&Learn Backend (Express + MariaDB via Sequelize)

API do MVP Mind&Learn usando MariaDB e Sequelize. Estrutura MVC simples e seed inicial.

## Como rodar
1) Configure banco e .env
```
cp .env.example .env
# ajuste credenciais
```
2) Instale deps e crie/atualize o schema automaticamente
```
npm install
npm run seed
npm run dev
```

## .env
```
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=mindlearn
DB_PASS=pass123
DB_NAME=mindlearn
JWT_SECRET=dev_secret_change_me
```

Endpoints:
- POST /auth/signup
- POST /auth/login
- GET /quizzes
- GET /quizzes/:id
- POST /quizzes/:id/attempt
- GET /progress/me
