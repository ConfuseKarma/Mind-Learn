import { Attempt, Badge, UserBadge } from '../models/index.js'

export async function myProgress(req, res) {
  const userId = req.user.id
  const totalAttempts = await Attempt.count({ where: { UserId: userId } })
  const rows = await Attempt.findAll({ where: { UserId: userId } })
  const averageAccuracy = rows.length ? rows.reduce((a, r) => a + r.score / r.total, 0) / rows.length : 0

  const badges = await UserBadge.findAll({ where: { UserId: userId }, include: Badge })
  const mapped = badges.map(x => ({ code: x.Badge.code, name: x.Badge.name, description: x.Badge.description }))

  res.json({ totalAttempts, averageAccuracy, badges: mapped })
}
