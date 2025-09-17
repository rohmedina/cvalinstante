import { ref, reactive } from 'vue'

export function useValidation() {
  // Estado reactivo para errores de validación
  const errors = reactive({})
  const isValidating = ref(false)

  // Reglas de validación por tipo de campo
  const validationRules = {
    text: {
      required: (value) => ({
        isValid: value && typeof value === 'string' && value.trim().length > 0,
        message: 'Este campo es requerido'
      }),
      minLength: (value, min = 2) => ({
        isValid: !value || (typeof value === 'string' && value.length >= min),
        message: `Debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 100) => ({
        isValid: !value || (typeof value === 'string' && value.length <= max),
        message: `No debe exceder ${max} caracteres`
      })
    },

    email: {
      required: (value) => ({
        isValid: value && typeof value === 'string' && value.trim().length > 0,
        message: 'El email es requerido'
      }),
      format: (value) => ({
        isValid: !value || (typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)),
        message: 'Formato de email inválido'
      })
    },

    tel: {
      required: (value) => ({
        isValid: value && typeof value === 'string' && value.trim().length > 0,
        message: 'El teléfono es requerido'
      }),
      format: (value) => ({
        isValid: !value || (typeof value === 'string' && /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))),
        message: 'Formato de teléfono inválido'
      })
    },

    textarea: {
      required: (value) => ({
        isValid: value && typeof value === 'string' && value.trim().length > 0,
        message: 'Este campo es requerido'
      }),
      minLength: (value, min = 10) => ({
        isValid: !value || (typeof value === 'string' && value.length >= min),
        message: `Debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 500) => ({
        isValid: !value || value.length <= max,
        message: `No debe exceder ${max} caracteres`
      })
    },

    date: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'La fecha es requerida'
      }),
      format: (value) => {
        if (!value) return { isValid: true, message: '' }
        
        const trimmedValue = value.trim()
        
        // Permitir "Presente" como valor válido
        if (trimmedValue.toLowerCase() === 'presente') {
          return { isValid: true, message: '' }
        }
        
        // Validar formato "Mes Año" (ej: "Enero 2020")
        const isValidFormat = /^[A-Za-z]+ \d{4}$/.test(trimmedValue)
        
        return {
          isValid: isValidFormat,
          message: 'Formato: Mes Año (ej: Enero 2020) o "Presente"'
        }
      }
    },

    // Reglas específicas para campos de CV
    name: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'El nombre es requerido'
      }),
      minLength: (value, min = 2) => ({
        isValid: !value || value.length >= min,
        message: `El nombre debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 50) => ({
        isValid: !value || value.length <= max,
        message: `El nombre no debe exceder ${max} caracteres`
      }),
      format: (value) => ({
        isValid: !value || /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(value),
        message: 'El nombre solo puede contener letras y espacios'
      })
    },

    position: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'El cargo es requerido'
      }),
      minLength: (value, min = 2) => ({
        isValid: !value || value.length >= min,
        message: `El cargo debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 80) => ({
        isValid: !value || value.length <= max,
        message: `El cargo no debe exceder ${max} caracteres`
      })
    },

    company: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'La empresa es requerida'
      }),
      minLength: (value, min = 2) => ({
        isValid: !value || value.length >= min,
        message: `El nombre de la empresa debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 80) => ({
        isValid: !value || value.length <= max,
        message: `El nombre de la empresa no debe exceder ${max} caracteres`
      })
    },

    url: {
      format: (value) => ({
        isValid: !value || /^https?:\/\/.+\..+/.test(value),
        message: 'Debe ser una URL válida (ej: https://ejemplo.com)'
      }),
      maxLength: (value, max = 200) => ({
        isValid: !value || value.length <= max,
        message: `La URL no debe exceder ${max} caracteres`
      })
    },

    degree: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'El título/grado es requerido'
      }),
      minLength: (value, min = 3) => ({
        isValid: !value || value.length >= min,
        message: `El título debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 100) => ({
        isValid: !value || value.length <= max,
        message: `El título no debe exceder ${max} caracteres`
      })
    },

    institution: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'La institución es requerida'
      }),
      minLength: (value, min = 3) => ({
        isValid: !value || value.length >= min,
        message: `El nombre de la institución debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 100) => ({
        isValid: !value || value.length <= max,
        message: `El nombre de la institución no debe exceder ${max} caracteres`
      })
    },

    category: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'La categoría es requerida'
      }),
      minLength: (value, min = 3) => ({
        isValid: !value || value.length >= min,
        message: `La categoría debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 50) => ({
        isValid: !value || value.length <= max,
        message: `La categoría no debe exceder ${max} caracteres`
      })
    },

    certification: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'El nombre de la certificación es requerido'
      }),
      minLength: (value, min = 3) => ({
        isValid: !value || value.length >= min,
        message: `El nombre debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 100) => ({
        isValid: !value || value.length <= max,
        message: `El nombre no debe exceder ${max} caracteres`
      })
    },

    description: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'La descripción es requerida'
      }),
      minLength: (value, min = 10) => ({
        isValid: !value || value.length >= min,
        message: `La descripción debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 1000) => ({
        isValid: !value || value.length <= max,
        message: `La descripción no debe exceder ${max} caracteres`
      })
    },

    summary: {
      required: (value) => ({
        isValid: value && value.trim().length > 0,
        message: 'El resumen profesional es requerido'
      }),
      minLength: (value, min = 50) => ({
        isValid: !value || value.length >= min,
        message: `El resumen debe tener al menos ${min} caracteres`
      }),
      maxLength: (value, max = 800) => ({
        isValid: !value || value.length <= max,
        message: `El resumen no debe exceder ${max} caracteres`
      })
    }
  }

  // Función para validar un campo específico
  const validateField = (fieldType, value, fieldKey, rules = []) => {
    const fieldRules = validationRules[fieldType]
    if (!fieldRules) {
      return { isValid: true, message: '' }
    }

    // Si no se especifican reglas, usar todas las disponibles para el tipo
    const rulesToApply = rules.length > 0 ? rules : Object.keys(fieldRules)

    for (const rule of rulesToApply) {
      if (fieldRules[rule]) {
        const result = fieldRules[rule](value)
        if (!result.isValid) {
          errors[fieldKey] = result.message
          return result
        }
      }
    }

    // Si llegamos aquí, el campo es válido
    delete errors[fieldKey]
    return { isValid: true, message: '' }
  }

  // Función para validar múltiples campos
  const validateFields = (fields, data) => {
    isValidating.value = true
    let allValid = true

    // Si data es un array (tipo 'list'), validar cada elemento
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        fields.forEach(field => {
          const value = item[field.key]
          const rules = field.validationRules || []
          const fieldKey = `${field.key}_${index}` // Clave única para cada elemento
          
          const result = validateField(field.type, value, fieldKey, rules)
          
          if (!result.isValid) {
            allValid = false
          }
        })
      })
    } else {
      // Si data es un objeto (tipo 'simple'), validar normalmente
      fields.forEach(field => {
        const value = data[field.key]
        const rules = field.validationRules || []
        const result = validateField(field.type, value, field.key, rules)
        
        if (!result.isValid) {
          allValid = false
        }
      })
    }

    isValidating.value = false
    return allValid
  }

  // Función para limpiar errores
  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key])
  }

  // Función para limpiar error de un campo específico
  const clearFieldError = (fieldKey) => {
    delete errors[fieldKey]
  }

  // Función para verificar si hay errores
  const hasErrors = () => {
    return Object.keys(errors).length > 0
  }

  return {
    errors,
    isValidating,
    validationRules,
    validateField,
    validateFields,
    clearErrors,
    clearFieldError,
    hasErrors
  }
}