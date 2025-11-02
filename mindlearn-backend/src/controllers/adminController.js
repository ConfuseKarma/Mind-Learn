import { Theme, Lesson, Question, Option } from '../models/index.js'

export async function createTheme(req, res) {
  const { name, description } = req.body
  if (!name) return res.status(400).json({ error: 'name required' })
  const theme = await Theme.create({ name, description })
  res.status(201).json(theme)
}

export async function createLesson(req, res) {
  const { themeId, title, description, difficulty, questions } = req.body
  if (!themeId || !title) return res.status(400).json({ error: 'themeId and title required' })
  const lesson = await Lesson.create({ ThemeId: themeId, title, description, difficulty: difficulty || 1 })
  if (Array.isArray(questions)) {
    for (const q of questions) {
      const Q = await Question.create({ LessonId: lesson.id, text: q.text })
      if (Array.isArray(q.options)) {
        for (const o of q.options) await Option.create({ QuestionId: Q.id, text: o.text, isCorrect: !!o.isCorrect })
      }
    }
  }
  const full = await Lesson.findByPk(lesson.id, { include: { model: Question, include: Option } })
  res.status(201).json(full)
}
