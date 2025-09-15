import { ref, reactive } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const addToast = (message, type = 'info', duration = 4000) => {
    const id = ++toastId
    const toast = {
      id,
      message,
      type,
      timestamp: Date.now()
    }
    
    toasts.value.push(toast)
    
    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }
  
  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const clearAllToasts = () => {
    toasts.value = []
  }
  
  // Métodos de conveniencia
  const success = (message, duration = 4000) => addToast(message, 'success', duration)
  const error = (message, duration = 5000) => addToast(message, 'error', duration)
  const warning = (message, duration = 4500) => addToast(message, 'warning', duration)
  const info = (message, duration = 4000) => addToast(message, 'info', duration)
  
  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  }
}

// Plugin para Vue
export const toastPlugin = {
  install(app) {
    const toast = useToast()
    
    // Provide para componentes
    app.provide('toast', toast)
    
    // Global properties
    app.config.globalProperties.$toast = toast
  }
}