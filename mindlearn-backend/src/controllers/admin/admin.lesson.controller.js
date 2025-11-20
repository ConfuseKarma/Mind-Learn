// controllers/admin/admin.lesson.controller.js
import { Lesson, Theme, User, Question, Option } from "../../models/index.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";
import { logAudit } from "../../utils/audit.js";

// GET /admin/lessons
// filtros opcionais: ?themeId=1&teacherId=2
export async function listLessonsAdmin(req, res, next) {
  try {
    const pagination = getPaginationParams(req);
    const where = {};

    if (req.query.themeId) where.ThemeId = Number(req.query.themeId);
    if (req.query.teacherId) where.TeacherId = Number(req.query.teacherId);

    if (!pagination) {
      const lessons = await Lesson.findAll({
        where,
        attributes: ["id", "title", "description", "difficulty", "ThemeId", "TeacherId"],
        order: [["id", "ASC"]],
      });
      return res.json(lessons);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Lesson.findAndCountAll({
      where,
      attributes: ["id", "title", "description", "difficulty", "ThemeId", "TeacherId"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

// GET /admin/lessons/:id
export async function getLessonAdmin(req, res, next) {
  const id = Number(req.params.id);

  try {
    const lesson = await Lesson.findByPk(id, {
      include: [
        { model: Theme, attributes: ["id", "name"] },
        { model: User, as: "Teacher", attributes: ["id", "name", "email"] },
        { model: Question, include: Option },
      ],
    });

    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.json(lesson);
  } catch (e) {
    next(e);
  }
}

// POST /admin/lessons
// admin pode opcionalmente atribuir TeacherId
export async function createLessonAdmin(req, res, next) {
  const { themeId, teacherId, title, description, difficulty, questions } = req.body;

  if (!themeId || !title) {
    return res.status(400).json({ error: "themeId and title required" });
  }

  try {
    const lesson = await Lesson.create({
      ThemeId: themeId,
      TeacherId: teacherId || null,
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
            });
          }
        }
      }
    }

    const full = await Lesson.findByPk(lesson.id, {
      include: { model: Question, include: Option },
    });

    await logAudit(req.user, "ADMIN_CREATE_LESSON", {
      lessonId: lesson.id,
      themeId,
      teacherId: teacherId || null,
    });

    res.status(201).json(full);
  } catch (e) {
    next(e);
  }
}

// PUT /admin/lessons/:id
export async function updateLessonAdmin(req, res, next) {
  const id = Number(req.params.id);
  const { themeId, teacherId, title, description, difficulty } = req.body;

  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    if (themeId !== undefined) lesson.ThemeId = themeId;
    if (teacherId !== undefined) lesson.TeacherId = teacherId;
    if (title !== undefined) lesson.title = title;
    if (description !== undefined) lesson.description = description;
    if (difficulty !== undefined) lesson.difficulty = difficulty;

    await lesson.save();

    await logAudit(req.user, "ADMIN_UPDATE_LESSON", {
      lessonId: lesson.id,
    });

    const full = await Lesson.findByPk(lesson.id, {
      include: { model: Question, include: Option },
    });

    res.json(full);
  } catch (e) {
    next(e);
  }
}

// DELETE /admin/lessons/:id
export async function deleteLessonAdmin(req, res, next) {
  const id = Number(req.params.id);

  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    await lesson.destroy(); // Questions, Options e Attempts em cascata

    await logAudit(req.user, "ADMIN_DELETE_LESSON", {
      lessonId: id,
    });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
