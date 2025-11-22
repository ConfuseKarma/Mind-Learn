// controllers/teacher/teacher.quiz.controller.js
import { Quiz, Question, Option } from "../../models/index.js";
import { sequelize } from "../../db.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";
import { logAudit } from "../../utils/audit.js";

function validateQuizPayload(body) {
  const { title, questions } = body;
  if (!title) return "title is required";
  if (questions && !Array.isArray(questions)) {
    return "questions must be an array if provided";
  }
  return null;
}

export async function listMyQuizzes(req, res, next) {
  try {
    const pagination = getPaginationParams(req);
    const where = { AuthorId: req.user.id };

    if (!pagination) {
      const quizzes = await Quiz.findAll({
        where,
        attributes: ["id", "title", "description", "difficulty"],
        order: [["id", "ASC"]],
      });
      return res.json(quizzes);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Quiz.findAndCountAll({
      where,
      attributes: ["id", "title", "description", "difficulty"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

export async function getMyQuiz(req, res, next) {
  const id = Number(req.params.id);

  try {
    const quiz = await Quiz.findByPk(id, {
      include: { model: Question, include: Option },
    });

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    if (quiz.AuthorId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(quiz);
  } catch (e) {
    next(e);
  }
}

export async function createQuizAsTeacher(req, res, next) {
  const error = validateQuizPayload(req.body);
  if (error) return res.status(400).json({ error });

  const { title, description, difficulty, questions } = req.body;

  try {
    const quiz = await Quiz.create({
      title,
      description,
      difficulty: difficulty || 1,
      AuthorId: req.user.id,
    });

    if (Array.isArray(questions)) {
      for (const q of questions) {
        const Q = await Question.create({
          QuizId: quiz.id,
          text: q.text,
        });
        if (Array.isArray(q.options)) {
          for (const o of q.options) {
            await Option.create({
              QuestionId: Q.id,
              text: o.text,
              isCorrect: !!o.isCorrect,
              explanation: o.explanation || null,
            });
          }
        }
      }
    }

    const full = await Quiz.findByPk(quiz.id, {
      include: { model: Question, include: Option },
    });

    await logAudit(req.user, "TEACHER_CREATE_QUIZ", {
      quizId: quiz.id,
      title: quiz.title,
    });

    res.status(201).json(full);
  } catch (e) {
    next(e);
  }
}

export async function updateMyQuiz(req, res, next) {
  const id = Number(req.params.id);
  const { title, description, difficulty, questions } = req.body;

  const t = await sequelize.transaction();
  try {
    const quiz = await Quiz.findByPk(id, { transaction: t });
    if (!quiz) {
      await t.rollback();
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.AuthorId !== req.user.id && req.user.role !== "admin") {
      await t.rollback();
      return res.status(403).json({ error: "Forbidden" });
    }

    if (title !== undefined) quiz.title = title;
    if (description !== undefined) quiz.description = description;
    if (difficulty !== undefined) quiz.difficulty = difficulty;

    await quiz.save({ transaction: t });

    if (Array.isArray(questions)) {
      const oldQuestions = await Question.findAll({
        where: { QuizId: quiz.id },
        transaction: t,
      });
      const qIds = oldQuestions.map((q) => q.id);

      if (qIds.length) {
        await Option.destroy({ where: { QuestionId: qIds }, transaction: t });
      }
      await Question.destroy({ where: { QuizId: quiz.id }, transaction: t });

      for (const q of questions) {
        const Q = await Question.create(
          {
            QuizId: quiz.id,
            text: q.text,
          },
          { transaction: t },
        );
        if (Array.isArray(q.options)) {
          for (const o of q.options) {
            await Option.create(
              {
                QuestionId: Q.id,
                text: o.text,
                isCorrect: !!o.isCorrect,
                explanation: o.explanation || null,
              },
              { transaction: t },
            );
          }
        }
      }
    }

    await t.commit();

    await logAudit(req.user, "TEACHER_UPDATE_QUIZ", {
      quizId: quiz.id,
    });

    const full = await Quiz.findByPk(quiz.id, {
      include: { model: Question, include: Option },
    });

    res.json(full);
  } catch (e) {
    await t.rollback();
    next(e);
  }
}

export async function deleteMyQuiz(req, res, next) {
  const id = Number(req.params.id);

  try {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    if (quiz.AuthorId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await quiz.destroy();

    await logAudit(req.user, "TEACHER_DELETE_QUIZ", {
      quizId: id,
    });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
