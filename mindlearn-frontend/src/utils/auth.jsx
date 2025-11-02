import React, { createContext, useContext, useMemo, useState } from 'react'
const Ctx = createContext(null)

export function AuthProvider({ children }){
  const [token, setToken] = useState(()=> localStorage.getItem('token'))
  const value = useMemo(()=> ({
    token,
    setToken: (t)=> { setToken(t); if(t) localStorage.setItem('token', t); else localStorage.removeItem('token') },
    logout: ()=> { setToken(null); localStorage.removeItem('token') }
  }), [token])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth(){ return useContext(Ctx) }
