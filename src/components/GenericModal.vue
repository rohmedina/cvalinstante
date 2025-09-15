<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 p-4" style="background-color: rgba(0, 0, 0, 0.6);">
    <div class="rounded-lg shadow-xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto" :class="modalSize" style="background-color: var(--color-surface);">
      <h2 class="font-bold mb-4" style="font-size: var(--modal-title-size); color: var(--text-primary);">{{ config.title }}</h2>
      <form @submit.prevent="guardar">
        
        <!-- Formulario simple (campos únicos) -->
        <div v-if="config.type === 'simple'">
          <div v-for="field in config.fields" :key="field.key" class="mb-4">
            <label class="block font-medium mb-2" style="font-size: var(--font-size-base); color: var(--text-secondary);">
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
          <div v-if="draft.length > 0" class="max-h-96 overflow-y-auto mb-4 pr-2 scrollbar-hide">
            <template v-for="(item, i) in draft" :key="i">
              <div v-if="item && typeof item === 'object'" class="px-4 py-3 mb-4 rounded-lg border border-solid border-color-surface" style="background-color: var(--bg-surface);">
                <div class="flex justify-between items-center mb-3">
                  <h4 class="font-medium" style="font-size: var(--font-size-lg); color: var(--color-primary);">{{ config.itemTitle || 'Elemento' }} {{ i + 1 }}</h4>
                  <button 
                    type="button" 
                    @click="removeItem(i)" 
                    class="w-6 h-6 rounded-full flex items-center justify-center text-sm hover:opacity-80"
                    style="color: var(--color-red-400); background-color: rgba(255, 84, 89, 0.2);"
                  >
                    ×
                  </button>
                </div>
              
                <div v-for="field in config.fields" :key="field.key" class="mb-3">
                  <template v-if="field && field.key">
                    <!-- Campos de cargo y empresa en línea -->
                    <div v-if="isPositionCompanyField(field) && hasConsecutivePositionCompanyField(field, config.fields)" class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block font-medium mb-1" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
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
                        <label class="block font-medium mb-1" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
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
                    <div v-else-if="isDateField(field) && hasConsecutiveDateField(field, config.fields)" class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block font-medium mb-1" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
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
                        <label class="block font-medium mb-1" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
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
                      <label class="block font-medium mb-1" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
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
            class="btn btn-secondary mb-4"
            style="font-size: var(--font-size-base);"
          >
            {{ config.addButtonText || 'Agregar elemento' }}
          </button>
        </div>
        
        <!-- Formulario de tags/habilidades -->
        <div v-else-if="config.type === 'tags'">
          <div class="mb-4">
            <label v-if="config.label" class="block font-medium mb-2" style="font-size: var(--font-size-base); color: var(--text-secondary);">
              {{ config.label }}
            </label>
            <p v-if="config.description" class="mb-3" style="font-size: var(--font-size-sm); color: var(--text-secondary);">
              {{ config.description }}
            </p>
            <textarea 
              v-model="tagInput"
              @input="handleTagInput"
              :placeholder="config.placeholder || 'Agregar elementos separados por comas'"
              class="input"
              rows="4"
            ></textarea>
            <div class="flex flex-wrap gap-2 mt-3">
              <span 
                v-for="(tag, i) in draft" 
                :key="i" 
                class="px-3 py-1 rounded-full flex items-center gap-2"
                style="background-color: var(--color-primary); color: var(--text-button-primary); font-size: var(--cv-skills-size);"
              >
                {{ tag }}
                <button 
                  @click="removeTag(i)" 
                  type="button" 
                  class="hover:text-white"
                  style="color: var(--color-teal-300); font-size: var(--cv-checkmark-size);"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
        
        <!-- Botones -->
        <div class="flex justify-end gap-3 mt-6">
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
.input {
  @apply w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200;
  background-color: var(--bg-surface);
  border: 1px solid var(--color-gray-400);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.input:focus {
  ring-color: var(--color-primary);
  border-color: var(--color-primary);
}

.input-small {
  @apply w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200;
  background-color: var(--bg-surface);
  border: 1px solid var(--color-gray-400);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.input-small::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.input-small:focus {
  ring-color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn {
  @apply px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2;
  font-size: var(--font-size-base);
}

.btn-cancel {
  @apply hover:opacity-80 transition-all duration-200;
  background-color: var(--color-gray-400);
  color: var(--text-secondary);
}

.btn-cancel:focus {
  ring-color: var(--color-gray-400);
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
  @apply hover:opacity-80 transition-all duration-200;
  background-color: var(--color-gray-400);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.btn-secondary:focus {
  ring-color: var(--color-gray-400);
}
</style>