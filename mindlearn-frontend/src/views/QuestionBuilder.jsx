// views/QuestionBuilder.jsx
export function QuestionBuilder({ value, onChange, title = 'Questões' }) {
  const questions = value || []

  function updateQuestions(next) {
    onChange(next)
  }

  function addQuestion() {
    const next = [
      ...questions,
      {
        text: '',
        options: [
          {
            text: '',
            isCorrect: true,
            explanation: ''
          }
        ]
      }
    ]
    updateQuestions(next)
  }

  function removeQuestion(qIndex) {
    const next = questions.filter((_, i) => i !== qIndex)
    updateQuestions(next)
  }

  function updateQuestionText(qIndex, text) {
    const next = questions.map((q, i) =>
      i === qIndex ? { ...q, text } : q
    )
    updateQuestions(next)
  }

  function addOption(qIndex) {
    const next = questions.map((q, i) =>
      i === qIndex
        ? {
          ...q,
          options: [
            ...(q.options || []),
            { text: '', isCorrect: false, explanation: '' }
          ]
        }
        : q
    )
    updateQuestions(next)
  }

  function removeOption(qIndex, oIndex) {
    const next = questions.map((q, i) => {
      if (i !== qIndex) return q
      const opts = (q.options || []).filter((_, j) => j !== oIndex)
      return { ...q, options: opts }
    })
    updateQuestions(next)
  }

  function updateOptionField(qIndex, oIndex, field, value) {
    const next = questions.map((q, i) => {
      if (i !== qIndex) return q
      const opts = (q.options || []).map((o, j) =>
        j === oIndex ? { ...o, [field]: value } : o
      )
      return { ...q, options: opts }
    })
    updateQuestions(next)
  }

  function setCorrectOption(qIndex, oIndex) {
    const next = questions.map((q, i) => {
      if (i !== qIndex) return q
      const opts = (q.options || []).map((o, j) => ({
        ...o,
        isCorrect: j === oIndex
      }))
      return { ...q, options: opts }
    })
    updateQuestions(next)
  }

  return (
    <div className="grid">
      <div className="header">{title}</div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="card shadow">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="sub">Questão #{qIndex + 1}</div>
            <button
              type="button"
              className="btn ghost"
              onClick={() => removeQuestion(qIndex)}
            >
              Remover
            </button>
          </div>

          <div className="space"></div>

          <input
            value={q.text}
            onChange={(e) => updateQuestionText(qIndex, e.target.value)}
            placeholder="Enunciado da questão"
          />

          <div className="space-lg"></div>
          <div className="sub muted">Alternativas</div>
          <div className="space"></div>

          <div className="grid">
            {(q.options || []).map((o, oIndex) => (
              <div
                key={oIndex}
                className="card"
                style={{ padding: 10, background: 'var(--bg-elev)' }}
              >
                <div className="row" style={{ gap: 8, alignItems: 'center' }}>
                  <input
                    type="radio"
                    name={`q-${qIndex}-correct`}
                    checked={!!o.isCorrect}
                    onChange={() => setCorrectOption(qIndex, oIndex)}
                    style={{ width: 16 }}
                  />
                  <span className="muted" style={{ fontSize: 12 }}>
                    Correta
                  </span>
                </div>

                <div className="space"></div>

                <input
                  value={o.text}
                  onChange={(e) =>
                    updateOptionField(qIndex, oIndex, 'text', e.target.value)
                  }
                  placeholder={`Texto da alternativa #${oIndex + 1}`}
                />

                <div className="space"></div>
                <textarea
                  rows={2}
                  value={o.explanation || ''}
                  onChange={(e) =>
                    updateOptionField(
                      qIndex,
                      oIndex,
                      'explanation',
                      e.target.value
                    )
                  }
                  placeholder="Motivo / explicação para esta alternativa (como você explicaria para o aluno)"
                />

                <div className="space"></div>
                <div className="row" style={{ justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => removeOption(qIndex, oIndex)}
                  >
                    ✕ Remover alternativa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space"></div>
          <button
            type="button"
            className="btn secondary"
            onClick={() => addOption(qIndex)}
          >
            Adicionar alternativa
          </button>
        </div>
      ))}

      <button type="button" className="btn" onClick={addQuestion}>
        Adicionar questão
      </button>
    </div>
  )
}
