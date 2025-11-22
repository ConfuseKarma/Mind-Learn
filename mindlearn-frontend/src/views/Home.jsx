// views/Home.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import { useAuth } from '../utils/auth.jsx'

export default function Home() {
  const { role, user } = useAuth()
  const [themes, setThemes] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ; (async () => {
      try {
        const [t, q, p] = await Promise.all([
          api.themes(),
          api.quizzes(),
          api.progress()
        ])
        setThemes(t || [])
        setQuizzes(q || [])
        setProgress(p || null)
      } catch {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const isAluno = role === 'student'
  const isProfessor = role === 'teacher'
  const isAdmin = role === 'admin'

  return (
    <div className="grid">
      <div className="header">
        Olá, {user?.name || 'usuário'} 👋
      </div>
      <div className="muted sub">
        Bem-vindo ao painel do Mind&Learn.
      </div>

      <div className="grid cols-3">
        <div className="card shadow">
          <div className="sub muted">Temas disponíveis</div>
          <div className="header" style={{ fontSize: 22 }}>
            {themes.length}
          </div>
          <div className="space"></div>
          <Link to="/themes" className="link">
            Ver todos os temas →
          </Link>
        </div>
        <div className="card shadow">
          <div className="sub muted">Testes cadastrados</div>
          <div className="header" style={{ fontSize: 22 }}>
            {quizzes.length}
          </div>
          <div className="space"></div>
          <Link to="/quizzes" className="link">
            Ver todos os testes →
          </Link>
        </div>
        <div className="card shadow">
          <div className="sub muted">Tentativas realizadas</div>
          <div className="header" style={{ fontSize: 22 }}>
            {progress?.totalAttempts ?? 0}
          </div>
          <div className="space"></div>
          <Link to="/progress" className="link">
            Ver detalhes do progresso →
          </Link>
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card shadow">
          <div className="header" style={{ fontSize: 18 }}>
            Próximos passos
          </div>
          <div className="space"></div>
          {isAluno && (
            <>
              <div className="muted sub">
                Comece explorando os temas ou faça um teste rápido.
              </div>
              <div className="space"></div>
              <div className="row">
                <Link to="/themes" className="btn">
                  Explorar temas
                </Link>
                <Link to="/quizzes" className="btn secondary">
                  Fazer um teste
                </Link>
              </div>
            </>
          )}
          {isProfessor && (
            <>
              <div className="muted sub">
                Você pode criar novas lições e testes para seus alunos.
              </div>
              <div className="space"></div>
              <Link to="/teacher" className="btn">
                Ir para área do professor
              </Link>
            </>
          )}
          {isAdmin && (
            <>
              <div className="muted sub">
                Gerencie usuários, temas, lições e testes da plataforma.
              </div>
              <div className="space"></div>
              <Link to="/admin" className="btn">
                Ir para administração
              </Link>
            </>
          )}
        </div>

        {progress && (
          <div className="card shadow">
            <div className="header" style={{ fontSize: 18 }}>
              Visão rápida do seu progresso
            </div>
            <div className="space"></div>
            <div>Total de tentativas: <b>{progress.totalAttempts}</b></div>
            <div>
              Precisão média:{' '}
              <b>{(progress.averageAccuracy * 100).toFixed(1)}%</b>
            </div>
            <div className="space"></div>
            <div className="sub muted">Medalhas conquistadas:</div>
            <div className="space"></div>
            <div>
              {progress.badges?.length ? (
                progress.badges.map((b, i) => (
                  <span key={i} className="badge">
                    {b.name}
                  </span>
                ))
              ) : (
                <span className="muted sub">Nenhuma medalha ainda.</span>
              )}
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="muted sub">Carregando dados do painel...</div>
      )}
    </div>
  )
}
