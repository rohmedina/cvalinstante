# Reglas de Validación del CV - Documentación

## Resumen
Este documento describe las reglas de validación específicas implementadas para los campos del CV en la aplicación. Las validaciones están configuradas tanto en `useValidation.js` como en `modalConfigs.js`.

## Reglas de Validación por Tipo de Campo

### 1. Campos de Nombre (`name`)
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 100 caracteres
- **Formato**: Solo letras, espacios, acentos y guiones
- **Ejemplo**: "Juan Carlos Pérez-García"

### 2. Campos de Posición/Cargo (`position`)
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 100 caracteres
- **Ejemplo**: "Desarrollador Full Stack Senior"

### 3. Campos de Empresa (`company`)
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 100 caracteres
- **Ejemplo**: "Google Inc."

### 4. Campos de URL (`url`)
- **Requerido**: No (opcional)
- **Longitud máxima**: 255 caracteres
- **Formato**: URL válida (http/https)
- **Ejemplos**: 
  - "https://linkedin.com/in/usuario"
  - "https://github.com/usuario"
  - "https://miportfolio.com"

### 5. Campos de Título/Grado (`degree`)
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 150 caracteres
- **Ejemplo**: "Licenciatura en Ingeniería de Sistemas"

### 6. Campos de Institución (`institution`)
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 150 caracteres
- **Ejemplo**: "Universidad Nacional de Colombia"

### 7. Campos de Categoría (`category`)
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 50 caracteres
- **Ejemplo**: "Habilidades Técnicas"

### 8. Campos de Certificación (`certification`)
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 150 caracteres
- **Ejemplo**: "AWS Solutions Architect Associate"

### 9. Campos de Descripción (`description`)
- **Requerido**: Sí
- **Longitud mínima**: 10 caracteres
- **Longitud máxima**: 1000 caracteres
- **Ejemplo**: "Desarrollé aplicaciones web usando React y Node.js..."

### 10. Campos de Resumen (`summary`)
- **Requerido**: Sí
- **Longitud mínima**: 50 caracteres
- **Longitud máxima**: 500 caracteres
- **Ejemplo**: "Desarrollador Full Stack con 5 años de experiencia..."

### 11. Campos de Fecha (`date`)
- **Requerido**: Depende del campo
- **Formato**: Texto libre para fechas (ej: "Enero 2020", "Presente")
- **Validación**: Formato de fecha flexible
- **Ejemplos**: "Enero 2020", "Diciembre 2022", "Presente"

## Configuración en modalConfigs.js

Cada campo en los modales tiene la propiedad `validationRules` que especifica qué reglas aplicar:

```javascript
{
  key: "name",
  label: "Nombre Completo",
  type: "name",
  placeholder: "Ingresa tu nombre completo",
  required: true,
  validationRules: ['required', 'minLength', 'maxLength', 'format']
}
```

## Tipos de Validación Disponibles

1. **required**: Campo obligatorio
2. **minLength**: Longitud mínima
3. **maxLength**: Longitud máxima
4. **format**: Validación de formato específico
5. **email**: Validación de email (para campos de correo)
6. **tel**: Validación de teléfono

## Mensajes de Error

Los mensajes de error se generan automáticamente basados en el tipo de validación:
- Campos requeridos: "Este campo es requerido"
- Longitud mínima: "Debe tener al menos X caracteres"
- Longitud máxima: "No puede exceder X caracteres"
- Formato inválido: "Formato inválido"

## Implementación

Las validaciones se ejecutan:
1. **En tiempo real**: Mientras el usuario escribe
2. **Al perder el foco**: Cuando el usuario sale del campo
3. **Al enviar**: Antes de guardar los datos

## Estilos de Error

Los campos con errores muestran:
- Borde rojo
- Mensaje de error debajo del campo
- Estilos de foco especiales para campos con error