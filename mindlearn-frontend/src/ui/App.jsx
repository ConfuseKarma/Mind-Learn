// ui/App.jsx
import {
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useNavigate
} from 'react-router-dom'

import Login from '../views/Login.jsx'
import Signup from '../views/Signup.jsx'
import PublicHome from '../views/PublicHome.jsx'
import Home from '../views/Home.jsx'
import Themes from '../views/Themes.jsx'
import Lessons from '../views/Lessons.jsx'
import Lesson from '../views/Lesson.jsx'
import Progress from '../views/Progress.jsx'
import Admin from '../views/Admin.jsx'
import Teacher from '../views/Teacher.jsx'
import Quizzes from '../views/Quizzes.jsx'
import Quiz from '../views/Quiz.jsx'
import Me from '../views/Me.jsx'
import ActivityHistory from '../views/ActivityHistory.jsx'

import { useAuth } from '../utils/auth.jsx'
import { useTheme } from '../utils/theme.jsx'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isLight = theme === 'light'
  const icon = isLight ? '☀️' : '🌙'
  const label = isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isLight ? 'night' : 'light')}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )
}

function RoleBadge() {
  const { user, role } = useAuth()
  if (!user || !role) return null

  return (
    <span className="pill role-pill">
      <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>
        {role === 'student'
          ? 'Aluno'
          : role === 'teacher'
            ? 'Professor'
            : role === 'admin'
              ? 'Admin'
              : role}
      </span>
      <span className="muted" style={{ marginLeft: 6 }}>
        {user.name}
      </span>
    </span>
  )
}

function PublicTopbar() {
  const nav = useNavigate()
  return (
    <header className="nav-public">
      <div className="nav-public-inner">
        <Link to="/" className="brand">
          Mind&Learn <span>plataforma de aprendizagem</span>
        </Link>
        <div className="nav-public-right">
          <ThemeToggle />
          <button className="btn secondary" onClick={() => nav('/login')}>
            Entrar
          </button>
          <button className="btn" onClick={() => nav('/signup')}>
            Criar conta
          </button>
        </div>
      </div>
    </header>
  )
}

function AuthTopbar() {
  const nav = useNavigate()
  const { logout } = useAuth()

  return (
    <div className="app-topbar">
      <div className="app-topbar-inner">
        <RoleBadge />
        <div className="row" style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
          <button
            className="btn secondary"
            onClick={() => {
              logout()
              nav('/login')
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}

function SidebarNav() {
  const { role } = useAuth()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>Mind&Learn</span>
        <span>plataforma de aprendizagem</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            'sidebar-link' + (isActive ? ' active' : '')
          }
        >
          <span className="sidebar-link-icon">🏠</span>
          <span>Início</span>
        </NavLink>

        <NavLink
          to="/themes"
          className={({ isActive }) =>
            'sidebar-link' + (isActive ? ' active' : '')
          }
        >
          <span className="sidebar-link-icon">📚</span>
          <span>Temas</span>
        </NavLink>

        <NavLink
          to="/quizzes"
          className={({ isActive }) =>
            'sidebar-link' + (isActive ? ' active' : '')
          }
        >
          <span className="sidebar-link-icon">🧩</span>
          <span>Testes</span>
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            'sidebar-link' + (isActive ? ' active' : '')
          }
        >
          <span className="sidebar-link-icon">📈</span>
          <span>Progresso</span>
        </NavLink>

        {role === 'student' && (
          <NavLink
            to="/history"
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
          >
            <span className="sidebar-link-icon">🕒</span>
            <span>Histórico</span>
          </NavLink>
        )}

        <NavLink
          to="/me"
          className={({ isActive }) =>
            'sidebar-link' + (isActive ? ' active' : '')
          }
        >
          <span className="sidebar-link-icon">👤</span>
          <span>Perfil</span>
        </NavLink>

        {role === 'teacher' && (
          <NavLink
            to="/teacher"
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
          >
            <span className="sidebar-link-icon">📘</span>
            <span>Professor</span>
          </NavLink>
        )}

        {role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
          >
            <span className="sidebar-link-icon">🛠️</span>
            <span>Administração</span>
          </NavLink>
        )}
      </nav>
    </aside>
  )
}

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, loadingUser, role } = useAuth()

  if (loadingUser || (roles && !role)) {
    return (
      <div className="center" style={{ height: '50vh' }}>
        Carregando sessão...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/forbidden" replace />
  }

  return children
}

function ForbiddenPage() {
  return (
    <div className="card shadow">
      <div className="header">Acesso não permitido</div>
      <div className="muted">
        Você não tem permissão para acessar esta área.
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/themes"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Themes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/themes/:id"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Lessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lesson/:id"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Lesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute roles={['student']}>
              <ActivityHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quizzes"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Quizzes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes/:id"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me"
          element={
            <ProtectedRoute roles={['student', 'teacher', 'admin']}>
              <Me />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute roles={['teacher']}>
              <Teacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<div>Não encontrado</div>} />
      </Routes>
    </main>
  )
}

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="app-shell">
      {isAuthenticated ? (
        <div className="app-auth-layout">
          <SidebarNav />
          <div className="app-main">
            <AuthTopbar />
            <AppRoutes />
            <footer className="footer muted">Mind&Learn</footer>
          </div>
        </div>
      ) : (
        <>
          <PublicTopbar />
          <AppRoutes />
          <footer className="footer muted">Mind&Learn</footer>
        </>
      )}
    </div>
  )
}
