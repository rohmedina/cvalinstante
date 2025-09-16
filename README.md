# 📋 CvAlInstante

Una aplicación web moderna y elegante para crear currículums vitae profesionales de forma rápida e instantánea. Construida con Vue.js 3 y diseñada para ofrecer una experiencia de usuario excepcional.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.18-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?style=flat-square&logo=css3&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.3-FFD859?style=flat-square&logo=pinia&logoColor=black)

## ✨ Características

### 🎯 **Funcionalidades Principales**
- **📝 Editor Completo**: Crea CVs profesionales con todas las secciones estándar
- **👁️ Vista Previa en Tiempo Real**: Visualiza cambios instantáneamente
- **💾 Guardado Automático**: Datos persistentes en el navegador
- **📱 Diseño Responsive**: Optimizado para desktop y móvil
- **🎨 Interfaz Moderna**: Sistema de toasts y modales elegantes
- **🗑️ Gestión Inteligente**: Limpieza de datos con confirmación

### 📋 **Secciones del CV**
- ✅ Información Personal (contacto, redes sociales)
- ✅ Resumen Profesional
- ✅ Experiencia Laboral
- ✅ Educación
- ✅ Habilidades Técnicas
- ✅ Certificaciones
- ✅ Información Adicional

### 🎨 **Experiencia de Usuario**
- **Sistema de Notificaciones**: Toasts responsive para feedback inmediato
- **Modales Dinámicos**: Formularios adaptativos según el tipo de contenido
- **Indicadores Visuales**: Botones que muestran el estado de cada sección
- **Confirmaciones Elegantes**: Diálogos personalizados para acciones críticas

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/cv-al-instante.git
   cd cv-al-instante
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Vista previa de la build de producción
```

## 🏗️ Arquitectura

### Stack Tecnológico
```
Frontend Framework    → Vue.js 3 (Composition API)
Build Tool           → Vite
Estilos             → CSS3 Personalizado + CSS Variables
Estado              → Pinia Store
Persistencia        → LocalStorage
```

### Estructura del Proyecto
```
src/
├── components/          # Componentes reutilizables
│   ├── Button.vue      # Componente de botón personalizado
│   ├── ConfirmDialog.vue # Diálogo de confirmación
│   ├── CvPreview.vue   # Vista previa del CV
│   ├── GenericModal.vue # Modal universal para edición
│   └── Toast.vue       # Sistema de notificaciones
├── composables/        # Lógica reutilizable
│   └── useToast.js     # Composable para toasts
├── stores/             # Gestión de estado
│   └── cv.js          # Store principal del CV
├── utils/              # Utilidades
│   └── modalConfigs.js # Configuraciones de modales
├── App.vue            # Componente principal
├── main.js            # Punto de entrada
└── variables.css      # Variables CSS globales
```

## 🎨 Diseño y UX

### Responsive Design
- **Desktop**: Layout de dos paneles (navegación | vista previa)
- **Móvil**: Layout apilado vertical para mejor usabilidad
- **Toasts Adaptativos**: Posicionamiento inteligente según dispositivo

### Sistema de Componentes
- **Modales Dinámicos**: Se adaptan automáticamente al tipo de contenido
- **Formularios Inteligentes**: Validación y campos requeridos
- **Feedback Visual**: Indicadores de estado y confirmaciones

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue.js** | 3.5.18 | Framework principal |
| **Vite** | 7.1.2 | Build tool y dev server |
| **Pinia** | 3.0.3 | Gestión de estado |
| **CSS3** | Personalizado | Estilos y diseño responsive |
| **jsPDF** | 2.5.1 | Generación de PDFs |

## 📱 Características Responsive

### Desktop (≥640px)
- Panel lateral fijo con navegación
- Vista previa a pantalla completa
- Toasts en esquina superior derecha
- Modales centrados con tamaño optimizado

### Móvil (<640px)
- Layout apilado vertical
- Panel de navegación en la parte superior
- Toasts desde la parte superior
- Modales adaptados al ancho de pantalla

## 🎯 Casos de Uso

### Para Profesionales
- Crear CVs actualizados rápidamente
- Mantener múltiples versiones
- Formato profesional reconocido

### Para Estudiantes
- Primer CV con formato académico
- Plantilla estructurada y guiada
- Sin costo ni registro requerido

### Para Reclutadores
- Formato estándar y familiar
- Información bien organizada
- Fácil lectura y evaluación

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Reconocimientos

- Inspirado en formatos profesionales de CV
- Construido con las mejores prácticas de Vue.js 3
- Diseño responsive con CSS3 personalizado y variables CSS

---

**¿Necesitas ayuda?** Abre un [issue](https://github.com/tu-usuario/cv-al-instante/issues) o contacta al equipo de desarrollo.

**⭐ ¡No olvides dar una estrella al proyecto si te resulta útil!**
