// views/Signup.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../utils/api'
import { useToast } from '../ui/ToastProvider.jsx'

export default function Signup() {
  const nav = useNavigate()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password) {
      const msg = 'Preencha todos os campos.'
      setError(msg)
      showToast(msg, 'error')
      return
    }
    if (password !== confirm) {
      const msg = 'As senhas não conferem.'
      setError(msg)
      showToast(msg, 'error')
      return
    }

    setLoading(true)
    try {
      await api.signup(name.trim(), email.trim(), password)
      showToast('Conta criada com sucesso. Você já pode fazer login.', 'success')
      nav('/login')
    } catch (err) {
      const msg = err.message || 'Falha ao criar conta'
      setError(msg)
      showToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <div className="card shadow">
        <div className="header">Criar conta</div>
        <div className="muted sub">
          Cadastre-se para começar a utilizar o Mind&Learn.
        </div>
        <div className="space-lg"></div>
        <form onSubmit={submit} className="grid">
          <div>
            <div className="muted sub">Nome</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>
          <div>
            <div className="muted sub">E-mail</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              type="email"
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
          <div>
            <div className="muted sub">Confirmar senha</div>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="•••••••"
            />
          </div>
          {error && <div className="danger sub">{error}</div>}
          <button className="btn" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
        <div className="space"></div>
        <div className="muted sub">
          Já possui conta?{' '}
          <Link to="/login" className="link">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  )
}
