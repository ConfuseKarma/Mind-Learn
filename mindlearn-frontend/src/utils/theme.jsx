import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext({ theme:'night', setTheme: ()=>{} })

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState(()=>{
    const saved = localStorage.getItem('ml_theme')
    if (saved) return saved
    return document.documentElement.dataset.theme || 'night'
  })

  useEffect(()=>{
    document.documentElement.dataset.theme = theme
    localStorage.setItem('ml_theme', theme)
  }, [theme])

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>
}

export function useTheme(){ return useContext(ThemeCtx) }
