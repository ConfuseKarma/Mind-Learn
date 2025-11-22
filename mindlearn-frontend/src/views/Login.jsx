// views/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../utils/api'
import { useAuth } from '../utils/auth.jsx'
import { useToast } from '../ui/ToastProvider.jsx'

export default function Login() {
  const nav = useNavigate()
  const { setToken, setUser, setRole } = useAuth()
  const { showToast } = useToast()
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('secret')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const r = await api.login(email, password)
      setToken(r.token)

      const me = await api.me()
      setUser(me)
      setRole(me.role)

      showToast('Login realizado com sucesso.', 'success')

      if (me.role === 'admin') {
        nav('/admin', { replace: true })
      } else if (me.role === 'teacher') {
        nav('/teacher', { replace: true })
      } else {
        nav('/home', { replace: true })
      }
    } catch (err) {
      const msg = err.message || 'Falha no login'
      setError(msg)
      showToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <div className="card shadow">
        <div className="header">Bem-vindo de volta</div>
        <div className="muted sub">
          Faça login para continuar aprendendo com o Mind&Learn.
        </div>
        <div className="space-lg"></div>
        <form onSubmit={submit} className="grid">
          <div>
            <div className="muted sub">E-mail</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
            />
          </div>
          <div>
            <div className="muted sub">Senha</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••"
            />
          </div>
          {error && <div className="danger sub">{error}</div>}
          <button className="btn" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        <div className="space"></div>
        <div className="muted sub">
          Ainda não tem uma conta?{' '}
          <Link to="/signup" className="link">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  )
}
