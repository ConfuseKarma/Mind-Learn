import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me')
    req.user = { id: decoded.id, email: decoded.email }
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function requireAdmin(req, res, next) {
  const secret = req.headers['x-admin-secret']
  if (!secret || secret !== (process.env.JWT_SECRET || 'dev_secret_change_me')) {
    return res.status(403).json({ error: 'Admin secret missing or invalid' })
  }
  next()
}
