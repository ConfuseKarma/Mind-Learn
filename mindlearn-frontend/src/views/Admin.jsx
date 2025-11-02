import React, { useState } from 'react'
import { api } from '../utils/api'

export default function Admin(){
  const [tName, setTName] = useState('Reading Basics')
  const [tDesc, setTDesc] = useState('Foundational comprehension skills')
  const [themeId, setThemeId] = useState('1')
  const [title, setTitle] = useState('Identify subject')
  const [desc, setDesc] = useState('Understand basic sentence parts')
  const [qText, setQText] = useState('In "O sol nasce a leste", what is the subject?')
  const [o1, setO1] = useState('O sol')
  const [o2, setO2] = useState('nasce')
  const [o3, setO3] = useState('a leste')

  async function createTheme() {
    try { const r = await api.adminCreateTheme(tName, tDesc); alert('Theme created: ' + JSON.stringify(r)) }
    catch(e){ alert(e.message) }
  }
  async function createLesson() {
    try {
      const r = await api.adminCreateLesson({
        themeId: Number(themeId),
        title, description: desc, difficulty: 1,
        questions: [{ text: qText, options:[{text:o1, isCorrect:true},{text:o2},{text:o3}] }]
      })
      alert('Lesson created: ' + JSON.stringify(r))
    } catch(e){ alert(e.message) }
  }

  return (
    <div className="grid cols-2">
      <div className="card shadow">
        <div className="header">Create Theme</div>
        <div className="space"></div>
        <div className="grid">
          <input value={tName} onChange={e=>setTName(e.target.value)} placeholder="Theme name" />
          <input value={tDesc} onChange={e=>setTDesc(e.target.value)} placeholder="Theme description" />
          <button className="btn" onClick={createTheme}>Create Theme</button>
        </div>
      </div>
      <div className="card shadow">
        <div className="header">Create Lesson</div>
        <div className="space"></div>
        <div className="grid">
          <input value={themeId} onChange={e=>setThemeId(e.target.value)} placeholder="Theme ID" />
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Lesson title" />
          <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Lesson description" />
          <input value={qText} onChange={e=>setQText(e.target.value)} placeholder="Question text" />
          <input value={o1} onChange={e=>setO1(e.target.value)} placeholder="Option 1 (correct)" />
          <input value={o2} onChange={e=>setO2(e.target.value)} placeholder="Option 2" />
          <input value={o3} onChange={e=>setO3(e.target.value)} placeholder="Option 3" />
          <button className="btn" onClick={createLesson}>Create Lesson</button>
        </div>
      </div>
    </div>
  )
}
