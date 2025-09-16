<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modal-overlay" style="background-color: rgba(0, 0, 0, 0.6);">
      <div class="modal-content" style="background-color: var(--color-surface);">
        <div class="modal-header">
          <div class="icon-container">
            <svg class="warning-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        
        <div class="modal-body">
          <h3 class="modal-title" style="color: var(--text-primary);">
            {{ title }}
          </h3>
          <p class="modal-message" style="color: var(--text-secondary);">
            {{ message }}
          </p>
        </div>
        
        <div class="modal-actions">
          <button
            @click="cancel"
            class="btn btn-cancel cancel-order"
          >
            {{ cancelText }}
          </button>
          <button
            @click="confirm"
            class="btn btn-danger confirm-order"
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

/* Modal content */
.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
}

@media (min-width: 640px) {
  .modal-content {
    max-width: 28rem;
  }
}

/* Modal header */
.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

/* Icon container */
.icon-container {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fecaca;
}

/* Warning icon */
.warning-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #dc2626;
}

/* Modal body */
.modal-body {
  text-align: center;
}

/* Modal title */
.modal-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* Modal message */
.modal-message {
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

/* Modal actions */
.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .modal-actions {
    flex-direction: row;
    gap: 0.5rem;
    justify-content: flex-end;
  }
}

/* Button order for mobile/desktop */
.cancel-order {
  order: 2;
}

.confirm-order {
  order: 1;
}

@media (min-width: 640px) {
  .cancel-order {
    order: 1;
  }
  
  .confirm-order {
    order: 2;
  }
}

/* Button styles */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.btn-cancel {
  background-color: var(--color-gray-400);
  color: var(--text-secondary);
}

.btn-cancel:hover {
  opacity: 0.8;
}

.btn-cancel:focus {
  box-shadow: 0 0 0 2px var(--color-gray-400);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-danger:focus {
  box-shadow: 0 0 0 2px #ef4444;
}
</style>