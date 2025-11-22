// views/Quizzes.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'

function difficultyLabel(d) {
  const n = Number(d) || 1
  if (n <= 1) return 'Iniciante'
  if (n === 2) return 'Intermediário'
  if (n === 3) return 'Avançado'
  return `Nível ${n}`
}

function difficultyColor(d) {
  const n = Number(d) || 1
  if (n <= 1) return 'rgba(34,197,94,0.12)'
  if (n === 2) return 'rgba(59,130,246,0.12)'
  if (n === 3) return 'rgba(249,115,22,0.12)'
  return 'rgba(148,163,184,0.18)'
}

export default function Quizzes() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    ; (async () => {
      try {
        setData(await api.quizzes())
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading)
    return (
      <div className="center" style={{ height: '50vh' }}>
        Carregando...
      </div>
    )
  if (error) return <div className="danger">{error}</div>

  return (
    <div className="grid">
      <div className="header">Testes</div>
      <div className="muted sub">
        Avaliações rápidas para revisar e consolidar o que você estudou.
      </div>
      <div className="grid cols-2">
        {data.map((q) => (
          <Link
            key={q.id}
            to={`/quizzes/${q.id}`}
            className="card shadow"
            style={{ textDecoration: 'none' }}
          >
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="row">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(56,189,248,0.12)',
                    fontSize: 20
                  }}
                >
                  <span>🧩</span>
                </div>
                <div>
                  <div className="header" style={{ fontSize: 18 }}>
                    {q.title}
                  </div>
                  <div className="muted sub">{q.description}</div>
                </div>
              </div>
              <div
                className="badge"
                style={{
                  background: difficultyColor(q.difficulty),
                  borderColor: 'transparent',
                  fontSize: 12
                }}
              >
                {difficultyLabel(q.difficulty)}
              </div>
            </div>
            <div className="space"></div>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="muted sub">Teste ID: {q.id}</div>
              <div className="link">Abrir teste →</div>
            </div>
          </Link>
        ))}
        {!data.length && (
          <div className="muted">Nenhum teste disponível ainda.</div>
        )}
      </div>
    </div>
  )
}
