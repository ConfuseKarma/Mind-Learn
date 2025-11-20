// controllers/admin/admin.quiz.controller.js
import { Quiz, Question, Option } from "../../models/index.js";
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

// GET /admin/quizzes
export async function listQuizzesAdmin(req, res, next) {
  try {
    const pagination = getPaginationParams(req);

    if (!pagination) {
      const quizzes = await Quiz.findAll({
        attributes: ["id", "title", "description", "difficulty", "AuthorId"],
        order: [["id", "ASC"]],
      });
      return res.json(quizzes);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Quiz.findAndCountAll({
      attributes: ["id", "title", "description", "difficulty", "AuthorId"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

// GET /admin/quizzes/:id
export async function getQuizAdmin(req, res, next) {
  const id = Number(req.params.id);

  try {
    const quiz = await Quiz.findByPk(id, {
      include: { model: Question, include: Option },
    });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (e) {
    next(e);
  }
}

// POST /admin/quizzes
export async function adminCreateQuiz(req, res, next) {
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
            });
          }
        }
      }
    }

    const full = await Quiz.findByPk(quiz.id, {
      include: { model: Question, include: Option },
    });

    await logAudit(req.user, "ADMIN_CREATE_QUIZ", {
      quizId: quiz.id,
      title: quiz.title,
    });

    res.status(201).json(full);
  } catch (e) {
    next(e);
  }
}

// PUT /admin/quizzes/:id
export async function adminUpdateQuiz(req, res, next) {
  const id = Number(req.params.id);
  const { title, description, difficulty } = req.body;

  try {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    if (title !== undefined) quiz.title = title;
    if (description !== undefined) quiz.description = description;
    if (difficulty !== undefined) quiz.difficulty = difficulty;

    await quiz.save();

    await logAudit(req.user, "ADMIN_UPDATE_QUIZ", {
      quizId: quiz.id,
    });

    const full = await Quiz.findByPk(quiz.id, {
      include: { model: Question, include: Option },
    });

    res.json(full);
  } catch (e) {
    next(e);
  }
}

// DELETE /admin/quizzes/:id
export async function adminDeleteQuiz(req, res, next) {
  const id = Number(req.params.id);

  try {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    await quiz.destroy();

    await logAudit(req.user, "ADMIN_DELETE_QUIZ", {
      quizId: id,
    });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
