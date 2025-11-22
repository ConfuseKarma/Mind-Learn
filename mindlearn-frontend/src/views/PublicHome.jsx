// views/PublicHome.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/auth.jsx'

export default function PublicHome() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <div className="card shadow">
        <div className="header">Você já está conectado</div>
        <div className="muted sub">
          Use o menu lateral para navegar pelos temas, testes e seu progresso.
        </div>
      </div>
    )
  }

  return (
    <div className="landing">
      <div>
        <div className="landing-title">Mind&Learn</div>
        <div className="landing-subtitle">
          Plataforma focada em compreensão de texto e pensamento crítico, com
          lições estruturadas, testes objetivos e acompanhamento de progresso.
        </div>
        <div className="landing-actions">
          <Link to="/signup" className="btn">
            Começar agora
          </Link>
          <Link to="/login" className="btn secondary">
            Já tenho uma conta
          </Link>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="sub" style={{ fontWeight: 600 }}>
              📚 Lições organizadas
            </div>
            <div className="muted">
              Agrupe conteúdos por tema e trabalhe habilidades específicas com
              questões objetivas.
            </div>
          </div>
          <div className="feature-card">
            <div className="sub" style={{ fontWeight: 600 }}>
              🧩 Testes rápidos
            </div>
            <div className="muted">
              Crie testes para revisão e consolidação do aprendizado dos alunos.
            </div>
          </div>
          <div className="feature-card">
            <div className="sub" style={{ fontWeight: 600 }}>
              📈 Progresso visível
            </div>
            <div className="muted">
              Acompanhe tentativas, acertos e medalhas, tanto por aluno quanto
              por turma.
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="card shadow">
          <div className="header">Pensado para escolas e educadores</div>
          <div className="space"></div>
          <div className="muted">
            O Mind&Learn foi desenhado com perfis diferentes:
          </div>
          <div className="space"></div>
          <ul className="muted" style={{ paddingLeft: 18, margin: 0 }}>
            <li>Alunos resolvem lições e testes de forma simples e direta.</li>
            <li>Professores criam conteúdos e acompanham o desempenho.</li>
            <li>Admins gerenciam usuários, papéis e catálogo de conteúdos.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
