import { Theme, Lesson, Question, Option, Attempt, Badge, UserBadge } from "../models/index.js";

export async function listThemes(req, res) {
  const themes = await Theme.findAll({ attributes: ["id", "name", "description"] });
  res.json(themes);
}

export async function listLessonsByTheme(req, res) {
  const id = Number(req.params.id);
  const lessons = await Lesson.findAll({
    where: { ThemeId: id },
    attributes: ["id", "title", "description", "difficulty"],
  });
  res.json(lessons);
}

export async function getLesson(req, res) {
  const id = Number(req.params.id);
  const lesson = await Lesson.findByPk(id, {
    include: { model: Question, include: { model: Option, attributes: ["id", "text"] } },
  });
  if (!lesson) return res.status(404).json({ error: "Lesson not found" });
  res.json(lesson);
}

export async function attemptLesson(req, res) {
  const id = Number(req.params.id);
  const lesson = await Lesson.findByPk(id, { include: { model: Question, include: Option } });
  if (!lesson) return res.status(404).json({ error: "Lesson not found" });

  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length === 0)
    return res.status(400).json({ error: "answers required" });

  let score = 0;
  const map = new Map(answers.map((a) => [Number(a.questionId), Number(a.optionId)]));
  for (const q of lesson.Questions) {
    const chosen = map.get(q.id);
    if (!chosen) continue;
    const opt = q.Options.find((o) => o.id === chosen);
    if (opt?.isCorrect) score += 1;
  }
  const total = lesson.Questions.length;
  await Attempt.create({ UserId: req.user.id, LessonId: lesson.id, score, total });

  const passing = Number(process.env.PASSING_SCORE_PERCENT || 70);
  const passed = total > 0 ? (score * 100) / total >= passing : false;

  let earnedBadge = null;
  if (score === total && total > 0) {
    let b = await Badge.findOne({ where: { code: "PERFECT_SCORE" } });
    if (!b)
      b = await Badge.create({
        code: "PERFECT_SCORE",
        name: "Perfect Score",
        description: "Achieved 100% in a lesson",
      });
    await UserBadge.findOrCreate({ where: { UserId: req.user.id, BadgeId: b.id }, defaults: {} });
    earnedBadge = earnedBadge || b.code;
  }

  if (passed) {
    const themeId = lesson.ThemeId;
    const lessonsInTheme = await Lesson.count({ where: { ThemeId: themeId } });
    const attempts = await Attempt.findAll({ where: { UserId: req.user.id }, include: Lesson });
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
      if (!b)
        b = await Badge.create({
          code,
          name: `Theme ${themeId} Complete`,
          description: "Completed all lessons of this theme with passing score",
        });
      await UserBadge.findOrCreate({ where: { UserId: req.user.id, BadgeId: b.id }, defaults: {} });
      earnedBadge = earnedBadge || code;
    }
  }

  res.json({ score, total, passed, earnedBadge });
}
