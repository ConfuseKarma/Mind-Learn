import "dotenv/config";
import { sequelize } from "./db.js";
import { User, Theme, Lesson, Question, Option, Badge } from "./models/index.js";
import bcrypt from "bcryptjs";

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  await Badge.bulkCreate([
    { code: "FIRST_STEPS", name: "First Steps", description: "Completed first lesson attempt" },
    { code: "PERFECT_SCORE", name: "Perfect Score", description: "Achieved 100% in a lesson" },
  ]);

  await User.create({
    name: "Demo User",
    email: "demo@example.com",
    passwordHash: bcrypt.hashSync("secret", 10),
  });

  const reading = await Theme.create({
    name: "Reading Basics",
    description: "Foundational comprehension skills",
  });
  const critical = await Theme.create({
    name: "Critical Interpretation",
    description: "Inference and intent",
  });

  const l1 = await Lesson.create({
    ThemeId: reading.id,
    title: "Identify subject",
    description: "Understand basic sentence parts",
    difficulty: 1,
  });
  const q1 = await Question.create({
    LessonId: l1.id,
    text: 'In the sentence "O sol nasce a leste", what is the subject?',
  });
  await Option.bulkCreate([
    { QuestionId: q1.id, text: "O sol", isCorrect: true },
    { QuestionId: q1.id, text: "nasce", isCorrect: false },
    { QuestionId: q1.id, text: "a leste", isCorrect: false },
  ]);
  const q2 = await Question.create({
    LessonId: l1.id,
    text: "What is the purpose of a text conclusion?",
  });
  await Option.bulkCreate([
    { QuestionId: q2.id, text: "Summarize and close the main ideas", isCorrect: true },
    { QuestionId: q2.id, text: "Introduce the topic", isCorrect: false },
    { QuestionId: q2.id, text: "List references", isCorrect: false },
  ]);

  const l2 = await Lesson.create({
    ThemeId: critical.id,
    title: "Main idea vs details",
    description: "Identify main ideas in a paragraph",
    difficulty: 2,
  });
  const q3 = await Question.create({
    LessonId: l2.id,
    text: "Which sentence best states the main idea?",
  });
  await Option.bulkCreate([
    { QuestionId: q3.id, text: "The central point that the paragraph develops", isCorrect: true },
    { QuestionId: q3.id, text: "A supporting detail", isCorrect: false },
    { QuestionId: q3.id, text: "An unrelated example", isCorrect: false },
  ]);

  console.log("Seed complete. Demo user: demo@example.com / secret");
  process.exit(0);
}
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
