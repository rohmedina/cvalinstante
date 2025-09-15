// Configuraciones para los diferentes tipos de modales

export const modalConfigs = {
  personalInfo: {
    title: 'Información Personal',
    type: 'simple',
    size: 'md',
    fields: [
      {
        key: 'name',
        label: 'Nombre Completo',
        type: 'text',
        placeholder: 'Ingresa tu nombre completo',
        required: true
      },
      {
        key: 'phone',
        label: 'Teléfono',
        type: 'tel',
        placeholder: 'Ingresa tu teléfono',
        required: true
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Ingresa tu email',
        required: true
      },
      {
        key: 'address',
        label: 'Dirección',
        type: 'text',
        placeholder: 'Ingresa tu dirección',
        required: false
      },
      {
        key: 'linkedin',
        label: 'LinkedIn',
        type: 'text',
        placeholder: 'URL de tu perfil de LinkedIn',
        required: false
      },
      {
        key: 'website',
        label: 'Sitio Web',
        type: 'text',
        placeholder: 'URL de tu sitio web',
        required: false
      },
      {
        key: 'github',
        label: 'GitHub',
        type: 'text',
        placeholder: 'URL de tu perfil de GitHub',
        required: false
      }
    ]
  },

  professionalSummary: {
    title: 'Resumen Profesional',
    type: 'simple',
    size: 'lg',
    fields: [
      {
        key: 'summary',
        label: 'Resumen',
        type: 'textarea',
        placeholder: 'Describe tu perfil profesional...',
        rows: 6,
        required: true
      }
    ]
  },

  workExperience: {
    title: 'Experiencia Laboral',
    type: 'list',
    size: 'lg',
    addButtonText: 'Agregar Experiencia',
    itemTitle: 'Experiencia',
    fields: [
      {
        key: 'position',
        label: 'Cargo',
        type: 'text',
        placeholder: 'Título del puesto'
      },
      {
        key: 'company',
        label: 'Empresa',
        type: 'text',
        placeholder: 'Nombre de la empresa'
      },
      {
        key: 'startDate',
        label: 'Fecha de inicio',
        type: 'text',
        placeholder: 'Ej: Enero 2020'
      },
      {
        key: 'endDate',
        label: 'Fecha de fin',
        type: 'text',
        placeholder: 'Ej: Presente o Diciembre 2022'
      },
      {
        key: 'description',
        label: 'Descripción',
        type: 'textarea',
        placeholder: 'Describe tus responsabilidades y logros...',
        rows: 3
      }
    ]
  },

  education: {
    title: 'Educación',
    type: 'list',
    size: 'lg',
    addButtonText: 'Agregar Educación',
    itemTitle: 'Educación',
    fields: [
      {
        key: 'degree',
        label: 'Título/Grado',
        type: 'text',
        placeholder: 'Ej: Ingeniería en Sistemas'
      },
      {
        key: 'institution',
        label: 'Institución',
        type: 'text',
        placeholder: 'Nombre de la universidad o institución'
      },
      {
        key: 'graduationDate',
        label: 'Fecha de graduación',
        type: 'text',
        placeholder: 'Ej: Diciembre 2020'
      },
      {
        key: 'notes',
        label: 'Notas adicionales',
        type: 'text',
        placeholder: 'Ej: Magna Cum Laude, GPA 3.8'
      }
    ]
  },

  skills: {
    title: 'Habilidades Técnicas',
    type: 'list',
    size: 'lg',
    addButtonText: 'Agregar Categoría',
    itemTitle: 'Categoría',
    fields: [
      {
        key: 'category',
        label: 'Categoría Principal',
        type: 'text',
        placeholder: 'Ej: Habilidades Técnicas, Software y Plataformas'
      },
      {
        key: 'subcategories',
        label: 'Subcategorías y Habilidades',
        type: 'textarea',
        placeholder: 'Formato: Subcategoría: habilidad1, habilidad2\nEj:\nSEO: Investigación de keywords, SEO on-page, link building\nSEM: Google Ads, Facebook Ads\nEmail Marketing\nAnálisis de Datos',
        rows: 6
      }
    ]
  },

  certifications: {
    title: 'Certificaciones',
    type: 'list',
    size: 'lg',
    addButtonText: 'Agregar Certificación',
    fields: [
      {
        key: 'name',
        label: 'Nombre de la certificación',
        type: 'text',
        placeholder: 'Ej: AWS Solutions Architect'
      },
      {
        key: 'issuer',
        label: 'Emisor',
        type: 'text',
        placeholder: 'Ej: Amazon Web Services'
      },
      {
        key: 'date',
        label: 'Fecha de obtención',
        type: 'text',
        placeholder: 'Ej: Marzo 2023'
      },
      {
        key: 'url',
        label: 'URL de verificación',
        type: 'text',
        placeholder: 'Enlace para verificar la certificación'
      }
    ]
  },

  additionalInfo: {
    title: 'Información Adicional',
    type: 'simple',
    size: 'lg',
    fields: [
      {
        key: 'info',
        label: 'Información adicional',
        type: 'textarea',
        placeholder: 'Cualquier información adicional relevante...',
        rows: 5,
        required: false
      }
    ]
  }
}

// Función helper para obtener configuración por tipo
export function getModalConfig(type) {
  return modalConfigs[type] || null
}

// Función helper para crear datos iniciales vacíos
export function createEmptyData(config) {
  if (config.type === 'simple') {
    const data = {}
    config.fields.forEach(field => {
      data[field.key] = ''
    })
    return data
  } else if (config.type === 'list') {
    return []
  } else if (config.type === 'tags') {
    return []
  }
  return null
}