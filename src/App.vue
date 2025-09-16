<template>
  <div class="app-container" style="background-color: var(--color-background);">
    <!-- Panel izquierdo para edición -->
    <div class="sidebar-panel" style="background-color: var(--color-surface); color: var(--text-primary);">
      <!-- Header -->
      <div class="sidebar-header" style="border-color: var(--color-gray-400);">
        <h1 class="app-title" style="font-size: var(--modal-title-size); color: var(--color-primary);">CvAlInstante</h1>
        <p class="app-subtitle" style="font-size: var(--font-size-sm); color: var(--text-secondary);">Completa cada sección para crear tu currículum profesional</p>
      </div>
      
      <!-- Botones de navegación -->
      <div class="sidebar-content">
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
      <div class="sidebar-footer" style="border-color: var(--color-gray-400);">
        <Button variant="action" @click="exportPdf" icon="📄" text="Exportar a PDF" />
        <Button variant="secondary" @click="clearCV" icon="🗑️" text="Limpiar CV" full-width />
        
        <!-- Botón de donaciones -->
        <div class="donation-section" style="border-color: var(--color-gray-400);">
          <div class="donation-content">
            <p class="donation-text" style="color: var(--text-secondary);">¿Te gusta esta herramienta?</p>
            <div class="donation-button-container">
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
    <div class="preview-panel">
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
/* Layout principal */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .app-container {
    flex-direction: row;
  }
}

/* Panel lateral */
.sidebar-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .sidebar-panel {
    width: 24rem; /* 384px - equivalente a w-96 */
    height: 100vh;
    position: sticky;
    top: 0;
  }
}

/* Header del sidebar */
.sidebar-header {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid;
  flex-shrink: 0;
}

.app-title {
  font-weight: bold;
}

.app-subtitle {
  margin-top: 0.25rem;
}

/* Contenido del sidebar */
.sidebar-content {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 1024px) {
  .sidebar-content {
    overflow-y: auto;
  }
}

/* Footer del sidebar */
.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* Sección de donaciones */
.donation-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid;
}

.donation-content {
  text-align: center;
}

.donation-text {
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.donation-button-container {
  display: flex;
  justify-content: center;
}

/* Panel de vista previa */
.preview-panel {
  flex: 1;
  padding: 1rem;
  min-height: 100vh;
}

@media (min-width: 1024px) {
  .preview-panel {
    padding: 2rem;
  }
}

/* Indicadores de estado */
.status-indicator {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.status-indicator.filled {
  background-color: #10b981;
  border-color: #10b981;
}

.check-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: white;
}

/* Botón de Buy Me a Coffee */
.buy-me-coffee-btn {
  height: 2rem;
  transition: transform 0.2s ease-in-out;
}

.buy-me-coffee-btn:hover {
  transform: scale(1.05);
}
</style>

