// views/ActivityHistory.jsx
import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import { useToast } from '../ui/ToastProvider.jsx'

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('pt-BR')
  } catch {
    return iso
  }
}

function AttemptDetail({ detail, loading, meta }) {
  if (loading) {
    return (
      <div className="muted" style={{ fontSize: 13 }}>
        Carregando resolução...
      </div>
    )
  }

  if (!detail) return null

  const total = detail.total ?? detail.questions?.length ?? 0
  const score = detail.score ?? 0
  const pct = total > 0 ? Math.round((score * 100) / total) : 0

  const kindLabel =
    (detail.kind || meta?.kind) === 'lesson' ? 'Lição concluída' : 'Teste concluído'

  return (
    <div className="grid" style={{ marginTop: 12 }}>
      <div className="card shadow">
        <div className="question-meta">
          {kindLabel} · {meta?.createdAt ? formatDate(meta.createdAt) : null}
        </div>
        <div className="header" style={{ fontSize: 20 }}>
          {detail.title || meta?.title}
        </div>
        <div className="space"></div>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="sub muted">
            Questões: <b>{total}</b>
          </div>
          <div className="sub muted">
            Acertos:{' '}
            <b>
              {score}/{total}
            </b>{' '}
            ({pct}%)
          </div>
        </div>
        <div className="space"></div>
        <div className="progress-track">
          <div
            className="progress-bar"
            style={{ width: `${pct}%` }}
          ></div>
        </div>
      </div>

      {detail.questions?.map((q, idx) => (
        <div key={q.id} className="card shadow">
          <div className="question-meta">
            Questão {idx + 1} de {detail.questions.length}
          </div>
          <div
            style={{
              fontWeight: 700,
              marginBottom: 8,
              marginTop: 4
            }}
          >
            {q.text}
          </div>
          <div className="grid cols-3">
            {q.options?.map((o) => {
              const state = o.isCorrect
                ? 'correct'
                : o.isChosen
                  ? 'chosen'
                  : 'normal'

              let borderColor = 'var(--chip-br)'
              let bg = 'var(--chip-bg)'
              let color = 'var(--fg)'

              if (state === 'correct') {
                borderColor = 'var(--accent)'
                bg = 'rgba(34,197,94,0.12)'
              } else if (state === 'chosen') {
                borderColor = 'var(--danger)'
                bg = 'rgba(239,68,68,0.16)'
              }

              return (
                <div key={o.id} className="grid" style={{ gap: 4 }}>
                  <button
                    type="button"
                    className="pill"
                    style={{
                      borderColor,
                      background: bg,
                      color,
                      justifyContent: 'flex-start',
                      cursor: 'default'
                    }}
                  >
                    {o.text}
                  </button>
                  {o.explanation && o.isCorrect && (
                    <div className="muted" style={{ fontSize: 12 }}>
                      <b>Por que está correta:</b> {o.explanation}
                    </div>
                  )}
                  {o.explanation && o.isChosen && !o.isCorrect && (
                    <div className="muted" style={{ fontSize: 12 }}>
                      <b>Por que esta não é a correta:</b> {o.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ActivityHistory() {
  const { showToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedId, setSelectedId] = useState(null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      try {
        const data = await api.activity()
        setItems(data || [])
      } catch (e) {
        setError(e.message || 'Falha ao carregar histórico.')
        showToast(e.message || 'Falha ao carregar histórico.', 'error')
      } finally {
        setLoading(false)
      }
    })()
  }, [showToast])

  async function toggleDetail(attemptId) {
    if (selectedId === attemptId) {
      setSelectedId(null)
      setDetail(null)
      setDetailLoading(false)
      return
    }

    setSelectedId(attemptId)
    setDetail(null)
    setDetailLoading(true)

    try {
      const res = await api.activityDetail(attemptId)
      setDetail(res)
    } catch (e) {
      showToast(e.message || 'Falha ao carregar resolução.', 'error')
    } finally {
      setDetailLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="center" style={{ height: '50vh' }}>
        Carregando...
      </div>
    )
  }

  if (error) {
    return <div className="danger">{error}</div>
  }

  if (!items.length) {
    return (
      <div className="card shadow">
        <div className="header" style={{ fontSize: 18 }}>
          Histórico de atividades
        </div>
        <div className="space"></div>
        <div className="muted">Você ainda não tem tentativas registradas.</div>
      </div>
    )
  }

  return (
    <div className="grid">
      <div className="card shadow">
        <div className="header" style={{ fontSize: 18 }}>
          Histórico de atividades
        </div>
        <div className="space"></div>
        <div className="muted sub">
          Veja suas últimas lições e testes realizados. Clique em uma linha
          para ver a correção detalhada, igual à tela final de cada atividade.
        </div>
      </div>

      {items.map((item) => {
        const total = item.total ?? 0
        const score = item.score ?? 0
        const pct = total > 0 ? Math.round((score * 100) / total) : 0
        const kindLabel = item.kind === 'lesson' ? 'Lição' : 'Teste'
        const isOpen = selectedId === item.id

        return (
          <div key={item.id} className="card shadow">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="grid" style={{ gap: 4 }}>
                <div className="question-meta">
                  {kindLabel} · {formatDate(item.createdAt)}
                </div>
                <div style={{ fontWeight: 700 }}>{item.title}</div>
                <div className="muted" style={{ fontSize: 13 }}>
                  Resultado:{' '}
                  <b>
                    {score}/{total}
                  </b>{' '}
                  ({pct}%)
                </div>
              </div>

              <div className="grid" style={{ gap: 6, alignItems: 'flex-end' }}>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => toggleDetail(item.id)}
                >
                  {isOpen ? 'Fechar correção' : 'Ver correção'}
                </button>
              </div>
            </div>

            {isOpen && (
              <>
                <div className="space"></div>
                <AttemptDetail
                  detail={detail}
                  loading={detailLoading}
                  meta={item}
                />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
