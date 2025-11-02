import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from '../views/Login.jsx'
import Themes from '../views/Themes.jsx'
import Lessons from '../views/Lessons.jsx'
import Lesson from '../views/Lesson.jsx'
import Progress from '../views/Progress.jsx'
import Admin from '../views/Admin.jsx'
import { AuthProvider, useAuth } from '../utils/auth.jsx'
import { useTheme } from '../utils/theme.jsx'

function ThemeToggle(){
  const { theme, setTheme } = useTheme()
  return (
    <div className="toggle">
      <div className={'tab ' + (theme==='light'?'active':'')} onClick={()=>setTheme('light')}>Light</div>
      <div className={'tab ' + (theme==='night'?'active':'')} onClick={()=>setTheme('night')}>Night</div>
    </div>
  )
}

function Topbar(){
  const nav = useNavigate()
  const { token, logout } = useAuth()
  return (
    <div className="nav container">
      <Link to="/" className="brand">Mind&Learn</Link>
      <div className="row">
        <Link to="/themes" className="pill">Themes</Link>
        <Link to="/progress" className="pill">Progress</Link>
        <Link to="/admin" className="pill">Admin</Link>
        <ThemeToggle />
        {token
          ? <button className="btn secondary" onClick={()=>{ logout(); nav('/'); }}>Logout</button>
          : <Link to="/" className="btn">Login</Link>
        }
      </div>
    </div>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <Topbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/themes/:id" element={<Lessons />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
      <div className="footer muted">Tokyo Night theme · Mind&Learn</div>
    </AuthProvider>
  )
}
