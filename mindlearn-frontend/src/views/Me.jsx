// views/Me.jsx
import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../utils/auth.jsx'

export default function Me() {
  const { user, role, setUser, token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [setDevClicks] = useState(0)
  const [showSession, setShowSession] = useState(false)

  useEffect(() => {
    ; (async () => {
      try {
        const me = await api.me()
        setUser({
          name: me.name,
          email: me.email,
          role: me.role
        })
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [setUser])

  function handleDevClick() {
    setDevClicks((c) => {
      const next = c + 1
      if (next >= 3) {
        setShowSession((s) => !s)
        return 0
      }
      return next
    })
  }

  if (loading)
    return (
      <div className="center" style={{ height: '50vh' }}>
        Carregando...
      </div>
    )
  if (error) return <div className="danger">{error}</div>

  const papel =
    role === 'student'
      ? 'Aluno'
      : role === 'teacher'
        ? 'Professor'
        : role === 'admin'
          ? 'Admin'
          : role || 'Desconhecido'

  return (
    <div className="grid">
      <div className="header">Perfil</div>
      <div className="grid cols-2">
        <div className="card shadow">
          <div className="sub muted">Informações básicas</div>
          <div className="space"></div>
          <div>Nome: <b>{user?.name}</b></div>
          <div>E-mail: <b>{user?.email}</b></div>
          <div>Papel: <b>{papel}</b></div>
        </div>

        <div className="card shadow">
          <div
            className="sub muted"
            style={{ cursor: 'pointer' }}
            onClick={handleDevClick}
            title="Toque 3x para exibir detalhes de sessão"
          >
            Sessão (toque 3x para detalhes)
          </div>
          <div className="space"></div>
          {!showSession && (
            <div className="muted sub">
              Os detalhes da sessão ficam ocultos por padrão para manter a
              interface limpa. Toque três vezes no título acima para exibir.
            </div>
          )}
          {showSession && (
            <pre className="session-debug">
              {JSON.stringify(
                {
                  token,
                  role,
                  user
                },
                null,
                2
              )}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
