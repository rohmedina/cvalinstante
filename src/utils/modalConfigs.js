// Configuraciones para los diferentes tipos de modales

export const modalConfigs = {
  personalInfo: {
    title: "Información Personal",
    type: "simple",
    size: "md",
    fields: [
      {
        key: "name",
        label: "Nombre Completo",
        type: "name",
        placeholder: "Ingresa tu nombre completo",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength', 'format']
      },
      {
        key: "phone",
        label: "Teléfono",
        type: "tel",
        placeholder: "Ingresa tu teléfono",
        required: true,
        validationRules: ['required', 'format']
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        placeholder: "Ingresa tu email",
        required: true,
        validationRules: ['required', 'format']
      },
      {
        key: "address",
        label: "Dirección",
        type: "text",
        placeholder: "Ingresa tu dirección",
        required: false,
        validationRules: ['minLength', 'maxLength']
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        type: "url",
        placeholder: "URL de tu perfil de LinkedIn",
        required: false,
        validationRules: ['format', 'maxLength']
      },
      {
        key: "website",
        label: "Sitio Web",
        type: "url",
        placeholder: "URL de tu sitio web",
        required: false,
        validationRules: ['format', 'maxLength']
      },
      {
        key: "github",
        label: "GitHub",
        type: "url",
        placeholder: "URL de tu perfil de GitHub",
        required: false,
        validationRules: ['format', 'maxLength']
      },
    ],
  },

  professionalSummary: {
    title: "Resumen Profesional",
    type: "simple",
    size: "lg",
    fields: [
      {
        key: "summary",
        label: "Resumen",
        type: "summary",
        placeholder: "Describe tu perfil profesional...",
        rows: 6,
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
    ],
  },

  workExperience: {
    title: "Experiencia Laboral",
    type: "list",
    size: "lg",
    addButtonText: "Agregar Experiencia",
    itemTitle: "Experiencia",
    fields: [
      {
        key: "position",
        label: "Cargo",
        type: "position",
        placeholder: "Título del puesto",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
      {
        key: "company",
        label: "Empresa",
        type: "company",
        placeholder: "Nombre de la empresa",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
      {
        key: "startDate",
        label: "Fecha de inicio",
        type: "date",
        placeholder: "Ej: Enero 2020",
        required: true,
        validationRules: ['required', 'format']
      },
      {
        key: "isCurrentJob",
        label: "Trabajo actual",
        type: "checkbox",
        placeholder: "",
      },
      {
        key: "endDate",
        label: "Fecha de fin",
        type: "date",
        placeholder: "Ej: Diciembre 2022 o 'Presente'",
        required: false,
        validationRules: ['format']
      },
      {
        key: "description",
        label: "Descripción",
        type: "description",
        placeholder: "Describe tus responsabilidades y logros...",
        rows: 4,
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
    ],
  },

  education: {
    title: "Educación",
    type: "list",
    size: "lg",
    addButtonText: "Agregar Educación",
    itemTitle: "Educación",
    fields: [
      {
        key: "degree",
        label: "Título",
        type: "degree",
        placeholder: "Ej: Licenciatura en Ingeniería",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
      {
        key: "institution",
        label: "Institución",
        type: "institution",
        placeholder: "Nombre de la universidad o institución",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
      {
        key: "graduationDate",
        label: "Fecha de graduación",
        type: "date",
        placeholder: "Ej: Mayo 2020",
        required: true,
        validationRules: ['required', 'format']
      },
      {
        key: "notes",
        label: "Notas adicionales",
        type: "text",
        placeholder: "Ej: Magna Cum Laude, GPA 3.8",
        required: false,
        validationRules: ['minLength', 'maxLength'] // Solo validaciones de longitud, sin 'required'
      },
    ],
  },

  skills: {
    title: "Habilidades Técnicas",
    type: "list",
    size: "lg",
    addButtonText: "Agregar Categoría",
    itemTitle: "Categoría",
    fields: [
      {
        key: "category",
        label: "Categoría Principal",
        type: "category",
        placeholder: "Ej: Habilidades Técnicas, Software y Plataformas",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
      {
        key: "subcategories",
        label: "Subcategorías y Habilidades",
        type: "textarea",
        placeholder:
          "Formato: Subcategoría: habilidad1, habilidad2\nEj:\nSEO: Investigación de keywords, SEO on-page, link building\nSEM: Google Ads, Facebook Ads\nEmail Marketing\nAnálisis de Datos",
        rows: 6,
      },
    ],
  },

  certifications: {
    title: "Certificaciones",
    type: "list",
    size: "lg",
    addButtonText: "Agregar Certificación",
    fields: [
      {
        key: "name",
        label: "Nombre de la certificación",
        type: "certification",
        placeholder: "Ej: AWS Solutions Architect",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
      {
        key: "issuer",
        label: "Emisor",
        type: "institution",
        placeholder: "Ej: Amazon Web Services",
        required: true,
        validationRules: ['required', 'minLength', 'maxLength']
      },
      {
        key: "issueDate",
        label: "Fecha de emisión",
        type: "date",
        placeholder: "Ej: Marzo 2023",
        required: true,
        validationRules: ['required', 'format']
      },
      {
        key: "url",
        label: "URL de verificación",
        type: "url",
        placeholder: "Enlace para verificar la certificación",
        required: false,
        validationRules: ['url']
      },
    ],
  },

  additionalInfo: {
    title: "Información Adicional",
    type: "simple",
    size: "lg",
    fields: [
      {
        key: "info",
        label: "Información adicional",
        type: "textarea",
        placeholder: "Cualquier información adicional relevante...",
        rows: 5,
        required: false,
      },
    ],
  },
};

// Función helper para obtener configuración por tipo
export function getModalConfig(type) {
  return modalConfigs[type] || null;
}

// Función helper para crear datos iniciales vacíos
export function createEmptyData(config) {
  if (config.type === "simple") {
    const data = {};
    config.fields.forEach((field) => {
      data[field.key] = "";
    });
    return data;
  } else if (config.type === "list") {
    return [];
  } else if (config.type === "tags") {
    return [];
  }
  return null;
}
