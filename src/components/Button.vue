<template>
  <button 
    :class="buttonClasses"
    :style="buttonStyles"
    @click="$emit('click', $event)"
    :disabled="disabled"
    :aria-label="ariaLabel || text"
    :type="type"
    :role="role"
  >
    <div class="button-content">
      <span v-if="icon" class="icon" :class="{ 'icon-with-text': text }" aria-hidden="true">
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
  ariaLabel: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  role: {
    type: String,
    default: 'button'
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
  font-family: var(--font-family-base);
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
}

.btn-base:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--color-primary);
}

/* Tamaños */
.btn-small {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.btn-medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
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
  box-shadow: 0 0 0 2px var(--color-primary);
}

.btn-secondary {
  background-color: var(--color-gray-400);
  color: var(--text-primary);
}

.btn-secondary:hover:not(.btn-disabled) {
  opacity: 0.8;
}

.btn-secondary:focus {
  box-shadow: 0 0 0 2px var(--color-gray-400);
}

.btn-sidebar {
  width: 100%;
  text-align: left;
  justify-content: flex-start;
  background-color: transparent;
  color: var(--text-secondary);
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid var(--color-slate-500);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-sidebar:focus {
  box-shadow: 0 0 0 2px var(--color-primary);
}

.btn-action {
  width: 100%;
  background-color: var(--color-primary);
  color: var(--text-button-primary);
  padding: 12px 16px;
  font-size: var(--font-size-base);
}

.btn-action:hover:not(.btn-disabled) {
  background-color: var(--color-primary-hover);
}

.btn-action:focus {
  box-shadow: 0 0 0 2px var(--color-primary);
}

.btn-danger {
  background-color: var(--color-red-600);
  color: white;
}

.btn-danger:hover:not(.btn-disabled) {
  background-color: var(--color-red-700);
}

.btn-danger:focus {
  box-shadow: 0 0 0 2px var(--color-red-600);
}

/* Estados */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-full-width {
  width: 100%;
}

/* Icono */
.icon {
  flex-shrink: 0;
}

.icon-with-text {
  margin-right: 0.5rem;
}

/* Layout del botón */
.button-content {
  display: flex;
  align-items: center;
}

.button-text {
  flex: 1;
}

.button-slot {
  margin-left: auto;
}

/* Layout específico para sidebar */
.btn-sidebar .button-content {
  flex: 1;
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