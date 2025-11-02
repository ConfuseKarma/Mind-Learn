import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Progress(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    (async()=>{
      try{ setData(await api.progress()) }
      catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    })()
  }, [])

  if(loading) return <div className="center" style={{height:'50vh'}}>Loading...</div>
  if(error) return <div className="danger">{error}</div>
  if(!data) return null

  return (
    <div className="grid">
      <div className="header">My Progress</div>
      <div className="card shadow">
        <div>Total attempts: <b>{data.totalAttempts}</b></div>
        <div>Average accuracy: <b>{(data.averageAccuracy*100).toFixed(1)}%</b></div>
      </div>
      <div className="header">Badges</div>
      <div className="grid cols-3">
        {data.badges?.length
          ? data.badges.map((b, i) => (
              <div className="card shadow" key={i}>
                <div style={{fontWeight:800}}>{b.name}</div>
                <div className="muted">{b.code}</div>
                <div className="sub">{b.description}</div>
              </div>
            ))
          : <div className="muted">No badges yet.</div>}
      </div>
    </div>
  )
}
