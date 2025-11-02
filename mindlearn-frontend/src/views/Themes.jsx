import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'

export default function Themes(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    (async()=>{
      try{ setData(await api.themes()) }
      catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    })()
  }, [])

  if(loading) return <div className="center" style={{height:'50vh'}}>Loading...</div>
  if(error) return <div className="danger">{error}</div>

  return (
    <div className="grid cols-2">
      {data.map(t => (
        <Link key={t.id} to={`/themes/${t.id}`} className="card shadow">
          <div className="header">{t.name}</div>
          <div className="muted">{t.description}</div>
          <div className="space"></div>
          <div className="streak">
            <div className="dot active"></div><div className="dot"></div><div className="dot"></div>
          </div>
        </Link>
      ))}
      {!data.length && <div className="muted">No themes yet.</div>}
    </div>
  )
}
