<template>
  <div class="modal-overlay" style="background-color: rgba(0, 0, 0, 0.6);">
    <div class="modal-container" :class="modalSize" style="background-color: var(--color-surface);">
      <h2 class="modal-title" style="font-size: var(--modal-title-size);">{{ config.title }}</h2>
      <form @submit.prevent="guardar">
        
        <!-- Formulario simple (campos únicos) -->
        <div v-if="config.type === 'simple'">
          <div v-for="field in config.fields" :key="field.key" class="form-group">
            <label class="form-label" style="font-size: var(--font-size-base); color: var(--text-secondary);">
              {{ field.label }}
              <span v-if="field.required" style="font-size: var(--error-text-size); color: var(--color-red-400);">*</span>
            </label>
            
            <!-- Input de texto y campos específicos -->
            <input 
              v-if="['text', 'email', 'tel', 'name', 'position', 'company', 'url', 'degree', 'institution', 'category', 'certification', 'date'].includes(field.type) && draft"
              v-model="draft[field.key]"
              :type="getInputType(field.type)"
              :placeholder="field.placeholder"
              class="input"
              :class="{ 'error': showErrors && errors[field.key] }"
              @input="handleFieldValidation(field, draft[field.key])"
              @blur="handleFieldBlur(field, draft[field.key])"
            />
            <div v-if="showErrors && errors[field.key] && ['text', 'email', 'tel', 'name', 'position', 'company', 'url', 'degree', 'institution', 'category', 'certification', 'date'].includes(field.type)" class="error-message">
              {{ errors[field.key] }}
            </div>
            
            <!-- Textarea y campos de descripción/resumen -->
            <textarea 
              v-else-if="['textarea', 'description', 'summary'].includes(field.type) && draft"
              v-model="draft[field.key]"
              :rows="field.rows || 3"
              :placeholder="field.placeholder"
              class="input"
              :class="{ 'error': showErrors && errors[field.key] }"
              @input="handleFieldValidation(field, draft[field.key])"
              @blur="handleFieldBlur(field, draft[field.key])"
            ></textarea>
            <div v-if="showErrors && errors[field.key] && ['textarea', 'description', 'summary'].includes(field.type)" class="error-message">
              {{ errors[field.key] }}
            </div>
          </div>
        </div>
        
        <!-- Formulario de lista (múltiples elementos) -->
        <div v-else-if="config.type === 'list'">
          <!-- Contenedor con scroll invisible para elementos existentes -->
          <div v-if="draft.length > 0" class="list-container">
            <template v-for="(item, i) in draft" :key="i">
              <div v-if="item && typeof item === 'object'" class="list-item" style="background-color: var(--bg-surface);">
                <div class="list-item-header">
                  <h4 class="list-item-title" style="font-size: var(--font-size-lg); color: var(--color-primary);">{{ config.itemTitle || 'Elemento' }} {{ i + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeItem(i)" 
                    class="remove-button"
                    style="color: var(--color-red-400); background-color: rgba(255, 84, 89, 0.2);"
                  >
                    ×
                  </button>
                </div>
              
                <div v-for="field in config.fields" :key="field.key" class="field-group">
                  <template v-if="field && field.key">
                    <!-- Campos de cargo y empresa en línea -->
                    <div v-if="isPositionCompanyField(field) && hasConsecutivePositionCompanyField(field, config.fields)" class="inline-fields">
                      <div>
                        <label class="field-label" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
                          {{ field.label }}
                        </label>
                        <input 
                          v-model="item[field.key]"
                          :type="field.type"
                          :placeholder="field.placeholder"
                          class="input-small"
                          :class="{ 'error': showErrors && errors[field.key] }"
                          @input="handleFieldValidation(field, item[field.key])"
                          @blur="handleFieldBlur(field, item[field.key])"
                        />
                        <div v-if="showErrors && errors[field.key]" class="error-message">
                          {{ errors[field.key] }}
                        </div>
                      </div>
                      <div v-if="getNextPositionCompanyField(field, config.fields)">
                        <label class="field-label" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
                          {{ getNextPositionCompanyField(field, config.fields).label }}
                        </label>
                        <input 
                          v-model="item[getNextPositionCompanyField(field, config.fields).key]"
                          :type="getNextPositionCompanyField(field, config.fields).type"
                          :placeholder="getNextPositionCompanyField(field, config.fields).placeholder"
                          class="input-small"
                          :class="{ 'error': showErrors && errors[getNextPositionCompanyField(field, config.fields).key] }"
                          @input="handleFieldValidation(getNextPositionCompanyField(field, config.fields), item[getNextPositionCompanyField(field, config.fields).key])"
                          @blur="handleFieldBlur(getNextPositionCompanyField(field, config.fields), item[getNextPositionCompanyField(field, config.fields).key])"
                        />
                        <div v-if="showErrors && errors[getNextPositionCompanyField(field, config.fields).key]" class="error-message">
                          {{ errors[getNextPositionCompanyField(field, config.fields).key] }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Campos de fecha en línea -->
                    <div v-else-if="isDateField(field) && hasConsecutiveDateField(field, config.fields)" class="inline-fields">
                      <div>
                        <label class="field-label" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
                          {{ field.label }}
                        </label>
                        <input 
                          v-model="item[field.key]"
                          :type="field.type"
                          :placeholder="field.placeholder"
                          class="input-small"
                          :class="{ 'error': showErrors && errors[field.key] }"
                          @input="handleFieldValidation(field, item[field.key])"
                          @blur="handleFieldBlur(field, item[field.key])"
                        />
                        <div v-if="showErrors && errors[field.key]" class="error-message">
                          {{ errors[field.key] }}
                        </div>
                      </div>
                      <div v-if="getNextDateField(field, config.fields)">
                        <label class="field-label" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
                          {{ getNextDateField(field, config.fields).label }}
                        </label>
                        <input 
                          v-model="item[getNextDateField(field, config.fields).key]"
                          :type="getNextDateField(field, config.fields).type"
                          :placeholder="getNextDateField(field, config.fields).placeholder"
                          class="input-small"
                          :class="{ 'error': showErrors && errors[getNextDateField(field, config.fields).key] }"
                          @input="handleFieldValidation(getNextDateField(field, config.fields), item[getNextDateField(field, config.fields).key])"
                          @blur="handleFieldBlur(getNextDateField(field, config.fields), item[getNextDateField(field, config.fields).key])"
                        />
                        <div v-if="showErrors && errors[getNextDateField(field, config.fields).key]" class="error-message">
                          {{ errors[getNextDateField(field, config.fields).key] }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Campos normales (incluye fechas individuales, no fecha, cargo o empresa, o sin consecutivo) -->
                    <template v-else-if="!isSkippedDateField(field, config.fields) && !isSkippedPositionCompanyField(field, config.fields)">
                      <label class="field-label" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
                        {{ field.label }}
                      </label>
                       
                      <!-- Input de texto y campos específicos -->
                      <input 
                        v-if="['text', 'date', 'name', 'position', 'company', 'url', 'degree', 'institution', 'category', 'certification'].includes(field.type)"
                        v-model="item[field.key]"
                        :type="getInputType(field.type)"
                        :placeholder="field.placeholder"
                        :disabled="field.key === 'endDate' && item.isCurrentJob"
                        class="input-small"
                        :class="{ 'input-disabled': field.key === 'endDate' && item.isCurrentJob, 'error': showErrors && errors[field.key] }"
                        @input="handleFieldValidation(field, item[field.key])"
                        @blur="handleFieldBlur(field, item[field.key])"
                      />
                      <div v-if="showErrors && errors[field.key] && ['text', 'date', 'name', 'position', 'company', 'url', 'degree', 'institution', 'category', 'certification'].includes(field.type)" class="error-message">
                        {{ errors[field.key] }}
                      </div>
                      
                      <!-- Checkbox -->
                      <div v-else-if="field.type === 'checkbox'" class="checkbox-container">
                        <input 
                          v-model="item[field.key]"
                          type="checkbox"
                          :id="`${field.key}-${i}`"
                          class="checkbox-input"
                          @change="handleCurrentJobChange(item, field.key)"
                        />
                        <label :for="`${field.key}-${i}`" class="checkbox-label">
                          {{ field.label }}
                        </label>
                      </div>
                       
                      <!-- Textarea y campos de descripción/resumen -->
                      <textarea 
                        v-else-if="['textarea', 'description', 'summary'].includes(field.type)"
                        v-model="item[field.key]"
                        :rows="field.rows || 2"
                        :placeholder="field.placeholder"
                        class="input-small"
                        :class="{ 'error': showErrors && errors[field.key] }"
                        @input="handleFieldValidation(field, item[field.key])"
                        @blur="handleFieldBlur(field, item[field.key])"
                      ></textarea>
                      <div v-if="showErrors && errors[field.key] && ['textarea', 'description', 'summary'].includes(field.type)" class="error-message">
                        {{ errors[field.key] }}
                      </div>
                    </template>
                  </template>
                </div>
               </div>
             </template>
          </div>
          
          <!-- Botón para agregar elemento -->
          <button 
            type="button" 
            @click="addItem" 
            class="btn btn-secondary add-button"
            style="font-size: var(--font-size-base);"
          >
            {{ config.addButtonText || 'Agregar elemento' }}
          </button>
        </div>
        
        <!-- Formulario de tags/habilidades -->
        <div v-else-if="config.type === 'tags'">
          <div class="tags-container">
            <label v-if="config.label" class="form-label" style="font-size: var(--font-size-base); color: var(--text-secondary);">
              {{ config.label }}
            </label>
            <p v-if="config.description" class="tags-description" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
              {{ config.description }}
            </p>
            <textarea 
              v-model="tagInput"
              @input="handleTagInput"
              :placeholder="config.placeholder || 'Agregar elementos separados por comas'"
              class="input"
              rows="4"
            ></textarea>
            <div class="tags-list">
              <span 
                v-for="(tag, i) in draft" 
                :key="i" 
                class="tag-item"
                style="background-color: var(--color-primary); color: var(--text-button-primary); font-size: var(--cv-skills-size);"
              >
                {{ tag }}
                <button 
                  @click="removeTag(i)" 
                  type="button" 
                  class="tag-remove"
                  style="color: var(--color-teal-300); font-size: var(--cv-checkmark-size);"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
        
        <!-- Botones -->
        <div class="modal-actions">
          <button type="button" @click="emit('close')" class="btn btn-cancel" style="font-size: var(--font-size-base);">
            Cancelar
          </button>
          <button 
            type="submit" 
            class="btn btn-primary" 
            style="font-size: var(--font-size-base);"
            :disabled="!areRequiredFieldsComplete || isValidating"
            :class="{ 'btn-disabled': !areRequiredFieldsComplete || isValidating }"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useValidation } from '../composables/useValidation'

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  initialData: {
    type: [Object, Array],
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

// Inicializar composable de validación
const { 
  errors, 
  isValidating, 
  validateField, 
  validateFields, 
  clearErrors,
  clearFieldError,
  hasErrors 
} = useValidation()

// Estado para controlar cuándo mostrar errores
const showErrors = ref(false)

const fieldTouched = reactive({})

const draft = ref(props.config?.type === 'list' ? [] : {})
const tagInput = ref('')
// Almacenar datos iniciales para comparación
const initialData = ref(null)

const modalSize = computed(() => {
  switch (props.config.size) {
    case 'sm': return 'max-w-sm sm:max-w-md'
    case 'lg': return 'max-w-md sm:max-w-lg'
    case 'xl': return 'max-w-lg sm:max-w-xl'
    default: return 'max-w-sm sm:max-w-md'
  }
})

// Computed property para verificar si todos los campos requeridos están completos
const areRequiredFieldsComplete = computed(() => {
  if (!props.config?.fields) return true
  
  if (props.config.type === 'simple') {
    // Para modales simples, verificar solo los campos requeridos
    const requiredFields = props.config.fields.filter(field => field.required)
    if (requiredFields.length === 0) return true // Si no hay campos requeridos, siempre permitir guardar
    
    return requiredFields.every(field => {
      const value = draft.value[field.key]
      return value && value.toString().trim() !== ''
    })
  } else if (props.config.type === 'list') {
    // Permitir guardar listas vacías (cuando se eliminan todos los elementos)
    if (!draft.value || draft.value.length === 0) return true
    
    // Si hay elementos, validar que todos los campos requeridos estén completos
    return draft.value.every(item => {
      return props.config.fields.every(field => {
        if (!field.required) return true
        const value = item[field.key]
        return value && value.toString().trim() !== ''
      })
    })
  }
  
  return true
})

onMounted(() => {
  initializeDraft()
})

function initializeDraft() {
  if (props.config.type === 'simple') {
    draft.value = props.initialData ? { ...props.initialData } : {}
    // Almacenar datos iniciales para comparación
    initialData.value = props.initialData ? JSON.parse(JSON.stringify(props.initialData)) : {}
    
    // Inicializar campos vacíos
    if (props.config.fields && Array.isArray(props.config.fields)) {
      props.config.fields.forEach(field => {
        if (field && field.key && !(field.key in draft.value)) {
          draft.value[field.key] = ''
        } else if (field && field.key && draft.value[field.key] != null) {
          // Asegurar que el valor sea string para campos de texto
          if (['text', 'email', 'tel', 'textarea'].includes(field.type)) {
            draft.value[field.key] = String(draft.value[field.key] || '')
          }
        }
      })
    }
    
    // Validar campos iniciales para limpiar errores si los datos son válidos
    if (props.initialData && props.config.fields) {
      props.config.fields.forEach(field => {
        if (field && field.key && draft.value[field.key]) {
          validateField(field.type, draft.value[field.key], field.key, field.validationRules)
        }
      })
    }
  } else if (props.config.type === 'list') {
    if (props.initialData && Array.isArray(props.initialData)) {
      // Filtrar elementos null y asegurar que todos los elementos tengan las propiedades necesarias
      draft.value = props.initialData.filter(item => item !== null && item !== undefined).map(item => {
        const newItem = { ...item }
        // Asegurar que todos los campos existan
        props.config.fields.forEach(field => {
          if (!(field.key in newItem)) {
            newItem[field.key] = ''
          }
        })
        return newItem
      })
      // Almacenar datos iniciales para comparación
      initialData.value = JSON.parse(JSON.stringify(draft.value))
    } else {
      draft.value = []
      // Almacenar datos iniciales vacíos para comparación
      initialData.value = []
    }
  } else if (props.config.type === 'tags') {
    draft.value = props.initialData ? [...props.initialData] : []
    // Inicializar el tagInput con las habilidades existentes para mostrar en el textarea
    if (props.initialData && props.initialData.length > 0) {
      tagInput.value = props.initialData.join(', ')
    }
  }
}

function addItem() {
  const newItem = {}
  if (props.config.fields && Array.isArray(props.config.fields)) {
    props.config.fields.forEach(field => {
      if (field && field.key) {
        // Inicializar checkbox como false por defecto
        if (field.type === 'checkbox') {
          newItem[field.key] = false
        } else {
          newItem[field.key] = ''
        }
      }
    })
  }
  draft.value.push(newItem)
}

function removeItem(index) {
  draft.value.splice(index, 1)
}

function addTag() {
  const val = tagInput.value.trim()
  if (val && !draft.value.includes(val)) {
    draft.value.push(val)
    tagInput.value = ''
  }
}

function handleTagInput() {
  const text = tagInput.value
  if (text.includes(',')) {
    const tags = text.split(',').map(tag => tag.trim()).filter(tag => tag && !draft.value.includes(tag))
    draft.value.push(...tags)
    tagInput.value = ''
  }
}

function removeTag(index) {
  draft.value.splice(index, 1)
}

function guardar() {
  // Limpiar errores previos
  clearErrors()
  
  // Validar solo los campos requeridos antes de guardar
  if (props.config.fields && props.config.fields.length > 0) {
    // Filtrar solo los campos requeridos para validación
    const requiredFields = props.config.fields.filter(field => field.required)
    
    if (requiredFields.length > 0) {
      const isFormValid = validateFields(requiredFields, draft.value)
      
      if (!isFormValid || hasErrors()) {
        showErrors.value = true
        // Si hay errores, no proceder con el guardado
        return
      }
    }
  }
  
  let dataToSave = draft.value
  
  // Para el tipo tags, procesar el texto del textarea si hay contenido sin procesar
  if (props.config.type === 'tags' && tagInput.value.trim()) {
    const additionalTags = tagInput.value.split(',').map(tag => tag.trim()).filter(tag => tag && !draft.value.includes(tag))
    dataToSave = [...draft.value, ...additionalTags]
  }
  
  // Emitir datos con información adicional para determinar el tipo de acción
  emit('save', {
    data: dataToSave,
    initialData: initialData.value,
    modalType: props.config.type
  })
  emit('close')
}

// Funciones helper para manejar campos de fecha
function isDateField(field) {
  return field.key === 'startDate' || field.key === 'endDate' || field.key === 'graduationDate' || field.key === 'issueDate'
}

function hasConsecutiveDateField(field, fields) {
  if (!isDateField(field)) return false
  
  const currentIndex = fields.findIndex(f => f.key === field.key)
  const nextField = fields[currentIndex + 1]
  
  return nextField && isDateField(nextField)
}

function getNextDateField(field, fields) {
  const currentIndex = fields.findIndex(f => f.key === field.key)
  const nextField = fields[currentIndex + 1]
  
  return nextField && isDateField(nextField) ? nextField : null
}

function isSkippedDateField(field, fields) {
  if (!isDateField(field)) return false
  
  const currentIndex = fields.findIndex(f => f.key === field.key)
  const prevField = fields[currentIndex - 1]
  
  return prevField && isDateField(prevField)
}

// Funciones helper para manejar campos de cargo y empresa
function isPositionCompanyField(field) {
  return field.key === 'position' || field.key === 'company'
}

function hasConsecutivePositionCompanyField(field, fields) {
  if (!isPositionCompanyField(field)) return false
  
  const currentIndex = fields.findIndex(f => f.key === field.key)
  const nextField = fields[currentIndex + 1]
  
  return nextField && isPositionCompanyField(nextField)
}

function getNextPositionCompanyField(field, fields) {
  const currentIndex = fields.findIndex(f => f.key === field.key)
  const nextField = fields[currentIndex + 1]
  
  return nextField && isPositionCompanyField(nextField) ? nextField : null
}

function isSkippedPositionCompanyField(field, fields) {
  if (!isPositionCompanyField(field)) return false
  
  const currentIndex = fields.findIndex(f => f.key === field.key)
  const prevField = fields[currentIndex - 1]
  
  return prevField && isPositionCompanyField(prevField)
}

// Función para manejar el cambio del checkbox de trabajo actual
function handleCurrentJobChange(item, fieldKey) {
  if (fieldKey === 'isCurrentJob' && item[fieldKey]) {
    item.endDate = 'Presente'
  } else if (fieldKey === 'isCurrentJob' && !item[fieldKey]) {
    item.endDate = ''
  }
}

// Función para obtener el tipo de input correcto
function getInputType(fieldType) {
  // Mapear tipos específicos a tipos de input HTML
  const typeMap = {
    'name': 'text',
    'position': 'text',
    'company': 'text',
    'url': 'url',
    'degree': 'text',
    'institution': 'text',
    'category': 'text',
    'certification': 'text',
    'description': 'text',
    'summary': 'text',
    'date': 'text',
    'text': 'text',
    'email': 'email',
    'tel': 'tel'
  }
  
  return typeMap[fieldType] || 'text'
}

// Función para validar cuando el usuario escribe
function handleFieldValidation(field, value) {
  // Solo validar si el campo es requerido
  if (field.required) {
    validateField(field.type, value, field.key, field.validationRules)
  } else {
    // Si no es requerido, limpiar cualquier error existente
    clearFieldError(field.key)
  }
}

// Función para marcar campo como "tocado" cuando pierde el foco
function handleFieldBlur(field, value) {
  fieldTouched[field.key] = true
  // Solo validar si el campo es requerido
  if (field.required) {
    validateField(field.type, value, field.key, field.validationRules)
    // Mostrar errores después de que el usuario haya interactuado con el campo
    showErrors.value = true
  }
}
</script>

<style scoped>
/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

/* Modal container */
.modal-container {
  border-radius: 20px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 10px 20px -5px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
  padding: 1rem;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (min-width: 640px) {
  .modal-container {
    padding: 1.5rem;
  }
}

/* Modal sizes */
.max-w-sm {
  max-width: 24rem;
}

.max-w-md {
  max-width: 28rem;
}

.max-w-lg {
  max-width: 32rem;
}

.max-w-xl {
  max-width: 36rem;
}

@media (min-width: 640px) {
  .max-w-sm.sm\:max-w-md {
    max-width: 28rem;
  }
  
  .max-w-md.sm\:max-w-lg {
    max-width: 32rem;
  }
  
  .max-w-lg.sm\:max-w-xl {
    max-width: 36rem;
  }
}

/* Modal title */
.modal-title {
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Form elements */
.form-group {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.field-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

/* List container */
.list-container {
  max-height: 24rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
  flex: 1;
  min-height: 0;
}

/* Hide scrollbar */
.list-container::-webkit-scrollbar {
  display: none;
}

.list-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* List item */
.list-item {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-primary);
}

/* List item header */
.list-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.list-item-title {
  font-weight: 500;
}

/* Remove button */
.remove-button {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.remove-button:hover {
  opacity: 0.8;
}

/* Field group */
.field-group {
  margin-bottom: 0.75rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

/* Inline fields */
.inline-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* Add button */
.add-button {
  margin-bottom: 1rem;
}

/* Tags container */
.tags-container {
  margin-bottom: 1rem;
}

.tags-description {
  margin-bottom: 0.75rem;
}

/* Tags list */
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

/* Tag item */
.tag-item {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Tag remove button */
.tag-remove {
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.tag-remove:hover {
  color: white;
}

/* Modal actions */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

/* Input styles */
.input {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
  padding: 16px 20px;
  border: 2px solid var(--color-gray-300);
  background-color: var(--bg-surface);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-family: var(--font-family-body);
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 3rem;
  max-height: 12rem;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-200), 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.input::placeholder {
  color: var(--color-gray-500);
  opacity: 0.8;
}

.input-small {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 12px 16px;
  border: 2px solid var(--color-gray-300);
  background-color: var(--bg-surface);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-body);
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 2.5rem;
  max-height: 8rem;
  line-height: 1.4;
  overflow-wrap: break-word;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.input-small:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-200), 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.input-small::placeholder {
  color: var(--color-gray-500);
  opacity: 0.8;
}

/* Button styles */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: var(--font-size-base);
  font-family: var(--font-family-body);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
}

.btn:focus {
  outline: none;
  box-shadow: 
    0 0 0 3px rgba(59, 130, 246, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background-color: var(--color-gray-400);
  color: var(--text-secondary);
  transition: all 0.2s;
}

.btn-cancel:hover {
  opacity: 0.8;
}

.btn-cancel:focus {
  box-shadow: 0 0 0 2px var(--color-gray-400);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--text-button-primary);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.08);
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.18),
    0 3px 6px rgba(0, 0, 0, 0.12);
}

.btn-primary:active {
  background: var(--color-primary-active);
}

.btn-secondary {
  background-color: var(--color-gray-400);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  transition: all 0.2s;
}

.btn-secondary:hover {
  opacity: 0.8;
}

.btn-secondary:focus {
  box-shadow: 0 0 0 2px var(--color-gray-400);
}

/* Checkbox styles */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.checkbox-label {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
}

.checkbox-label:hover {
  color: var(--color-primary);
}

/* Estilos para campos deshabilitados */
.input-disabled {
  background-color: var(--color-gray-100);
  color: var(--text-secondary);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-disabled::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
}

/* Estilos para validación de errores */
.input-small.error,
.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 1px #ef4444;
}

.input-small.error:focus,
.error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  display: block;
}

/* Estilos para botones deshabilitados */
.btn-disabled {
  background-color: var(--color-gray-300) !important;
  color: var(--text-secondary) !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}

.btn-disabled:hover {
  background-color: var(--color-gray-300) !important;
  opacity: 0.6 !important;
}
</style>