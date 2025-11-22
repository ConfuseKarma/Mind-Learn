// controllers/student/student.lesson.controller.js
import { Theme, Lesson, Question, Option, Attempt, Badge, UserBadge } from "../../models/index.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";

export async function listThemes(req, res, next) {
  try {
    const pagination = getPaginationParams(req);

    if (!pagination) {
      const themes = await Theme.findAll({
        attributes: ["id", "name", "description"],
        order: [["id", "ASC"]],
      });
      return res.json(themes);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Theme.findAndCountAll({
      attributes: ["id", "name", "description"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    return res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

export async function listLessonsByTheme(req, res, next) {
  const id = Number(req.params.id);

  try {
    const pagination = getPaginationParams(req);

    if (!pagination) {
      const lessons = await Lesson.findAll({
        where: { ThemeId: id },
        attributes: ["id", "title", "description", "difficulty"],
        order: [["id", "ASC"]],
      });
      return res.json(lessons);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Lesson.findAndCountAll({
      where: { ThemeId: id },
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

export async function getLesson(req, res, next) {
  const id = Number(req.params.id);
  try {
    const lesson = await Lesson.findByPk(id, {
      include: {
        model: Question,
        include: {
          model: Option,
          attributes: ["id", "text"],
        },
      },
    });
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.json(lesson);
  } catch (e) {
    next(e);
  }
}

export async function attemptLesson(req, res, next) {
  const id = Number(req.params.id);
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "answers required" });
  }

  try {
    const lesson = await Lesson.findByPk(id, {
      include: {
        model: Question,
        include: Option,
      },
    });
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    const map = new Map(answers.map((a) => [Number(a.questionId), Number(a.optionId)]));

    let score = 0;

    const details = lesson.Questions.map((q) => {
      const chosenOptionId = map.get(q.id) ?? null;
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

    const total = lesson.Questions.length;

    const normalizedAnswers = Array.isArray(answers)
      ? answers.map((a) => ({
          questionId: Number(a.questionId),
          optionId: Number(a.optionId),
        }))
      : [];

    await Attempt.create({
      UserId: req.user.id,
      LessonId: lesson.id,
      score,
      total,
      answersJson: JSON.stringify(normalizedAnswers),
    });

    const passing = Number(process.env.PASSING_SCORE_PERCENT || 70);
    const passed = total > 0 ? (score * 100) / total >= passing : false;

    let earnedBadge = null;

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

    if (score === total && total > 0) {
      let b = await Badge.findOne({ where: { code: "PERFECT_SCORE" } });
      if (!b) {
        b = await Badge.create({
          code: "PERFECT_SCORE",
          name: "Perfect Score",
          description: "Achieved 100% in a lesson",
        });
      }
      await UserBadge.findOrCreate({
        where: { UserId: req.user.id, BadgeId: b.id },
        defaults: {},
      });
      earnedBadge = earnedBadge || b.code;
    }

    if (passed) {
      const themeId = lesson.ThemeId;
      const lessonsInTheme = await Lesson.count({
        where: { ThemeId: themeId },
      });

      const attempts = await Attempt.findAll({
        where: { UserId: req.user.id },
        include: Lesson,
      });

      const passedLessonIds = new Set();
      for (const a of attempts) {
        if (a.Lesson && a.Lesson.ThemeId === themeId) {
          const pct = a.total > 0 ? (a.score * 100) / a.total : 0;
          if (pct >= passing) passedLessonIds.add(a.LessonId);
        }
      }

      if (passedLessonIds.size >= lessonsInTheme && lessonsInTheme > 0) {
        const code = `THEME_${themeId}_COMPLETE`;
        let b = await Badge.findOne({ where: { code } });
        if (!b) {
          b = await Badge.create({
            code,
            name: `Theme ${themeId} Complete`,
            description: "Completed all lessons of this theme with passing score",
          });
        }
        await UserBadge.findOrCreate({
          where: { UserId: req.user.id, BadgeId: b.id },
          defaults: {},
        });
        earnedBadge = earnedBadge || code;
      }
    }

    res.json({ score, total, passed, earnedBadge, details });
  } catch (e) {
    next(e);
  }
}
