// ui/ToastProvider.jsx
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext({ showToast: () => { } })

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'info') => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), 4000)
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              'toast ' +
              (t.type === 'success'
                ? 'toast-success'
                : t.type === 'error'
                  ? 'toast-error'
                  : 'toast-info')
            }
          >
            <div className="toast-icon" aria-hidden="true">
              {t.type === 'success'
                ? '✅'
                : t.type === 'error'
                  ? '⚠️'
                  : 'ℹ️'}
            </div>
            <div className="toast-message">{t.message}</div>
            <button
              type="button"
              className="toast-close"
              onClick={() => removeToast(t.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
