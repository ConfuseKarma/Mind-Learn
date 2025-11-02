import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { useAuth } from '../utils/auth.jsx'

export default function Login(){
  const nav = useNavigate()
  const { setToken } = useAuth()
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('secret')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e){
    e.preventDefault()
    setLoading(true); setError('')
    try{
      const r = await api.login(email, password)
      setToken(r.token)
      nav('/themes')
    }catch(err){ setError(err.message || 'Login failed') }
    finally{ setLoading(false) }
  }

  return (
    <div style={{maxWidth:440, margin:'48px auto'}}>
      <div className="card shadow">
        <div className="header">Welcome back</div>
        <div className="muted sub">Sign in to continue learning</div>
        <div className="space-lg"></div>
        <form onSubmit={submit} className="grid">
          <div>
            <div className="muted sub">Email</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <div className="muted sub">Password</div>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="•••••••" />
          </div>
          {error && <div className="danger sub">{error}</div>}
          <button className="btn" disabled={loading}>{loading?'Loading...':'Sign in'}</button>
        </form>
      </div>
    </div>
  )
}
