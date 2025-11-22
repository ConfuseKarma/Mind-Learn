// main.jsx
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './ui/App.jsx'
import { ThemeProvider } from './utils/theme.jsx'
import { ToastProvider } from './ui/ToastProvider.jsx'
import { AuthProvider } from './utils/auth.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)
