// utils/auth.jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { api } from './api.js'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loadingUser, setLoadingUser] = useState(false)

  useEffect(() => {
    if (!token) {
      setUser(null)
      setRole(null)
      return
    }
    setLoadingUser(true)
    api
      .me()
      .then((me) => {
        setUser(me)
        setRole(me.role)
      })
      .catch(() => {
        setUser(null)
        setRole(null)
      })
      .finally(() => setLoadingUser(false))
  }, [token])

  function setToken(t) {
    setTokenState(t)
    if (t) localStorage.setItem('token', t)
    else localStorage.removeItem('token')
  }

  function logout() {
    setTokenState(null)
    localStorage.removeItem('token')
    setUser(null)
    setRole(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      isAuthenticated: !!token,
      loadingUser,
      setToken,
      setUser,
      setRole,
      logout
    }),
    [token, user, role, loadingUser]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  return useContext(Ctx)
}
