const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || 'dev_secret_change_me'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { 'Authorization': 'Bearer ' + token } : {}
}

async function http(path, { method='GET', body, admin=false } = {}){
  const headers = { ...(body ? {'Content-Type':'application/json'}:{}), ...authHeaders() }
  if (admin) headers['x-admin-secret'] = ADMIN_SECRET
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const api = {
  login: (email, password) => http('/auth/login', { method:'POST', body:{ email, password } }),
  signup: (name, email, password) => http('/auth/signup', { method:'POST', body:{ name, email, password } }),
  themes: () => http('/themes'),
  lessonsByTheme: (id) => http(`/themes/${id}/lessons`),
  lesson: (id) => http(`/lessons/${id}`),
  attempt: (id, answers) => http(`/lessons/${id}/attempt`, { method:'POST', body:{ answers } }),
  progress: () => http('/progress/me'),
  adminCreateTheme: (name, description) => http('/admin/theme', { method:'POST', body:{ name, description }, admin:true }),
  adminCreateLesson: (payload) => http('/admin/lesson', { method:'POST', body:payload, admin:true })
}
