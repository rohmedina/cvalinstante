<template>
  <button 
    :class="buttonClasses"
    :style="buttonStyles"
    @click="$emit('click', $event)"
    :disabled="disabled"
  >
    <div class="button-content">
      <span v-if="icon" class="icon" :class="{ 'mr-2': text }">
        {{ icon }}
      </span>
      <span v-if="text" class="button-text">
        {{ text }}
      </span>
    </div>
    <div v-if="$slots.default" class="button-slot">
      <slot></slot>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'sidebar', 'action', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  customColor: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = ['btn-base']
  
  // Variante
  classes.push(`btn-${props.variant}`)
  
  // Tamaño
  classes.push(`btn-${props.size}`)
  
  // Ancho completo
  if (props.fullWidth) {
    classes.push('btn-full-width')
  }
  
  // Deshabilitado
  if (props.disabled) {
    classes.push('btn-disabled')
  }
  
  // Completado (para sidebar)
  if (props.completed && props.variant === 'sidebar') {
    classes.push('btn-sidebar-completed')
  }
  
  return classes.join(' ')
})

const buttonStyles = computed(() => {
  const styles = {}
  
  if (props.customColor) {
    styles.backgroundColor = props.customColor
  }
  
  return styles
})
</script>

<style scoped>
/* Estilos base */
.btn-base {
  @apply font-medium rounded-lg transition-all duration-200 cursor-pointer;
  @apply flex items-center justify-center;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  border: none;
}

/* Tamaños */
.btn-small {
  @apply px-3 py-1.5 text-sm;
}

.btn-medium {
  @apply px-4 py-2 text-base;
}

.btn-large {
  @apply px-6 py-3 text-lg;
}

/* Variantes */
.btn-primary {
  background-color: var(--color-primary);
  color: var(--text-button-primary);
}

.btn-primary:hover:not(.btn-disabled) {
  background-color: var(--color-primary-hover);
}

.btn-primary:focus {
  ring-color: var(--color-primary);
}

.btn-secondary {
  background-color: var(--color-gray-400);
  color: var(--text-primary);
}

.btn-secondary:hover:not(.btn-disabled) {
  @apply opacity-80;
}

.btn-secondary:focus {
  ring-color: var(--color-gray-400);
}

.btn-sidebar {
  @apply w-full text-left justify-start;
  background-color: transparent;
  color: var(--text-secondary);
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid var(--color-slate-500);
}



.btn-sidebar:focus {
  ring-color: var(--color-primary);
}

.btn-action {
  @apply w-full;
  background-color: var(--color-primary);
  color: var(--text-button-primary);
  padding: 12px 16px;
  font-size: var(--font-size-base);
}

.btn-action:hover:not(.btn-disabled) {
  background-color: var(--color-primary-hover);
}

.btn-action:focus {
  ring-color: var(--color-primary);
}

.btn-danger {
  background-color: var(--color-red-600);
  color: white;
}

.btn-danger:hover:not(.btn-disabled) {
  background-color: var(--color-red-700);
}

.btn-danger:focus {
  ring-color: var(--color-red-600);
}

/* Estados */
.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.btn-full-width {
  @apply w-full;
}

/* Icono */
.icon {
  @apply flex-shrink-0;
}

/* Layout del botón */
.button-content {
  @apply flex items-center;
}

.button-text {
  @apply flex-1;
}

.button-slot {
  @apply ml-auto;
}

/* Layout específico para sidebar */
.btn-sidebar .button-content {
  @apply flex-1;
}

.btn-sidebar {
  @apply flex items-center justify-between;
}

/* Hover effects para sidebar */
.btn-sidebar:hover {
  background-color: var(--color-surface);
  color: var(--text-primary);
  transform: translateX(2px);
  transition: all 0.2s ease-in-out;
}

.btn-sidebar:hover .icon {
  color: var(--color-primary);
  transition: color 0.2s ease-in-out;
}

.btn-sidebar:hover .button-text {
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

/* Estado completado para sidebar */
.btn-sidebar-completed {
  border-color: var(--color-teal-300);
}

.btn-sidebar-completed:hover {
  background-color: rgba(48, 247, 221, 0.2);
}
</style>