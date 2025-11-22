// views/Quiz.jsx
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../utils/api'
import { useToast } from '../ui/ToastProvider.jsx'

export default function Quiz() {
  const { id } = useParams()
  const nav = useNavigate()
  const { showToast } = useToast()

  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [mode, setMode] = useState('answer')
  const [result, setResult] = useState(null)

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      setError('')
      try {
        const data = await api.quiz(id)
        setQuiz(data)
        setAnswers({})
        setMode('answer')
        setResult(null)
      } catch (e) {
        setError(e.message || 'Falha ao carregar teste.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const totalQuestions = quiz?.Questions?.length || 0
  const answeredCount = useMemo(
    () =>
      quiz?.Questions?.reduce(
        (acc, q) => (answers[q.id] ? acc + 1 : acc),
        0
      ) || 0,
    [answers, quiz]
  )
  const progressPct = totalQuestions
    ? Math.round((answeredCount / totalQuestions) * 100)
    : 0

  function select(qId, oId) {
    if (mode !== 'answer') return
    setAnswers((a) => ({ ...a, [qId]: oId }))
  }

  function getDetailForQuestion(qId) {
    if (!result?.details) return null
    return result.details.find((d) => d.questionId === qId) || null
  }

  function renderSummaryCard() {
    if (!result) return null
    const pct =
      result.total > 0 ? ((result.score * 100) / result.total).toFixed(1) : '0.0'

    return (
      <div className="card shadow">
        <div className="question-meta">Resultado do teste</div>
        <div className="header" style={{ fontSize: 18 }}>
          Você fez {result.score}/{result.total} questões
        </div>
        <div className="space"></div>
        <div className="sub muted">Aproveitamento: <b>{pct}%</b></div>
        {result.earnedBadge && (
          <>
            <div className="space"></div>
            <div className="badge">
              Nova medalha desbloqueada: {result.earnedBadge}
            </div>
          </>
        )}
      </div>
    )
  }

  async function submit() {
    if (!totalQuestions) return

    const payload = Object.entries(answers).map(([q, o]) => ({
      questionId: Number(q),
      optionId: Number(o)
    }))

    if (!payload.length) {
      showToast('Responda pelo menos uma questão antes de enviar.', 'error')
      return
    }

    setSubmitting(true)
    try {
      const r = await api.attemptQuiz(id, payload)
      setResult(r)
      setMode('review')

      let msg = `Você fez ${r.score}/${r.total} neste teste.`
      if (r.earnedBadge) msg += ` Medalha: ${r.earnedBadge}`
      msg += ' Veja o detalhamento por questão abaixo.'
      showToast(msg, 'success')
    } catch (e) {
      showToast(e.message || 'Falha ao enviar respostas.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <div className="center" style={{ height: '50vh' }}>
        Carregando...
      </div>
    )
  if (error && !quiz) return <div className="danger">{error}</div>
  if (!quiz) return null

  return (
    <div className="grid">
      <div className="card shadow">
        <div className="question-meta">Teste</div>
        <div className="header" style={{ fontSize: 20 }}>
          {quiz.title}
        </div>
        <div className="muted sub">{quiz.description}</div>
        <div className="space"></div>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="sub muted">
            Questões: <b>{totalQuestions}</b>
          </div>
          <div className="sub muted">
            Respondidas: <b>{answeredCount}</b> ({progressPct}%)
          </div>
        </div>
        <div className="space"></div>
        <div className="progress-track">
          <div
            className="progress-bar"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>

      {mode === 'review' && renderSummaryCard()}

      {quiz.Questions?.map((q, index) => {
        const detail = mode === 'review' ? getDetailForQuestion(q.id) : null

        return (
          <div key={q.id} className="card shadow">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="question-meta">
                Questão {index + 1} de {totalQuestions}
              </div>
              {mode === 'review' && detail && (
                <span
                  className="pill"
                  style={{
                    borderColor: detail.isCorrect
                      ? 'var(--accent)'
                      : 'var(--danger)',
                    background: detail.isCorrect
                      ? 'rgba(34,197,94,0.12)'
                      : 'rgba(239,68,68,0.12)',
                    fontSize: 12
                  }}
                >
                  {detail.isCorrect ? 'Correta' : 'Incorreta'}
                </span>
              )}
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
              {q.Options?.map((o) => {
                const selected = answers[q.id] === o.id

                const isReview = mode === 'review'
                const detailForQ = detail
                const isChosen = detailForQ?.chosenOptionId === o.id
                const isCorrectOption = detailForQ?.correctOption?.id === o.id

                let borderColor = 'var(--chip-br)'
                let background = 'var(--chip-bg)'

                if (!isReview && selected) {
                  borderColor = 'var(--primary)'
                  background = 'rgba(56,189,248,0.18)'
                }

                if (isReview && detailForQ) {
                  if (isCorrectOption) {
                    borderColor = 'var(--accent)'
                    background = 'rgba(34,197,94,0.12)'
                  } else if (isChosen && !detailForQ.isCorrect) {
                    borderColor = 'var(--danger)'
                    background = 'rgba(239,68,68,0.12)'
                  }
                }

                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => select(q.id, o.id)}
                    className="pill"
                    style={{
                      borderColor,
                      background,
                      color: 'var(--fg)',
                      justifyContent: 'flex-start',
                      cursor: mode === 'answer' ? 'pointer' : 'default'
                    }}
                  >
                    {o.text}
                  </button>
                )
              })}
            </div>

            {mode === 'review' && detail && detail.correctOption && (
              <>
                <div className="space"></div>
                <div className="muted sub">
                  <b>Comentário:</b>{' '}
                  {detail.correctOption.explanation ||
                    'Esta é a alternativa correta para esta questão.'}
                </div>
              </>
            )}
          </div>
        )
      })}

      {mode === 'answer' && (
        <div className="row" style={{ justifyContent: 'flex-end' }}>
          <button
            className="btn"
            onClick={submit}
            disabled={submitting || !totalQuestions}
          >
            {submitting ? 'Enviando...' : 'Enviar respostas'}
          </button>
        </div>
      )}

      {mode === 'review' && (
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="muted sub">
            Você pode revisar as explicações acima. Para refazer o teste, basta
            sair e entrar novamente.
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => nav('/quizzes')}
          >
            Voltar para testes
          </button>
        </div>
      )}
    </div>
  )
}
