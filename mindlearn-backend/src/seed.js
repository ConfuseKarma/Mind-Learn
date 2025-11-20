// seed.js
import "dotenv/config";
import bcrypt from "bcryptjs";
import { sequelize } from "./db.js";
import {
    User,
    Theme,
    Lesson,
    Question,
    Option,
    Badge,
    Quiz,
} from "./models/index.js";

async function seed() {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // Badges base
    await Badge.bulkCreate([
        {
            code: "FIRST_STEPS",
            name: "First Steps",
            description: "Completed first lesson or quiz attempt",
        },
        {
            code: "PERFECT_SCORE",
            name: "Perfect Score",
            description: "Achieved 100% in a lesson or quiz",
        },
    ]);

    // Usuários base
    const admin = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        passwordHash: bcrypt.hashSync("admin123", 10),
                                    role: "admin",
    });

    const teacher = await User.create({
        name: "Teacher User",
        email: "teacher@example.com",
        passwordHash: bcrypt.hashSync("teacher123", 10),
                                      role: "teacher",
    });

    const student = await User.create({
        name: "Demo Student",
        email: "demo@example.com",
        passwordHash: bcrypt.hashSync("secret", 10),
                                      role: "student",
    });

    // Themes e Lessons
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
        TeacherId: teacher.id,
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
        {
            QuestionId: q2.id,
            text: "Summarize and close the main ideas",
            isCorrect: true,
        },
        { QuestionId: q2.id, text: "Introduce the topic", isCorrect: false },
        { QuestionId: q2.id, text: "List references", isCorrect: false },
    ]);

    const l2 = await Lesson.create({
        ThemeId: critical.id,
        TeacherId: teacher.id,
        title: "Main idea vs details",
        description: "Identify main ideas in a paragraph",
        difficulty: 2,
    });

    const q3 = await Question.create({
        LessonId: l2.id,
        text: "Which sentence best states the main idea?",
    });

    await Option.bulkCreate([
        {
            QuestionId: q3.id,
            text: "The central point that the paragraph develops",
            isCorrect: true,
        },
        { QuestionId: q3.id, text: "A supporting detail", isCorrect: false },
        { QuestionId: q3.id, text: "An unrelated example", isCorrect: false },
    ]);

    // Quiz demo
    const quiz = await Quiz.create({
        title: "Reading Basics Quiz",
        description: "Quick quiz about basic reading skills",
        difficulty: 1,
    });

    const qq1 = await Question.create({
        QuizId: quiz.id,
        text: "What is a paragraph main idea?",
    });

    await Option.bulkCreate([
        {
            QuestionId: qq1.id,
            text: "The central concept that unifies the paragraph",
            isCorrect: true,
        },
        {
            QuestionId: qq1.id,
            text: "Any isolated detail",
            isCorrect: false,
        },
        {
            QuestionId: qq1.id,
            text: "The last sentence only",
            isCorrect: false,
        },
    ]);

    console.log("Seed complete");
    console.log("Admin:    admin@example.com / admin123");
    console.log("Teacher:  teacher@example.com / teacher123");
    console.log("Student:  demo@example.com / secret");
    process.exit(0);
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
});
