// controllers/student/student.activity.controller.js
import { Attempt, Lesson, Quiz, Question, Option } from "../../models/index.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";

export async function listMyActivity(req, res, next) {
  try {
    const pagination = getPaginationParams(req);

    const baseQuery = {
      where: { UserId: req.user.id },
      include: [
        {
          model: Lesson,
          attributes: ["id", "title"],
        },
        {
          model: Quiz,
          attributes: ["id", "title"],
        },
      ],
      order: [["createdAt", "DESC"]],
    };

    if (!pagination) {
      const attempts = await Attempt.findAll(baseQuery);
      const mapped = attempts.map((a) => ({
        id: a.id,
        score: a.score,
        total: a.total,
        createdAt: a.createdAt,
        kind: a.LessonId ? "lesson" : "quiz",
        targetId: a.LessonId || a.QuizId,
        title: a.Lesson ? a.Lesson.title : a.Quiz?.title,
      }));
      return res.json(mapped);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Attempt.findAndCountAll({
      ...baseQuery,
      limit,
      offset,
    });

    const mapped = rows.map((a) => ({
      id: a.id,
      score: a.score,
      total: a.total,
      createdAt: a.createdAt,
      kind: a.LessonId ? "lesson" : "quiz",
      targetId: a.LessonId || a.QuizId,
      title: a.Lesson ? a.Lesson.title : a.Quiz?.title,
    }));

    res.json(buildPagedResponse(mapped, count, page, limit));
  } catch (e) {
    next(e);
  }
}

export async function getAttemptResolution(req, res, next) {
  const id = Number(req.params.id);

  try {
    const attempt = await Attempt.findByPk(id, {
      include: [
        {
          model: Lesson,
          include: { model: Question, include: Option },
        },
        {
          model: Quiz,
          include: { model: Question, include: Option },
        },
      ],
    });

    if (!attempt) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    if (attempt.UserId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const holder = attempt.Lesson || attempt.Quiz;
    const kind = attempt.LessonId ? "lesson" : "quiz";

    if (!holder) {
      return res.status(500).json({ error: "Inconsistent attempt (no Lesson or Quiz)" });
    }

    let parsedAnswers = [];
    if (attempt.answersJson) {
      try {
        parsedAnswers = JSON.parse(attempt.answersJson);
      } catch {
        parsedAnswers = [];
      }
    }

    const map = new Map(parsedAnswers.map((a) => [Number(a.questionId), Number(a.optionId)]));

    const questions = (holder.Questions || []).map((q) => {
      const chosenOptionId = map.get(q.id) ?? null;

      return {
        id: q.id,
        text: q.text,
        options: (q.Options || []).map((o) => ({
          id: o.id,
          text: o.text,
          explanation: o.explanation || null,
          isCorrect: !!o.isCorrect,
          isChosen: chosenOptionId != null && Number(chosenOptionId) === Number(o.id),
        })),
      };
    });

    res.json({
      id: attempt.id,
      kind,
      targetId: attempt.LessonId || attempt.QuizId,
      title: holder.title,
      description: holder.description,
      score: attempt.score,
      total: attempt.total,
      createdAt: attempt.createdAt,
      questions,
    });
  } catch (e) {
    next(e);
  }
}
