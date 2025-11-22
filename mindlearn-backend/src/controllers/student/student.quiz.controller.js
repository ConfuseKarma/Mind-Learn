// controllers/student/student.quiz.controller.js
import { Quiz, Question, Option, Attempt, Badge, UserBadge } from "../../models/index.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";

export async function listQuizzes(req, res, next) {
  try {
    const pagination = getPaginationParams(req);

    if (!pagination) {
      const quizzes = await Quiz.findAll({
        attributes: ["id", "title", "description", "difficulty"],
        order: [["id", "ASC"]],
      });
      return res.json(quizzes);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Quiz.findAndCountAll({
      attributes: ["id", "title", "description", "difficulty"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    return res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

export async function getQuiz(req, res, next) {
  const id = Number(req.params.id);
  try {
    const quiz = await Quiz.findByPk(id, {
      include: {
        model: Question,
        include: {
          model: Option,
          attributes: ["id", "text"],
        },
      },
    });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (e) {
    next(e);
  }
}

// ===============================================
// VERSÃO CORRIGIDA: attemptQuiz com "details"
// ===============================================
export async function attemptQuiz(req, res, next) {
  const id = Number(req.params.id);
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "answers required" });
  }

  try {
    const quiz = await Quiz.findByPk(id, {
      include: { model: Question, include: Option }, // explanation vem aqui
    });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const answerMap = new Map(answers.map((a) => [Number(a.questionId), Number(a.optionId)]));

    let score = 0;

    const details = quiz.Questions.map((q) => {
      const chosenOptionId = answerMap.get(q.id) ?? null;
      const correctOption = q.Options.find((o) => o.isCorrect) || null;

      const isCorrect =
        chosenOptionId != null &&
        correctOption &&
        Number(chosenOptionId) === Number(correctOption.id);

      if (isCorrect) {
        score += 1;
      }

      return {
        questionId: q.id,
        chosenOptionId,
        isCorrect,
        correctOption: correctOption
          ? {
              id: correctOption.id,
              text: correctOption.text,
              explanation: correctOption.explanation || null,
            }
          : null,
      };
    });

    const total = quiz.Questions.length;

    const normalizedAnswers = Array.isArray(answers)
      ? answers.map((a) => ({
          questionId: Number(a.questionId),
          optionId: Number(a.optionId),
        }))
      : [];

    await Attempt.create({
      UserId: req.user.id,
      QuizId: quiz.id,
      score,
      total,
      answersJson: JSON.stringify(normalizedAnswers),
    });

    let earnedBadge = null;

    // FIRST_STEPS - primeira tentativa geral
    const attemptsCount = await Attempt.count({
      where: { UserId: req.user.id },
    });
    if (attemptsCount === 1) {
      const b = await Badge.findOne({ where: { code: "FIRST_STEPS" } });
      if (b) {
        await UserBadge.findOrCreate({
          where: { UserId: req.user.id, BadgeId: b.id },
          defaults: {},
        });
        earnedBadge = b.code;
      }
    }

    // PERFECT_SCORE neste quiz
    if (score === total && total > 0) {
      const b = await Badge.findOne({ where: { code: "PERFECT_SCORE" } });
      if (b) {
        await UserBadge.findOrCreate({
          where: { UserId: req.user.id, BadgeId: b.id },
          defaults: {},
        });
        earnedBadge = earnedBadge || b.code;
      }
    }

    res.json({ score, total, earnedBadge, details });
  } catch (e) {
    next(e);
  }
}
