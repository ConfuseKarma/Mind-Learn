import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../utils/api'

export default function Lesson(){
  const { id } = useParams()
  const nav = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    (async()=>{
      try{ setLesson(await api.lesson(id)) }
      catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    })()
  }, [id])

  function select(qId, oId){ setAnswers(a => ({ ...a, [qId]: oId })) }

  async function submit(){
    try{
      const payload = Object.entries(answers).map(([q,o]) => ({ questionId: Number(q), optionId: Number(o) }))
      const r = await api.attempt(id, payload)
      alert(`Score ${r.score}/${r.total}` + (r.earnedBadge ? `\nBadge: ${r.earnedBadge}` : ''))
      nav('/themes')
    }catch(e){ alert(e.message) }
  }

  if(loading) return <div className="center" style={{height:'50vh'}}>Loading...</div>
  if(error) return <div className="danger">{error}</div>
  if(!lesson) return null

  return (
    <div className="grid">
      <div className="header">{lesson.title}</div>
      {lesson.Questions?.map(q => (
        <div key={q.id} className="card shadow">
          <div style={{fontWeight:800, marginBottom:8}}>{q.text}</div>
          <div className="grid cols-3">
            {q.Options?.map(o => {
              const selected = answers[q.id] === o.id
              return (
                <button key={o.id}
                  onClick={()=>select(q.id, o.id)}
                  className="pill"
                  style={{borderColor:selected?'var(--primary)':'var(--chip-br)', background:selected?'#0c1a33':'var(--chip-bg)', color:'var(--fg)'}}>
                  {o.text}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      <div><button className="btn" onClick={submit}>Submit</button></div>
    </div>
  )
}
