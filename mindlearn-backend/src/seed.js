// seed.js
import "dotenv/config";
import bcrypt from "bcryptjs";
import { sequelize } from "./db.js";
import { User, Theme, Lesson, Question, Option, Badge, Quiz } from "./models/index.js";
import { demoQuestionBank } from "./questionBank.demo.js";

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  await Badge.bulkCreate([
    {
      code: "FIRST_STEPS",
      name: "Primeiros Passos",
      description: "Concluiu a primeira tentativa de lição ou teste.",
    },
    {
      code: "PERFECT_SCORE",
      name: "Pontuação Perfeita",
      description: "Acertou 100% em uma lição ou teste.",
    },
  ]);

  const SEED_DEMO = process.env.SEED_DEMO === "true";

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  let admin = await User.findOne({ where: { email: ADMIN_EMAIL } });

  if (!admin) {
    admin = await User.create({
      name: "Administrador",
      email: ADMIN_EMAIL,
      passwordHash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
      role: "admin",
    });
  }

  if (!SEED_DEMO) {
    console.log("Seed básico concluído (schema + badges + admin).");
    console.log("Um usuário administrador foi criado (ou reaproveitado):");
    console.log(`  Admin e-mail: ${ADMIN_EMAIL}`);
    console.log(
      `  Admin senha: ${ADMIN_PASSWORD}  (altere em produção ou use variáveis ADMIN_EMAIL/ADMIN_PASSWORD)`,
    );
    console.log(
      "Defina SEED_DEMO=true para popular usuários, temas, lições, provas e questões de demonstração.",
    );
    process.exit(0);
  }

  const teacher = await User.create({
    name: "Professor Demo",
    email: "teacher@example.com",
    passwordHash: bcrypt.hashSync("teacher123", 10),
    role: "teacher",
  });

  const student = await User.create({
    name: "Estudante Demo",
    email: "demo@example.com",
    passwordHash: bcrypt.hashSync("secret", 10),
    role: "student",
  });

  const themeRecords = [];

  for (const themeDef of demoQuestionBank.themes) {
    const theme = await Theme.create({
      name: themeDef.name,
      description: themeDef.description,
    });
    themeRecords.push(theme);

    if (Array.isArray(themeDef.lessons)) {
      for (const lessonDef of themeDef.lessons) {
        const lesson = await Lesson.create({
          ThemeId: theme.id,
          TeacherId: teacher.id,
          title: lessonDef.title,
          description: lessonDef.description,
          difficulty: lessonDef.difficulty || 1,
        });

        if (Array.isArray(lessonDef.questions)) {
          for (const qDef of lessonDef.questions) {
            const question = await Question.create({
              LessonId: lesson.id,
              text: qDef.text,
            });

            if (Array.isArray(qDef.options)) {
              for (const opt of qDef.options) {
                await Option.create({
                  QuestionId: question.id,
                  text: opt.text,
                  isCorrect: !!opt.isCorrect,
                  explanation: opt.explanation || null,
                });
              }
            }
          }
        }
      }
    }
  }

  if (Array.isArray(demoQuestionBank.quizzes)) {
    for (const quizDef of demoQuestionBank.quizzes) {
      const quiz = await Quiz.create({
        title: quizDef.title,
        description: quizDef.description,
        difficulty: quizDef.difficulty || 1,
        AuthorId: teacher.id,
      });

      if (Array.isArray(quizDef.questions)) {
        for (const qDef of quizDef.questions) {
          const question = await Question.create({
            QuizId: quiz.id,
            text: qDef.text,
          });

          if (Array.isArray(qDef.options)) {
            for (const opt of qDef.options) {
              await Option.create({
                QuestionId: question.id,
                text: opt.text,
                isCorrect: !!opt.isCorrect,
                explanation: opt.explanation || null,
              });
            }
          }
        }
      }
    }
  }

  console.log("Seed completo com banco de questões, temas, lições e provas em português.");
  console.log("Usuários de demonstração:");
  console.log(`  Admin:    ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  console.log("  Professor: teacher@example.com / teacher123");
  console.log("  Aluno:    demo@example.com / secret");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
