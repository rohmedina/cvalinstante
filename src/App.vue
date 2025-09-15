<template>
  <div class="min-h-screen flex flex-col lg:flex-row" style="background-color: var(--color-background);">
    <!-- Panel izquierdo para edición -->
    <div class="w-full lg:w-96 flex flex-col lg:h-screen lg:sticky lg:top-0" style="background-color: var(--color-surface); color: var(--text-primary);">
      <!-- Header -->
      <div class="p-6 text-center border-b flex-shrink-0" style="border-color: var(--color-gray-400);">
        <h1 class="font-bold" style="font-size: var(--modal-title-size); color: var(--color-primary);">CvAlInstante</h1>
        <p class="mt-1" style="font-size: var(--font-size-sm); color: var(--text-secondary);">Completa cada sección para crear tu currículum profesional</p>
      </div>
      
      <!-- Botones de navegación -->
      <div class="flex-1 p-4 space-y-2 lg:overflow-y-auto">
        <Button variant="sidebar" @click="openPersonal()" icon="👤" text="Información Personal" :completed="hasPersonalInfo">
          <div class="status-indicator" :class="{ 'filled': hasPersonalInfo }">
            <svg v-if="hasPersonalInfo" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
        <Button variant="sidebar" @click="openSummary()" icon="📝" text="Resumen Profesional" :completed="hasProfessionalSummary">
          <div class="status-indicator" :class="{ 'filled': hasProfessionalSummary }">
            <svg v-if="hasProfessionalSummary" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
        <Button variant="sidebar" @click="openWork()" icon="💼" text="Experiencia Laboral" :completed="hasWorkExperience">
          <div class="status-indicator" :class="{ 'filled': hasWorkExperience }">
            <svg v-if="hasWorkExperience" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
        <Button variant="sidebar" @click="openEducation()" icon="🎓" text="Educación" :completed="hasEducation">
          <div class="status-indicator" :class="{ 'filled': hasEducation }">
            <svg v-if="hasEducation" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
        <Button variant="sidebar" @click="openSkills()" icon="⚡" text="Habilidades Técnicas" :completed="hasSkills">
          <div class="status-indicator" :class="{ 'filled': hasSkills }">
            <svg v-if="hasSkills" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
        <Button variant="sidebar" @click="openCerts()" icon="🏆" text="Certificaciones" :completed="hasCertifications">
          <div class="status-indicator" :class="{ 'filled': hasCertifications }">
            <svg v-if="hasCertifications" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
        <Button variant="sidebar" @click="openAdditional()" icon="📋" text="Información Adicional" :completed="hasAdditionalInfo">
          <div class="status-indicator" :class="{ 'filled': hasAdditionalInfo }">
            <svg v-if="hasAdditionalInfo" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
      </div>
      
      <!-- Botones de acción -->
      <div class="p-4 border-t space-y-2 flex-shrink-0" style="border-color: var(--color-gray-400);">
        <Button variant="action" @click="exportPdf" icon="📄" text="Exportar a PDF" />
        <Button variant="secondary" @click="clearCV" icon="🗑️" text="Limpiar CV" full-width />
        
        <!-- Botón de donaciones -->
        <div class="mt-4 pt-4 border-t" style="border-color: var(--color-gray-400);">
          <div class="text-center">
            <p class="text-xs mb-2" style="color: var(--text-secondary);">¿Te gusta esta herramienta?</p>
            <div class="flex justify-center">
              <a href="https://www.buymeacoffee.com/R0Medina" target="_blank">
                <img 
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                  alt="Buy Me A Coffee" 
                  class="buy-me-coffee-btn"
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel derecho para vista previa -->
    <div class="flex-1 p-4 lg:p-8 min-h-screen">
      <CvPreview />
    </div>

    <!-- Modal genérico -->
    <GenericModal 
      v-if="currentModal" 
      :config="currentModalConfig" 
      :initial-data="currentModalData" 
      @close="closeModal" 
      @save="saveModalData" 
      @delete="deleteModalData"
    />

    <!-- Toast notifications -->
    <Toast />

    <!-- Confirm dialog -->
    <ConfirmDialog 
      ref="confirmDialog"
      title="Limpiar CV"
      message="¿Estás seguro de que quieres limpiar todo el CV? Esta acción no se puede deshacer."
      confirm-text="Limpiar"
      cancel-text="Cancelar"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useCvStore } from './stores/cv'
import GenericModal from './components/GenericModal.vue'
import CvPreview from './components/CvPreview.vue'
import Button from './components/Button.vue'
import Toast from './components/Toast.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import { getModalConfig, createEmptyData } from './utils/modalConfigs.js'

const cvStore = useCvStore()
const toast = inject('toast')
const confirmDialog = ref(null)

// Sistema de modal genérico
const currentModal = ref(null)
const currentModalConfig = ref(null)
const currentModalData = ref(null)

// Funciones para abrir modales específicos
const openPersonal = () => openModal('personalInfo')
const openSummary = () => openModal('professionalSummary')
const openWork = () => openModal('workExperience')
const openEducation = () => openModal('education')
const openSkills = () => openModal('skills')
const openCerts = () => openModal('certifications')
const openAdditional = () => openModal('additionalInfo')

// Función genérica para abrir modales
const openModal = (type) => {
  const config = getModalConfig(type)
  if (!config) return
  
  currentModal.value = type
  currentModalConfig.value = config
  
  // Mapear el tipo a la propiedad correcta del store
  const storeKey = type === 'skills' ? 'technicalSkills' : type
  
  // Obtener datos existentes o crear datos vacíos
  let existingData = cvStore.cvData[storeKey]
  
  // Manejar casos especiales para professionalSummary y additionalInfo
  if (type === 'professionalSummary') {
    // El store guarda professionalSummary como string, pero el modal espera un objeto con 'summary'
    existingData = existingData ? { summary: existingData } : { summary: '' }
  } else if (type === 'additionalInfo') {
    // El store guarda additionalInfo como string, pero el modal espera un objeto con 'info'
    existingData = existingData ? { info: existingData } : { info: '' }
  } else if (!existingData) {
    existingData = createEmptyData(config)
  }
  
  currentModalData.value = JSON.parse(JSON.stringify(existingData))
}

// Función para cerrar modal
const closeModal = () => {
  currentModal.value = null
  currentModalConfig.value = null
  currentModalData.value = null
}

// Función para guardar datos del modal
const saveModalData = (data) => {
  if (currentModal.value) {
    const isEditing = currentModalData.value && Object.keys(currentModalData.value).length > 0
    cvStore.updateSection(currentModal.value, data)
    
    // Mostrar toast de confirmación
    const sectionNames = {
      personalInfo: 'Información Personal',
      professionalSummary: 'Resumen Profesional',
      workExperience: 'Experiencia Laboral',
      education: 'Educación',
      skills: 'Habilidades Técnicas',
      languages: 'Idiomas',
      certifications: 'Certificaciones',
      additionalInfo: 'Información Adicional'
    }
    
    const sectionName = sectionNames[currentModal.value] || 'Sección'
    const action = isEditing ? 'actualizada' : 'creada'
    toast.success(`${sectionName} ${action} exitosamente`)
    
    closeModal()
  }
}

// Función para eliminar datos del modal
const deleteModalData = (index) => {
  if (currentModal.value && currentModalConfig.value.type === 'list') {
    // Mapear el tipo a la propiedad correcta del store
    const storeKey = currentModal.value === 'skills' ? 'technicalSkills' : currentModal.value
    const currentData = [...cvStore.cvData[storeKey]]
    currentData.splice(index, 1)
    cvStore.updateSection(currentModal.value, currentData)
    currentModalData.value = currentData
    
    // Mostrar toast de confirmación
    const sectionNames = {
      workExperience: 'Experiencia Laboral',
      education: 'Educación',
      skills: 'Habilidad Técnica',
      languages: 'Idioma',
      certifications: 'Certificación'
    }
    
    const sectionName = sectionNames[currentModal.value] || 'Elemento'
    toast.success(`${sectionName} eliminada exitosamente`)
  }
}

// Computed properties para verificar si cada sección tiene información
const hasPersonalInfo = computed(() => {
  const info = cvStore.cvData.personalInfo
  return info.name || info.phone || info.email || info.address || info.linkedin || info.website
})

const hasProfessionalSummary = computed(() => {
  return cvStore.cvData.professionalSummary && cvStore.cvData.professionalSummary.trim().length > 0
})

const hasWorkExperience = computed(() => {
  return cvStore.cvData.workExperience && cvStore.cvData.workExperience.length > 0
})

const hasEducation = computed(() => {
  return cvStore.cvData.education && cvStore.cvData.education.length > 0
})

const hasSkills = computed(() => {
  return cvStore.cvData.technicalSkills && cvStore.cvData.technicalSkills.length > 0
})

const hasCertifications = computed(() => {
  return cvStore.cvData.certifications && cvStore.cvData.certifications.length > 0
})

const hasAdditionalInfo = computed(() => {
  return cvStore.cvData.additionalInfo && cvStore.cvData.additionalInfo.trim().length > 0
})

// Función para exportar PDF (se delegará al componente CvPreview)
const exportPdf = () => {
  // Esta función será manejada por el componente CvPreview
  const event = new CustomEvent('export-pdf')
  window.dispatchEvent(event)
}

// Función para limpiar el CV
const clearCV = async () => {
  const confirmed = await confirmDialog.value.show()
  
  if (confirmed) {
    // Resetear todos los datos del CV
    cvStore.cvData.personalInfo = {
      name: '',
      phone: '',
      email: '',
      address: '',
      linkedin: '',
      website: '',
      github: '',
    }
    cvStore.cvData.professionalSummary = ''
    cvStore.cvData.workExperience = []
    cvStore.cvData.education = []
    cvStore.cvData.technicalSkills = []
    cvStore.cvData.languages = []
    cvStore.cvData.certifications = []
    cvStore.cvData.additionalInfo = ''
    
    // Mostrar toast de confirmación
    toast.success('CV limpiado exitosamente')
  }
}

// Funcionalidad del modo oscuro
const isDarkMode = ref(false)

onMounted(() => {
  // Cargar preferencia del modo oscuro desde localStorage
  const savedTheme = localStorage.getItem('darkMode')
  if (savedTheme !== null) {
    isDarkMode.value = JSON.parse(savedTheme)
  } else {
    // Si no hay preferencia guardada, usar la preferencia del sistema
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  updateTheme()
})

const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style scoped>
/* Estilos para indicadores de estado en botones del sidebar */
.status-indicator {
  @apply w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200;
  border-color: var(--color-gray-400);
}

.status-indicator.filled {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.check-icon {
  @apply w-3 h-3 text-white;
}

/* Estilos para el botón de Buy Me a Coffee */
.buy-me-coffee-btn {
  height: 40px !important;
  width: auto !important;
  border-radius: 8px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}

.buy-me-coffee-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
</style>

