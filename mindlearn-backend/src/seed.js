import 'dotenv/config'
import { sequelize } from './db.js'
import { User, Quiz, Question, Option, Badge } from './models/index.js'
import bcrypt from 'bcryptjs'

async function seed() {
  await sequelize.authenticate()
  await sequelize.sync({ force: true })

  await Badge.bulkCreate([
    { code: 'FIRST_STEPS', name: 'Primeiros Passos', description: 'Concluiu o primeiro quiz' },
    { code: 'PERFECT_SCORE', name: 'Pontuação Perfeita', description: 'Acertou todas as questões em um quiz' }
  ])

  await User.create({ name: 'Demo User', email: 'demo@example.com', passwordHash: bcrypt.hashSync('secret', 10) })

  const quiz = await Quiz.create({ title: 'Compreensão de Texto: Nível 1', description: 'Leia o trecho e responda', difficulty: 1 })
  const q1 = await Question.create({ text: 'No trecho "O sol nasce a leste", qual é o sujeito da oração?', QuizId: quiz.id })
  await Option.bulkCreate([
    { text: 'O sol', isCorrect: true, QuestionId: q1.id },
    { text: 'Nasce', isCorrect: false, QuestionId: q1.id },
    { text: 'A leste', isCorrect: false, QuestionId: q1.id },
  ])
  const q2 = await Question.create({ text: 'Qual é o propósito de uma conclusão em um texto?', QuizId: quiz.id })
  await Option.bulkCreate([
    { text: 'Resumir e encerrar as ideias principais', isCorrect: true, QuestionId: q2.id },
    { text: 'Apresentar o tema', isCorrect: false, QuestionId: q2.id },
    { text: 'Citar fontes', isCorrect: false, QuestionId: q2.id },
  ])

  console.log('Seed complete. Demo user: demo@example.com / secret')
  process.exit(0)
}

seed().catch(e => { console.error(e); process.exit(1) })
