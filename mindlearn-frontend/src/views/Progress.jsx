// views/Progress.jsx
import { useEffect, useState } from 'react'
import { api } from '../utils/api'

function badgeIcon(code) {
  if (!code) return '🏅'
  if (code === 'FIRST_STEPS') return '🥉'
  if (code === 'PERFECT_SCORE') return '🥇'
  if (code.startsWith('THEME_')) return '🎓'
  return '🏅'
}

export default function Progress() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    ; (async () => {
      try {
        setData(await api.progress())
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
  if (!data) return null

  const pct = (data.averageAccuracy * 100) || 0
  const pctLabel = pct.toFixed(1) + '%'

  let resumo = 'Continue praticando e acompanhando seu progresso.'
  if (pct >= 80) resumo = 'Excelente! Sua taxa de acerto está muito alta.'
  else if (pct >= 60) resumo = 'Bom progresso, mas ainda há espaço para melhorar.'
  else resumo = 'Não desanime; cada tentativa é uma oportunidade de aprender.'

  return (
    <div className="grid">
      <div className="header">Meu Progresso</div>

      <div className="grid cols-2">
        <div className="card shadow">
          <div className="sub muted">Visão geral</div>
          <div className="space"></div>
          <div>Total de tentativas: <b>{data.totalAttempts}</b></div>
          <div className="space"></div>
          <div className="sub muted">Precisão média:</div>
          <div className="space"></div>
          <div className="progress-track">
            <div
              className="progress-bar"
              style={{ width: pct + '%' }}
            ></div>
          </div>
          <div className="space"></div>
          <div className="header" style={{ fontSize: 24 }}>{pctLabel}</div>
          <div className="muted sub">{resumo}</div>
        </div>

        <div className="card shadow">
          <div className="sub muted">Estatísticas rápidas</div>
          <div className="space"></div>
          <div className="grid cols-2">
            <div className="card">
              <div className="sub muted">Tentativas</div>
              <div className="header" style={{ fontSize: 22 }}>
                {data.totalAttempts}
              </div>
            </div>
            <div className="card">
              <div className="sub muted">Medalhas</div>
              <div className="header" style={{ fontSize: 22 }}>
                {data.badges?.length ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header">Medalhas</div>
      <div className="grid cols-3">
        {data.badges?.length ? (
          data.badges.map((b, i) => (
            <div className="card shadow" key={i}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(234,179,8,0.16)',
                    fontSize: 22
                  }}
                >
                  <span>{badgeIcon(b.code)}</span>
                </div>
                <span className="badge">{b.code}</span>
              </div>
              <div className="space"></div>
              <div style={{ fontWeight: 800 }}>{b.name}</div>
              <div className="muted sub">{b.description}</div>
            </div>
          ))
        ) : (
          <div className="muted">Nenhuma medalha ainda.</div>
        )}
      </div>
    </div>
  )
}
