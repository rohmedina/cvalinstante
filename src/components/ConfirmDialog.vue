<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50 p-4" style="background-color: rgba(0, 0, 0, 0.6);">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md p-6" style="background-color: var(--color-surface);">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0 w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-red-100">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-medium mb-2" style="color: var(--text-primary);">
            {{ title }}
          </h3>
          <p class="text-sm mb-6" style="color: var(--text-secondary);">
            {{ message }}
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:justify-end">
          <button
            @click="cancel"
            class="btn btn-cancel order-2 sm:order-1"
          >
            {{ cancelText }}
          </button>
          <button
            @click="confirm"
            class="btn btn-danger order-1 sm:order-2"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Confirmar acción'
  },
  message: {
    type: String,
    default: '¿Estás seguro de que quieres continuar?'
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const isVisible = ref(false)
let resolvePromise = null

const show = () => {
  isVisible.value = true
  return new Promise((resolve) => {
    resolvePromise = resolve
  })
}

const confirm = () => {
  isVisible.value = false
  emit('confirm')
  if (resolvePromise) {
    resolvePromise(true)
    resolvePromise = null
  }
}

const cancel = () => {
  isVisible.value = false
  emit('cancel')
  if (resolvePromise) {
    resolvePromise(false)
    resolvePromise = null
  }
}

defineExpose({
  show
})
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2;
  font-size: 0.875rem;
}

.btn-cancel {
  @apply hover:opacity-80;
  background-color: var(--color-gray-400);
  color: var(--text-secondary);
}

.btn-cancel:focus {
  ring-color: var(--color-gray-400);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-danger:focus {
  ring-color: #ef4444;
}
</style>