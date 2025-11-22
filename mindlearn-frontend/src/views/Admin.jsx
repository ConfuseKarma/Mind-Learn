// views/Admin.jsx
import { useEffect, useMemo, useState } from 'react'
import { api } from '../utils/api'
import { useToast } from '../ui/ToastProvider.jsx'
import { QuestionBuilder } from './QuestionBuilder.jsx'

const PAGE_SIZE = 8

function usePagination(items, searchTerm, filterFn) {
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const term = (searchTerm || '').toLowerCase()
    const base = term && filterFn ? items.filter((it) => filterFn(it, term)) : items
    if ((page - 1) * PAGE_SIZE >= base.length && page > 1) {
      setPage(1)
    }
    return base
  }, [items, searchTerm])

  const totalPages = Math.max(1, Math.ceil((filtered.length || 0) / PAGE_SIZE))
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function next() {
    setPage((p) => Math.min(totalPages, p + 1))
  }
  function prev() {
    setPage((p) => Math.max(1, p - 1))
  }

  return { current, total: filtered.length, page, totalPages, next, prev, setPage }
}

function UsersAdmin() {
  const { showToast } = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  async function loadUsers() {
    setLoading(true)
    setError('')
    try {
      const data = await api.admin.listUsers()
      setUsers(data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const pager = usePagination(
    users,
    search,
    (u, term) =>
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      String(u.id).includes(term)
  )

  async function changeRole(id, role) {
    try {
      await api.admin.updateUserRole(id, role)
      await loadUsers()
      showToast('Papel do usuário atualizado.', 'success')
    } catch (e) {
      showToast(e.message || 'Falha ao atualizar papel.', 'error')
    }
  }

  async function removeUser(id) {
    if (!confirm('Remover este usuário?')) return
    try {
      await api.admin.deleteUser(id)
      await loadUsers()
      showToast('Usuário removido.', 'success')
    } catch (e) {
      showToast(e.message || 'Falha ao remover usuário.', 'error')
    }
  }

  return (
    <div className="admin-grid admin-page-body">
      <div className="admin-panel-card">
        <div className="admin-section-title">Usuários</div>
        <div className="space"></div>
        <div className="admin-section-subtitle">
          Gerencie os usuários cadastrados, alterando o papel (Aluno, Professor, Admin)
          ou removendo acessos quando necessário.
        </div>
      </div>

      <div className="admin-panel-card">
        <div className="admin-list-header">
          <div className="admin-section-title">Lista de usuários</div>
          <input
            className="admin-search"
            placeholder="Buscar por nome, e-mail ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <div className="muted sub">Carregando usuários...</div>}
        {error && <div className="danger">{error}</div>}
        {!loading && !pager.total && (
          <div className="muted sub">Nenhum usuário encontrado.</div>
        )}

        <div className="admin-list-scroll grid">
          {pager.current.map((u) => (
            <div key={u.id} className="card">
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{u.name}</div>
                  <div className="muted sub">{u.email}</div>
                  <div className="muted sub">ID: {u.id}</div>
                </div>
                <div className="grid">
                  <select
                    value={u.role || 'student'}
                    onChange={(e) => changeRole(u.id, e.target.value)}
                  >
                    <option value="student">Aluno</option>
                    <option value="teacher">Professor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    className="btn secondary"
                    type="button"
                    onClick={() => removeUser(u.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!!pager.total && (
          <div className="pagination">
            <span>
              {pager.total} resultado(s) · página {pager.page}/{pager.totalPages}
            </span>
            <button type="button" onClick={pager.prev} disabled={pager.page === 1}>
              Anterior
            </button>
            <button
              type="button"
              onClick={pager.next}
              disabled={pager.page === pager.totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ThemesAdmin() {
  const { showToast } = useToast()
  const [themes, setThemes] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  async function loadThemes() {
    setLoading(true)
    setError('')
    try {
      const data = await api.admin.listThemes()
      setThemes(data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadThemes()
  }, [])

  const pager = usePagination(
    themes,
    search,
    (t, term) =>
      t.name?.toLowerCase().includes(term) ||
      t.description?.toLowerCase().includes(term) ||
      String(t.id).includes(term)
  )

  function resetForm() {
    setName('')
    setDescription('')
    setEditingId(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    try {
      if (editingId) {
        await api.admin.updateTheme(editingId, {
          name: name.trim(),
          description: description.trim()
        })
        showToast('Tema atualizado com sucesso.', 'success')
      } else {
        await api.admin.createTheme(name.trim(), description.trim())
        showToast('Tema criado com sucesso.', 'success')
      }
      resetForm()
      await loadThemes()
    } catch (e) {
      showToast(e.message || 'Falha ao salvar tema.', 'error')
    }
  }

  function startEdit(theme) {
    setEditingId(theme.id)
    setName(theme.name || '')
    setDescription(theme.description || '')
  }

  async function deleteTheme(id) {
    if (!confirm('Remover este tema e suas lições?')) return
    try {
      await api.admin.deleteTheme(id)
      await loadThemes()
      showToast('Tema removido.', 'success')
    } catch (e) {
      showToast(e.message || 'Falha ao remover tema.', 'error')
    }
  }

  return (
    <div className="admin-grid admin-page-body">
      <div className="admin-panel-card">
        <div className="admin-section-title">
          {editingId ? 'Editar tema' : 'Novo tema'}
        </div>
        <div className="space"></div>
        <div className="admin-section-subtitle">
          Temas agrupam lições e testes por assunto. Exemplo: Leitura básica,
          Interpretação crítica.
        </div>
        <div className="space"></div>
        <form onSubmit={handleSubmit} className="grid">
          <div>
            <div className="muted sub">Nome</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Leitura básica"
            />
          </div>
          <div>
            <div className="muted sub">Descrição</div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do tema"
            />
          </div>
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
            <button className="btn" type="submit">
              {editingId ? 'Atualizar tema' : 'Salvar tema'}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-panel-card">
        <div className="admin-list-header">
          <div className="admin-section-title">Temas existentes</div>
          <input
            className="admin-search"
            placeholder="Buscar por nome, descrição ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <div className="muted sub">Carregando temas...</div>}
        {error && <div className="danger">{error}</div>}
        {!loading && !pager.total && (
          <div className="muted sub">Nenhum tema cadastrado ainda.</div>
        )}

        <div className="admin-list-scroll grid">
          {pager.current.map((t) => (
            <div key={t.id} className="card">
              <div style={{ fontWeight: 700 }}>{t.name}</div>
              <div className="muted sub">{t.description}</div>
              <div className="muted sub">ID: {t.id}</div>
              <div className="space"></div>
              <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => startEdit(t)}
                >
                  Editar
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => deleteTheme(t.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {!!pager.total && (
          <div className="pagination">
            <span>
              {pager.total} tema(s) · página {pager.page}/{pager.totalPages}
            </span>
            <button type="button" onClick={pager.prev} disabled={pager.page === 1}>
              Anterior
            </button>
            <button
              type="button"
              onClick={pager.next}
              disabled={pager.page === pager.totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function LessonsAdmin() {
  const { showToast } = useToast()
  const [lessons, setLessons] = useState([])
  const [themes, setThemes] = useState([])

  const [themeId, setThemeId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState(1)
  const [questions, setQuestions] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  async function loadData() {
    setLoading(true)
    setError('')
    try {
      const [lessonsData, themesData] = await Promise.all([
        api.admin.listLessons(),
        api.admin.listThemes()
      ])
      setLessons(lessonsData || [])
      setThemes(themesData || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const pager = usePagination(
    lessons,
    search,
    (l, term) =>
      l.title?.toLowerCase().includes(term) ||
      l.description?.toLowerCase().includes(term) ||
      String(l.id).includes(term) ||
      String(l.ThemeId ?? l.themeId ?? '').includes(term)
  )

  function resetForm() {
    setThemeId('')
    setTitle('')
    setDescription('')
    setDifficulty(1)
    setQuestions([])
    setEditingId(null)
  }

  async function loadLessonForEdit(lessonId) {
    try {
      const full = await api.admin.getLesson(lessonId)

      setThemeId(String(full.ThemeId ?? full.themeId ?? ''))
      setTitle(full.title || '')
      setDescription(full.description || '')
      setDifficulty(full.difficulty || 1)

      const qs = (full.Questions || []).map((q) => ({
        text: q.text,
        options: (q.Options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation || ''
        }))
      }))
      setQuestions(qs)
    } catch (e) {
      showToast(e.message || 'Falha ao carregar lição para edição.', 'error')
    }
  }

  function startEdit(lesson) {
    setEditingId(lesson.id)
    loadLessonForEdit(lesson.id)
  }

  async function saveLesson(e) {
    e.preventDefault()
    if (!themeId || !title.trim()) return

    const payload = {
      themeId: Number(themeId),
      title: title.trim(),
      description: description.trim(),
      difficulty: Number(difficulty) || 1,
      questions: (questions || []).map((q) => ({
        text: q.text,
        options: (q.options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation ?? ''
        }))
      }))
    }

    try {
      if (editingId) {
        await api.admin.updateLesson(editingId, payload)
        showToast('Lição atualizada com sucesso.', 'success')
      } else {
        await api.admin.createLesson(payload)
        showToast('Lição criada com sucesso.', 'success')
      }
      resetForm()
      await loadData()
    } catch (e) {
      showToast(e.message || 'Falha ao salvar lição.', 'error')
    }
  }

  async function deleteLesson(id) {
    if (!confirm('Remover esta lição?')) return
    try {
      await api.admin.deleteLesson(id)
      await loadData()
      showToast('Lição removida.', 'success')
    } catch (e) {
      showToast(e.message || 'Falha ao remover lição.', 'error')
    }
  }

  return (
    <div className="admin-grid admin-page-body">
      <div className="admin-panel-card">
        <div className="admin-section-title">
          {editingId ? 'Editar lição' : 'Nova lição'}
        </div>
        <div className="space"></div>
        <div className="admin-section-subtitle">
          Crie ou edite lições vinculadas a um tema, com dificuldade e questões
          de múltipla escolha.
        </div>
        <div className="space"></div>
        <form onSubmit={saveLesson} className="grid">
          <div className="grid cols-2">
            <div>
              <div className="muted sub">Tema</div>
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
              <div className="muted sub">Dificuldade (1 - 3)</div>
              <input
                type="number"
                min="1"
                max="3"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="muted sub">Título</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da lição"
            />
          </div>
          <div>
            <div className="muted sub">Descrição</div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição curta"
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
            <button className="btn">
              {editingId ? 'Atualizar lição' : 'Salvar lição'}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-panel-card">
        <div className="admin-list-header">
          <div className="admin-section-title">Lições existentes</div>
          <input
            className="admin-search"
            placeholder="Buscar por título, descrição, tema ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <div className="muted sub">Carregando lições...</div>}
        {error && <div className="danger">{error}</div>}
        {!loading && !pager.total && (
          <div className="muted sub">Nenhuma lição cadastrada ainda.</div>
        )}

        <div className="admin-list-scroll grid">
          {pager.current.map((l) => (
            <div key={l.id} className="card">
              <div className="sub muted">
                ID: {l.id} · Tema: {l.ThemeId ?? l.themeId ?? '-'}
              </div>
              <div style={{ fontWeight: 700 }}>{l.title}</div>
              <div className="muted sub">{l.description}</div>
              <div className="space"></div>
              <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => startEdit(l)}
                >
                  Editar
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => deleteLesson(l.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {!!pager.total && (
          <div className="pagination">
            <span>
              {pager.total} lição(ões) · página {pager.page}/{pager.totalPages}
            </span>
            <button type="button" onClick={pager.prev} disabled={pager.page === 1}>
              Anterior
            </button>
            <button
              type="button"
              onClick={pager.next}
              disabled={pager.page === pager.totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function QuizzesAdmin() {
  const { showToast } = useToast()
  const [quizzes, setQuizzes] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState(1)
  const [questions, setQuestions] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  async function loadQuizzes() {
    setLoading(true)
    setError('')
    try {
      const data = await api.admin.listQuizzes()
      setQuizzes(data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuizzes()
  }, [])

  const pager = usePagination(
    quizzes,
    search,
    (q, term) =>
      q.title?.toLowerCase().includes(term) ||
      q.description?.toLowerCase().includes(term) ||
      String(q.id).includes(term)
  )

  function resetForm() {
    setTitle('')
    setDescription('')
    setDifficulty(1)
    setQuestions([])
    setEditingId(null)
  }

  async function loadQuizForEdit(quizId) {
    try {
      const full = await api.admin.getQuiz(quizId)

      setTitle(full.title || '')
      setDescription(full.description || '')
      setDifficulty(full.difficulty || 1)

      const qs = (full.Questions || []).map((q) => ({
        text: q.text,
        options: (q.Options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation || ''
        }))
      }))
      setQuestions(qs)
    } catch (e) {
      showToast(e.message || 'Falha ao carregar teste para edição.', 'error')
    }
  }

  function startEdit(q) {
    setEditingId(q.id)
    loadQuizForEdit(q.id)
  }

  async function saveQuiz(e) {
    e.preventDefault()
    if (!title.trim()) return

    const payload = {
      title: title.trim(),
      description: description.trim(),
      difficulty: Number(difficulty) || 1,
      questions: (questions || []).map((q) => ({
        text: q.text,
        options: (q.options || []).map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          explanation: o.explanation ?? ''
        }))
      }))
    }

    try {
      if (editingId) {
        await api.admin.updateQuiz(editingId, payload)
        showToast('Teste atualizado com sucesso.', 'success')
      } else {
        await api.admin.createQuiz(payload)
        showToast('Teste criado com sucesso.', 'success')
      }
      resetForm()
      await loadQuizzes()
    } catch (e) {
      showToast(e.message || 'Falha ao salvar teste.', 'error')
    }
  }

  async function deleteQuiz(id) {
    if (!confirm('Remover este teste?')) return
    try {
      await api.admin.deleteQuiz(id)
      await loadQuizzes()
      showToast('Teste removido.', 'success')
    } catch (e) {
      showToast(e.message || 'Falha ao remover teste.', 'error')
    }
  }

  return (
    <div className="admin-grid admin-page-body">
      <div className="admin-panel-card">
        <div className="admin-section-title">
          {editingId ? 'Editar teste' : 'Novo teste'}
        </div>
        <div className="space"></div>
        <div className="admin-section-subtitle">
          Crie ou edite testes gerais com questões de múltipla escolha para
          avaliar o progresso do aluno.
        </div>
        <div className="space"></div>
        <form onSubmit={saveQuiz} className="grid">
          <div>
            <div className="muted sub">Título</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do teste"
            />
          </div>
          <div>
            <div className="muted sub">Descrição</div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição curta"
            />
          </div>
          <div>
            <div className="muted sub">Dificuldade (1 - 3)</div>
            <input
              type="number"
              min="1"
              max="3"
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
            <button className="btn">
              {editingId ? 'Atualizar teste' : 'Salvar teste'}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-panel-card">
        <div className="admin-list-header">
          <div className="admin-section-title">Testes existentes</div>
          <input
            className="admin-search"
            placeholder="Buscar por título, descrição ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <div className="muted sub">Carregando testes...</div>}
        {error && <div className="danger">{error}</div>}
        {!loading && !pager.total && (
          <div className="muted sub">Nenhum teste cadastrado ainda.</div>
        )}

        <div className="admin-list-scroll grid">
          {pager.current.map((q) => (
            <div key={q.id} className="card">
              <div className="sub muted">ID: {q.id}</div>
              <div style={{ fontWeight: 700 }}>{q.title}</div>
              <div className="muted sub">{q.description}</div>
              <div className="space"></div>
              <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => startEdit(q)}
                >
                  Editar
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => deleteQuiz(q.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {!!pager.total && (
          <div className="pagination">
            <span>
              {pager.total} teste(s) · página {pager.page}/{pager.totalPages}
            </span>
            <button type="button" onClick={pager.prev} disabled={pager.page === 1}>
              Anterior
            </button>
            <button
              type="button"
              onClick={pager.next}
              disabled={pager.page === pager.totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('users')

  return (
    <div className="grid">
      <div className="header">Painel administrativo</div>
      <div className="muted sub">
        Gerencie usuários, temas, lições e testes da plataforma em um painel
        unificado.
      </div>
      <div className="space"></div>
      <div className="toggle">
        <div
          className={'tab ' + (tab === 'users' ? 'active' : '')}
          onClick={() => setTab('users')}
        >
          Usuários
        </div>
        <div
          className={'tab ' + (tab === 'themes' ? 'active' : '')}
          onClick={() => setTab('themes')}
        >
          Temas
        </div>
        <div
          className={'tab ' + (tab === 'lessons' ? 'active' : '')}
          onClick={() => setTab('lessons')}
        >
          Lições
        </div>
        <div
          className={'tab ' + (tab === 'quizzes' ? 'active' : '')}
          onClick={() => setTab('quizzes')}
        >
          Testes
        </div>
      </div>

      <div className="space"></div>

      {tab === 'users' && <UsersAdmin />}
      {tab === 'themes' && <ThemesAdmin />}
      {tab === 'lessons' && <LessonsAdmin />}
      {tab === 'quizzes' && <QuizzesAdmin />}
    </div>
  )
}
