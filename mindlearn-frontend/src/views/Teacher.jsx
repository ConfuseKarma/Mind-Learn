// views/Teacher.jsx
import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import { QuestionBuilder } from './QuestionBuilder'
import { useToast } from '../ui/ToastProvider'

export default function Teacher() {
  const [tab, setTab] = useState('lessons')

  return (
    <div className="grid">
      <div
        className="row"
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <div className="header">Área do Professor</div>
          <div className="muted sub">
            Crie e gerencie lições e testes para os seus alunos, com o mesmo
            visual do painel administrativo.
          </div>
        </div>
        <div className="toggle">
          <div
            className={`tab ${tab === 'lessons' ? 'active' : ''}`}
            onClick={() => setTab('lessons')}
          >
            Lições
          </div>
          <div
            className={`tab ${tab === 'quizzes' ? 'active' : ''}`}
            onClick={() => setTab('quizzes')}
          >
            Testes
          </div>
        </div>
      </div>

      {tab === 'lessons' ? <TeacherLessons /> : <TeacherQuizzes />}
    </div>
  )
}

function TeacherLessons() {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [themes, setThemes] = useState([])
  const [search, setSearch] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [themeId, setThemeId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState(1)
  const [questions, setQuestions] = useState([])

  async function loadLessons() {
    setLoading(true)
    try {
      const [list, themeList] = await Promise.all([
        api.teacher.lessons(),
        api.themes.list(),
      ])
      setItems(list || [])
      setThemes(themeList || [])
    } catch (e) {
      showToast(e.message || 'Falha ao carregar lições.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLessons()
  }, [])

  function resetForm() {
    setEditingId(null)
    setThemeId('')
    setTitle('')
    setDescription('')
    setDifficulty(1)
    setQuestions([])
  }

  async function loadLessonForEdit(id) {
    try {
      const full = await api.teacher.getLesson(id)
      setEditingId(full.id)
      setThemeId(String(full.ThemeId ?? ''))
      setTitle(full.title || '')
      setDescription(full.description || '')
      setDifficulty(full.difficulty || 1)

      const qs = (full.Questions || []).map((q) => ({
        text: q.text,
        options: (q.Options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation || '',
        })),
      }))
      setQuestions(qs)
    } catch (e) {
      showToast(e.message || 'Falha ao carregar lição para edição.', 'error')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const payload = {
      themeId: themeId ? Number(themeId) : undefined,
      title: title.trim(),
      description: description.trim(),
      difficulty: Number(difficulty) || 1,
      questions: (questions || []).map((q) => ({
        text: q.text,
        options: (q.options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation ?? '',
        })),
      })),
    }

    try {
      if (editingId) {
        await api.teacher.updateLesson(editingId, payload)
        showToast('Lição atualizada com sucesso.', 'success')
      } else {
        await api.teacher.createLesson(payload)
        showToast('Lição criada com sucesso.', 'success')
      }
      resetForm()
      loadLessons()
    } catch (e) {
      showToast(e.message || 'Falha ao salvar lição.', 'error')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Deseja realmente excluir esta lição?')) return
    try {
      await api.teacher.deleteLesson(id)
      showToast('Lição excluída.', 'success')
      if (editingId === id) resetForm()
      loadLessons()
    } catch (e) {
      showToast(e.message || 'Falha ao excluir lição.', 'error')
    }
  }

  const filtered = items.filter((l) =>
    (l.title || '').toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="grid cols-2" style={{ alignItems: 'flex-start' }}>
      <div
        className="card shadow"
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div
          className="row"
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <div className="sub" style={{ fontWeight: 600 }}>
              Minhas lições
            </div>
            <div className="muted sub">Somente as lições atribuídas a você.</div>
          </div>
          <button type="button" className="btn secondary" onClick={resetForm}>
            Nova lição
          </button>
        </div>

        <div className="space" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título..."
        />

        <div className="space" />
        {loading ? (
          <div className="muted">Carregando...</div>
        ) : filtered.length ? (
          <div className="grid">
            {filtered.map((l) => {
              const theme = themes.find(
                (t) => t.id === (l.ThemeId ?? l.themeId),
              )
              const themeLabel = theme
                ? `${theme.name} (ID ${theme.id})`
                : l.ThemeId
                  ? `Tema #${l.ThemeId}`
                  : 'Sem tema'

              return (
                <div key={l.id} className="card">
                  <div
                    className="row"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>{l.title}</div>
                      <div className="muted sub">
                        {themeLabel} · Dificuldade {l.difficulty}
                      </div>
                    </div>
                    <div className="row" style={{ gap: 4 }}>
                      <button
                        type="button"
                        className="btn ghost"
                        onClick={() => loadLessonForEdit(l.id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn ghost danger"
                        onClick={() => handleDelete(l.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="muted sub">Nenhuma lição encontrada.</div>
        )}
      </div>

      <div
        className="card shadow"
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div className="header">
          {editingId ? 'Editar lição' : 'Nova lição'}
        </div>
        <div className="muted sub">
          Defina o tema, título, nível de dificuldade e as questões da lição.
        </div>

        <div className="space" />
        <form onSubmit={handleSubmit} className="grid">
          <div className="grid cols-2">
            <div>
              <div className="sub muted">Tema</div>
              <select
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
              >
                <option value="">Selecione um tema...</option>
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (ID {t.id})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="sub muted">Dificuldade (1-5)</div>
              <input
                type="number"
                min={1}
                max={5}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="sub muted">Título</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da lição"
            />
          </div>

          <div>
            <div className="sub muted">Descrição</div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição breve da lição"
            />
          </div>

          <QuestionBuilder
            value={questions}
            onChange={setQuestions}
            title="Questões da lição"
          />

          <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
            {editingId && (
              <button
                type="button"
                className="btn secondary"
                onClick={resetForm}
              >
                Cancelar edição
              </button>
            )}
            <button type="submit" className="btn">
              {editingId ? 'Salvar alterações' : 'Criar lição'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TeacherQuizzes() {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState(1)
  const [questions, setQuestions] = useState([])

  async function loadQuizzes() {
    setLoading(true)
    try {
      const list = await api.teacher.quizzes()
      setItems(list)
    } catch (e) {
      showToast(e.message || 'Falha ao carregar testes.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuizzes()
  }, [])

  function resetForm() {
    setEditingId(null)
    setTitle('')
    setDescription('')
    setDifficulty(1)
    setQuestions([])
  }

  async function loadQuizForEdit(id) {
    try {
      const full = await api.teacher.getQuiz(id)
      setEditingId(full.id)
      setTitle(full.title || '')
      setDescription(full.description || '')
      setDifficulty(full.difficulty || 1)

      const qs = (full.Questions || []).map((q) => ({
        text: q.text,
        options: (q.Options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation || '',
        })),
      }))
      setQuestions(qs)
    } catch (e) {
      showToast(e.message || 'Falha ao carregar teste para edição.', 'error')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const payload = {
      title: title.trim(),
      description: description.trim(),
      difficulty: Number(difficulty) || 1,
      questions: (questions || []).map((q) => ({
        text: q.text,
        options: (q.options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation ?? '',
        })),
      })),
    }

    try {
      if (editingId) {
        await api.teacher.updateQuiz(editingId, payload)
        showToast('Teste atualizado com sucesso.', 'success')
      } else {
        await api.teacher.createQuiz(payload)
        showToast('Teste criada com sucesso.', 'success')
      }
      resetForm()
      loadQuizzes()
    } catch (e) {
      showToast(e.message || 'Falha ao salvar teste.', 'error')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Deseja realmente excluir este teste?')) return
    try {
      await api.teacher.deleteQuiz(id)
      showToast('Teste excluído.', 'success')
      if (editingId === id) resetForm()
      loadQuizzes()
    } catch (e) {
      showToast(e.message || 'Falha ao excluir teste.', 'error')
    }
  }

  const filtered = items.filter((q) =>
    (q.title || '').toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="grid cols-2" style={{ alignItems: 'flex-start' }}>
      <div
        className="card shadow"
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div
          className="row"
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <div className="sub" style={{ fontWeight: 600 }}>
              Meus testes
            </div>
            <div className="muted sub">Testes criados por você.</div>
          </div>
          <button type="button" className="btn secondary" onClick={resetForm}>
            Novo teste
          </button>
        </div>

        <div className="space" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título..."
        />

        <div className="space" />
        {loading ? (
          <div className="muted">Carregando...</div>
        ) : filtered.length ? (
          <div className="grid">
            {filtered.map((q) => (
              <div key={q.id} className="card">
                <div
                  className="row"
                  style={{ justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{q.title}</div>
                    <div className="muted sub">Dificuldade {q.difficulty}</div>
                  </div>
                  <div className="row" style={{ gap: 4 }}>
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => loadQuizForEdit(q.id)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn ghost danger"
                      onClick={() => handleDelete(q.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="muted sub">Nenhum teste encontrado.</div>
        )}
      </div>

      <div
        className="card shadow"
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div className="header">
          {editingId ? 'Editar teste' : 'Novo teste'}
        </div>
        <div className="muted sub">
          Defina título, descrição, dificuldade e as questões do teste.
        </div>

        <div className="space" />
        <form onSubmit={handleSubmit} className="grid">
          <div>
            <div className="sub muted">Título</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do teste"
            />
          </div>

          <div>
            <div className="sub muted">Descrição</div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição breve do teste"
            />
          </div>

          <div>
            <div className="sub muted">Dificuldade (1-5)</div>
            <input
              type="number"
              min={1}
              max={5}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </div>

          <QuestionBuilder
            value={questions}
            onChange={setQuestions}
            title="Questões do teste"
          />

          <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
            {editingId && (
              <button
                type="button"
                className="btn secondary"
                onClick={resetForm}
              >
                Cancelar edição
              </button>
            )}
            <button type="submit" className="btn">
              {editingId ? 'Salvar alterações' : 'Criar teste'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
