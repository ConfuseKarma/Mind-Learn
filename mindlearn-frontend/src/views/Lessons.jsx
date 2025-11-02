import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../utils/api'

export default function Lessons(){
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    (async()=>{
      try{ setData(await api.lessonsByTheme(id)) }
      catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    })()
  }, [id])

  if(loading) return <div className="center" style={{height:'50vh'}}>Loading...</div>
  if(error) return <div className="danger">{error}</div>

  return (
    <div className="grid cols-2">
      {data.map(l => (
        <Link key={l.id} to={`/lesson/${l.id}`} className="card shadow">
          <div className="header">{l.title}</div>
          <div className="muted">{l.description}</div>
          <div className="space"></div>
          <div className="muted">Difficulty: {l.difficulty}</div>
        </Link>
      ))}
      {!data.length && <div className="muted">No lessons yet.</div>}
    </div>
  )
}
