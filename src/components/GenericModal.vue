<template>
  <div class="modal-overlay" style="background-color: rgba(0, 0, 0, 0.6);">
    <div class="modal-container" :class="modalSize" style="background-color: var(--color-surface);">
      <h2 class="modal-title" style="font-size: var(--modal-title-size); color: var(--text-primary);">{{ config.title }}</h2>
      <form @submit.prevent="guardar">
        
        <!-- Formulario simple (campos únicos) -->
        <div v-if="config.type === 'simple'">
          <div v-for="field in config.fields" :key="field.key" class="form-group">
            <label class="form-label" style="font-size: var(--font-size-base); color: var(--text-secondary);">
              {{ field.label }}
              <span v-if="field.required" style="font-size: var(--error-text-size); color: var(--color-red-400);">*</span>
            </label>
            
            <!-- Input de texto -->
            <input 
              v-if="(field.type === 'text' || field.type === 'email' || field.type === 'tel') && draft"
              v-model="draft[field.key]"
              :type="field.type"
              :placeholder="field.placeholder"
              :required="field.required"
              class="input"
            />
            
            <!-- Textarea -->
            <textarea 
              v-else-if="field.type === 'textarea' && draft"
              v-model="draft[field.key]"
              :rows="field.rows || 3"
              :placeholder="field.placeholder"
              :required="field.required"
              class="input"
            ></textarea>
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
                        />
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
                        />
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
                        />
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
                        />
                      </div>
                    </div>
                    
                    <!-- Campos normales (no fecha, cargo o empresa, o sin consecutivo) -->
                    <template v-else-if="!isSkippedDateField(field, config.fields) && !isSkippedPositionCompanyField(field, config.fields)">
                      <label class="field-label" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
                        {{ field.label }}
                      </label>
                       
                      <!-- Input de texto -->
                      <input 
                        v-if="field.type === 'text' || field.type === 'date'"
                        v-model="item[field.key]"
                        :type="field.type"
                        :placeholder="field.placeholder"
                        class="input-small"
                      />
                       
                      <!-- Textarea -->
                      <textarea 
                        v-else-if="field.type === 'textarea'"
                        v-model="item[field.key]"
                        :rows="field.rows || 2"
                        :placeholder="field.placeholder"
                        class="input-small"
                      ></textarea>
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
          <button type="submit" class="btn btn-primary" style="font-size: var(--font-size-base);">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

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

const draft = ref(props.config?.type === 'list' ? [] : {})
const tagInput = ref('')

const modalSize = computed(() => {
  switch (props.config.size) {
    case 'sm': return 'max-w-sm sm:max-w-md'
    case 'lg': return 'max-w-md sm:max-w-lg'
    case 'xl': return 'max-w-lg sm:max-w-xl'
    default: return 'max-w-sm sm:max-w-md'
  }
})

onMounted(() => {
  initializeDraft()
})

function initializeDraft() {
  if (props.config.type === 'simple') {
    draft.value = props.initialData ? { ...props.initialData } : {}
    // Inicializar campos vacíos
    if (props.config.fields && Array.isArray(props.config.fields)) {
      props.config.fields.forEach(field => {
        if (field && field.key && !(field.key in draft.value)) {
          draft.value[field.key] = ''
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
    } else {
      draft.value = []
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
        newItem[field.key] = ''
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
  let dataToSave = draft.value
  
  // Para el tipo tags, procesar el texto del textarea si hay contenido sin procesar
  if (props.config.type === 'tags' && tagInput.value.trim()) {
    const additionalTags = tagInput.value.split(',').map(tag => tag.trim()).filter(tag => tag && !draft.value.includes(tag))
    dataToSave = [...draft.value, ...additionalTags]
  }
  
  emit('save', dataToSave)
  emit('close')
}

// Funciones helper para manejar campos de fecha
function isDateField(field) {
  return field.key === 'startDate' || field.key === 'endDate' || field.key === 'graduationDate'
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
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 1rem;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
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
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-gray-400);
  background-color: var(--bg-surface);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  transition: all 0.2s;
  resize: vertical;
  min-height: 2.5rem;
  max-height: 12rem;
  font-family: inherit;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary);
  border-color: var(--color-primary);
}

.input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.input-small {
  width: 100%;
  max-width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-gray-400);
  background-color: var(--bg-surface);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  transition: all 0.2s;
  resize: vertical;
  min-height: 2rem;
  max-height: 8rem;
  font-family: inherit;
  line-height: 1.4;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.input-small:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary);
  border-color: var(--color-primary);
}

.input-small::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

/* Button styles */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: var(--font-size-base);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
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
  background-color: var(--color-primary);
  color: var(--text-button-primary);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-primary:active {
  background-color: var(--color-primary-active);
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
</style>