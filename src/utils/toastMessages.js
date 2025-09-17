// Sistema de mensajes Toast contextuales

export const ACTION_TYPES = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  NO_CONTENT: 'no_content',
  NO_CHANGES: 'no_changes',
  EXPORT_SUCCESS: 'export_success',
  EXPORT_ERROR: 'export_error',
  EXPORT_VALIDATION_ERROR: 'export_validation_error'
}

export const TOAST_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
}

// Configuración de mensajes por sección y acción
export const TOAST_MESSAGES = {
  workExperience: {
    [ACTION_TYPES.CREATE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Experiencia laboral guardada con éxito'
    },
    [ACTION_TYPES.EDIT]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Experiencia laboral editada con éxito'
    },
    [ACTION_TYPES.DELETE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Experiencia laboral eliminada con éxito'
    },
    [ACTION_TYPES.NO_CONTENT]: {
      type: TOAST_TYPES.INFO,
      message: 'Recuerda agregar tu experiencia laboral'
    }
  },
  education: {
    [ACTION_TYPES.CREATE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Educación guardada con éxito'
    },
    [ACTION_TYPES.EDIT]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Educación editada con éxito'
    },
    [ACTION_TYPES.DELETE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Educación eliminada con éxito'
    },
    [ACTION_TYPES.NO_CONTENT]: {
      type: TOAST_TYPES.INFO,
      message: 'Recuerda agregar tu formación académica'
    }
  },
  skills: {
    [ACTION_TYPES.CREATE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Habilidades técnicas guardadas con éxito'
    },
    [ACTION_TYPES.EDIT]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Habilidades técnicas editadas con éxito'
    },
    [ACTION_TYPES.DELETE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Habilidades técnicas eliminadas con éxito'
    },
    [ACTION_TYPES.NO_CONTENT]: {
      type: TOAST_TYPES.INFO,
      message: 'Recuerda agregar tus habilidades técnicas'
    }
  },
  certifications: {
    [ACTION_TYPES.CREATE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Certificaciones guardadas con éxito'
    },
    [ACTION_TYPES.EDIT]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Certificaciones editadas con éxito'
    },
    [ACTION_TYPES.DELETE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Certificaciones eliminadas con éxito'
    },
    [ACTION_TYPES.NO_CONTENT]: {
      type: TOAST_TYPES.INFO,
      message: 'Recuerda agregar tus certificaciones'
    }
  },
  // Mensajes para secciones simples (no listas)
  personalInfo: {
    [ACTION_TYPES.CREATE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Información personal guardada con éxito'
    },
    [ACTION_TYPES.EDIT]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Información personal editada con éxito'
    },
    [ACTION_TYPES.NO_CONTENT]: {
      type: TOAST_TYPES.INFO,
      message: 'Información personal eliminada'
    }
  },
  professionalSummary: {
    [ACTION_TYPES.CREATE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Resumen profesional guardado con éxito'
    },
    [ACTION_TYPES.EDIT]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Resumen profesional editado con éxito'
    },
    [ACTION_TYPES.NO_CONTENT]: {
      type: TOAST_TYPES.INFO,
      message: 'Resumen profesional eliminado'
    }
  },
  additionalInfo: {
    [ACTION_TYPES.CREATE]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Información adicional guardada con éxito'
    },
    [ACTION_TYPES.EDIT]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'Información adicional editada con éxito'
    },
    [ACTION_TYPES.NO_CONTENT]: {
      type: TOAST_TYPES.INFO,
      message: 'Información adicional eliminada'
    }
  },
  pdfExport: {
    [ACTION_TYPES.EXPORT_SUCCESS]: {
      type: TOAST_TYPES.SUCCESS,
      message: 'CV exportado exitosamente'
    },
    [ACTION_TYPES.EXPORT_ERROR]: {
      type: TOAST_TYPES.ERROR,
      message: 'Error al exportar el CV. Inténtalo de nuevo'
    },
    [ACTION_TYPES.EXPORT_VALIDATION_ERROR]: {
      type: TOAST_TYPES.WARNING,
      message: 'Para exportar tu CV necesitas completar al menos la Información Personal y el Resumen Profesional'
    }
  }
}

/**
 * Determina el tipo de acción basado en los datos iniciales y finales
 * @param {*} initialData - Datos iniciales
 * @param {*} finalData - Datos finales
 * @param {string} modalType - Tipo de modal ('simple' o 'list')
 * @returns {string} Tipo de acción
 */
export function determineActionType(initialData, finalData, modalType) {
  if (modalType === 'list') {
    const initialLength = Array.isArray(initialData) ? initialData.length : 0
    const finalLength = Array.isArray(finalData) ? finalData.length : 0
    
    // Si no había datos iniciales y tampoco hay datos finales
    if (initialLength === 0 && finalLength === 0) {
      return ACTION_TYPES.NO_CONTENT
    }
    
    // Si no había datos iniciales pero ahora hay datos
    if (initialLength === 0 && finalLength > 0) {
      return ACTION_TYPES.CREATE
    }
    
    // Si había datos y ahora no hay
    if (initialLength > 0 && finalLength === 0) {
      return ACTION_TYPES.NO_CONTENT
    }
    
    // Si se agregaron elementos (más elementos que antes)
    if (finalLength > initialLength) {
      return ACTION_TYPES.CREATE
    }
    
    // Si se eliminaron elementos (menos elementos que antes)
    if (finalLength < initialLength) {
      return ACTION_TYPES.DELETE
    }
    
    // Si hay cambios en los datos (mismo número de elementos pero contenido diferente)
    if (JSON.stringify(initialData) !== JSON.stringify(finalData)) {
      return ACTION_TYPES.EDIT
    }
    
    return ACTION_TYPES.NO_CHANGES
  } else {
    // Para modales simples
    const hasInitialContent = initialData && Object.values(initialData).some(value => 
      value && value.toString().trim() !== ''
    )
    const hasFinalContent = finalData && Object.values(finalData).some(value => 
      value && value.toString().trim() !== ''
    )
    
    // Si no había contenido inicial pero ahora hay
    if (!hasInitialContent && hasFinalContent) {
      return ACTION_TYPES.CREATE
    }
    
    // Si había contenido y sigue habiendo (con cambios)
    if (hasInitialContent && hasFinalContent) {
      return JSON.stringify(initialData) !== JSON.stringify(finalData) 
        ? ACTION_TYPES.EDIT 
        : ACTION_TYPES.NO_CHANGES
    }
    
    return ACTION_TYPES.NO_CHANGES
  }
}

/**
 * Obtiene el mensaje Toast apropiado
 * @param {string} sectionType - Tipo de sección
 * @param {string} actionType - Tipo de acción
 * @returns {Object} Objeto con type y message
 */
export function getToastMessage(sectionType, actionType) {
  const sectionMessages = TOAST_MESSAGES[sectionType]
  if (!sectionMessages) {
    return {
      type: TOAST_TYPES.SUCCESS,
      message: 'Guardado con éxito'
    }
  }
  
  const messageConfig = sectionMessages[actionType]
  if (!messageConfig) {
    return {
      type: TOAST_TYPES.SUCCESS,
      message: 'Guardado con éxito'
    }
  }
  
  return messageConfig
}