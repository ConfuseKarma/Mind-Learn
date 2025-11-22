// views/Themes.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'

function ThemeIcon({ index }) {
  const icons = ['📖', '🧠', '📝', '🔎', '📚', '💡']
  const icon = icons[index % icons.length]
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(37, 99, 235, 0.12)',
        fontSize: 20
      }}
    >
      <span>{icon}</span>
    </div>
  )
}

export default function Themes() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    ; (async () => {
      try {
        setData(await api.themes())
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
      <div className="header">Temas</div>
      <div className="muted sub">
        Escolha um tema para ver as lições disponíveis.
      </div>
      <div className="grid cols-2">
        {data.map((t, idx) => (
          <Link
            key={t.id}
            to={`/themes/${t.id}`}
            className="card shadow"
            style={{ textDecoration: 'none' }}
          >
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="row">
                <ThemeIcon index={idx} />
                <div>
                  <div className="header" style={{ fontSize: 18 }}>
                    {t.name}
                  </div>
                  <div className="muted sub">{t.description}</div>
                </div>
              </div>
              <div className="badge">ID: {t.id}</div>
            </div>
            <div className="space"></div>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="sub muted">
                Clique para ver as lições deste tema.
              </div>
              <div className="link">Abrir tema →</div>
            </div>
          </Link>
        ))}
        {!data.length && (
          <div className="muted">Nenhum tema disponível ainda.</div>
        )}
      </div>
    </div>
  )
}
