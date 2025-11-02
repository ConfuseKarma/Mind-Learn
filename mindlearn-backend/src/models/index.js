import { DataTypes } from 'sequelize'
import { sequelize } from '../db.js'

export const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false }
})

export const Quiz = sequelize.define('Quiz', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  difficulty: { type: DataTypes.INTEGER, defaultValue: 1 }
})

export const Question = sequelize.define('Question', {
  text: { type: DataTypes.TEXT, allowNull: false }
})

export const Option = sequelize.define('Option', {
  text: { type: DataTypes.TEXT, allowNull: false },
  isCorrect: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { underscored: false })

export const Attempt = sequelize.define('Attempt', {
  score: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.INTEGER, allowNull: false }
})

export const Badge = sequelize.define('Badge', {
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }
})

export const UserBadge = sequelize.define('UserBadge', {}, { timestamps: true })

// Relations
Quiz.hasMany(Question, { onDelete: 'CASCADE' })
Question.belongsTo(Quiz)

Question.hasMany(Option, { onDelete: 'CASCADE' })
Option.belongsTo(Question)

User.hasMany(Attempt, { onDelete: 'CASCADE' })
Attempt.belongsTo(User)
Quiz.hasMany(Attempt, { onDelete: 'CASCADE' })
Attempt.belongsTo(Quiz)

User.belongsToMany(Badge, { through: UserBadge })
Badge.belongsToMany(User, { through: UserBadge })
