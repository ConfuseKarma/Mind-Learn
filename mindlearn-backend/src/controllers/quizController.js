import { Quiz, Question, Option, Attempt, Badge, UserBadge } from '../models/index.js'

export async function listQuizzes(req, res) {
  const quizzes = await Quiz.findAll({ attributes: ['id', 'title', 'description', 'difficulty'], order: [['id', 'ASC']] })
  res.json(quizzes)
}

export async function getQuiz(req, res) {
  const id = Number(req.params.id)
  const quiz = await Quiz.findByPk(id, {
    include: { model: Question, include: { model: Option, attributes: ['id', 'text'] } }
  })
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' })
  res.json(quiz)
}

export async function attemptQuiz(req, res) {
  const id = Number(req.params.id)
  const quiz = await Quiz.findByPk(id, { include: { model: Question, include: Option } })
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' })
  const { answers } = req.body
  if (!Array.isArray(answers) || answers.length === 0) return res.status(400).json({ error: 'answers required' })

  let score = 0
  const answerMap = new Map(answers.map(a => [Number(a.questionId), Number(a.optionId)]))
  for (const q of quiz.Questions) {
    const chosen = answerMap.get(q.id)
    if (!chosen) continue
    const opt = q.Options.find(o => o.id === chosen)
    if (opt?.isCorrect) score += 1
  }
  const total = quiz.Questions.length
  await Attempt.create({ UserId: req.user.id, QuizId: quiz.id, score, total })

  let earnedBadge = null
  const attemptsCount = await Attempt.count({ where: { UserId: req.user.id } })
  if (attemptsCount === 1) {
    const b = await Badge.findOne({ where: { code: 'FIRST_STEPS' } })
    if (b) {
      await UserBadge.findOrCreate({ where: { UserId: req.user.id, BadgeId: b.id }, defaults: {} })
      earnedBadge = b.code
    }
  }
  if (score === total) {
    const b = await Badge.findOne({ where: { code: 'PERFECT_SCORE' } })
    if (b) {
      await UserBadge.findOrCreate({ where: { UserId: req.user.id, BadgeId: b.id }, defaults: {} })
      earnedBadge = earnedBadge || b.code
    }
  }
  res.json({ score, total, earnedBadge })
}
