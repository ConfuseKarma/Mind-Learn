// controllers/teacher/teacher.lesson.controller.js
import { Lesson, Question, Option } from "../../models/index.js";
import { sequelize } from "../../db.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";
import { logAudit } from "../../utils/audit.js";

export async function listMyLessons(req, res, next) {
  try {
    const pagination = getPaginationParams(req);

    const where = { TeacherId: req.user.id };

    if (!pagination) {
      const lessons = await Lesson.findAll({
        where,
        attributes: ["id", "title", "description", "difficulty", "ThemeId"],
        order: [["id", "ASC"]],
      });
      return res.json(lessons);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Lesson.findAndCountAll({
      where,
      attributes: ["id", "title", "description", "difficulty", "ThemeId"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

export async function getMyLesson(req, res, next) {
  const id = Number(req.params.id);

  try {
    const lesson = await Lesson.findByPk(id, {
      include: { model: Question, include: Option },
    });

    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    if (lesson.TeacherId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(lesson);
  } catch (e) {
    next(e);
  }
}

export async function createLessonAsTeacher(req, res, next) {
  const { themeId, title, description, difficulty, questions } = req.body;

  if (!themeId || !title) {
    return res.status(400).json({ error: "themeId and title required" });
  }

  try {
    const lesson = await Lesson.create({
      ThemeId: themeId,
      TeacherId: req.user.id,
      title,
      description,
      difficulty: difficulty || 1,
    });

    if (Array.isArray(questions)) {
      for (const q of questions) {
        const Q = await Question.create({
          LessonId: lesson.id,
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

    const full = await Lesson.findByPk(lesson.id, {
      include: { model: Question, include: Option },
    });

    await logAudit(req.user, "TEACHER_CREATE_LESSON", {
      lessonId: lesson.id,
      themeId,
    });

    res.status(201).json(full);
  } catch (e) {
    next(e);
  }
}

export async function updateMyLesson(req, res, next) {
  const id = Number(req.params.id);
  const { title, description, difficulty, questions } = req.body;

  const t = await sequelize.transaction();
  try {
    const lesson = await Lesson.findByPk(id, { transaction: t });
    if (!lesson) {
      await t.rollback();
      return res.status(404).json({ error: "Lesson not found" });
    }

    if (lesson.TeacherId !== req.user.id && req.user.role !== "admin") {
      await t.rollback();
      return res.status(403).json({ error: "Forbidden" });
    }

    if (title !== undefined) lesson.title = title;
    if (description !== undefined) lesson.description = description;
    if (difficulty !== undefined) lesson.difficulty = difficulty;

    await lesson.save({ transaction: t });

    if (Array.isArray(questions)) {
      const oldQuestions = await Question.findAll({
        where: { LessonId: lesson.id },
        transaction: t,
      });
      const qIds = oldQuestions.map((q) => q.id);

      if (qIds.length) {
        await Option.destroy({ where: { QuestionId: qIds }, transaction: t });
      }
      await Question.destroy({ where: { LessonId: lesson.id }, transaction: t });

      for (const q of questions) {
        const Q = await Question.create(
          {
            LessonId: lesson.id,
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

    await logAudit(req.user, "TEACHER_UPDATE_LESSON", {
      lessonId: lesson.id,
    });

    const full = await Lesson.findByPk(lesson.id, {
      include: { model: Question, include: Option },
    });

    res.json(full);
  } catch (e) {
    await t.rollback();
    next(e);
  }
}

export async function deleteMyLesson(req, res, next) {
  const id = Number(req.params.id);

  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    if (lesson.TeacherId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await lesson.destroy();

    await logAudit(req.user, "TEACHER_DELETE_LESSON", {
      lessonId: id,
    });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
