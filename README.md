# 📋 CvAlInstante

Una aplicación web moderna para crear currículums vitae profesionales de forma rápida e instantánea. Construida con Vue.js 3 y diseñada para ofrecer una experiencia de usuario excepcional.

🌐 **[Ver Demo en Vivo](https://rohmedina.github.io/cvalinstante/)**

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.18-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.3-FFD859?style=flat-square&logo=pinia&logoColor=black)
![SEO](https://img.shields.io/badge/SEO-Optimized-00C851?style=flat-square&logo=google&logoColor=white)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)

## 📑 Tabla de Contenidos

- [✨ Características](#-características)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [🆕 Últimas Actualizaciones](#-últimas-actualizaciones)
- [🏗️ Tecnologías](#️-tecnologías)
- [📱 Compatibilidad](#-compatibilidad)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

## ✨ Características

### 🎯 **Funcionalidades Principales**
- **📝 Editor Completo**: Todas las secciones estándar de un CV profesional
- **👁️ Vista Previa en Tiempo Real**: Visualiza cambios instantáneamente
- **💾 Guardado Automático**: Datos persistentes en el navegador
- **📱 Diseño Responsive**: Optimizado para desktop y móvil
- **📄 Exportación PDF**: Genera PDFs profesionales con validación inteligente
- **🌙 Modo Oscuro**: Paleta crema elegante y profesional
- **🚀 SEO Optimizado**: Meta tags, Open Graph y Schema.org
- **♿ Accesible**: Cumple estándares WCAG 2.1

### 📋 **Secciones del CV**
- ✅ Información Personal (contacto, redes sociales)
- ✅ Resumen Profesional
- ✅ Experiencia Laboral
- ✅ Educación
- ✅ Habilidades Técnicas
- ✅ Certificaciones
- ✅ Información Adicional

### 🎨 **Experiencia de Usuario**
- Sistema de notificaciones con toasts responsive
- Modales dinámicos que se adaptan al contenido
- Validación inteligente para exportación PDF
- Confirmaciones elegantes para acciones críticas
- Feedback visual inmediato

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación Local

```bash
# 1. Clona el repositorio
git clone https://github.com/rohmedina/cv-harvard-vue.git
cd cv-harvard-vue

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev

# 4. Abre tu navegador en http://localhost:5173
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa de la build
```

## 🆕 Últimas Actualizaciones

### 📄 **Sistema de Exportación PDF Mejorado**
- Validación previa de campos obligatorios
- Mensajes contextuales para éxito, error y validación
- Manejo robusto de errores durante la exportación

### 🌙 **Modo Oscuro Rediseñado**
- Paleta crema cálida (#f7f3e9) para mejor legibilidad
- Esquema de colores profesionales sin degradados
- Contraste optimizado para uso prolongado

### 🎨 **Mejoras de Diseño**
- Eliminación de degradados para diseño más limpio
- Botones rediseñados con estilos simplificados
- Paleta de colores unificada en toda la aplicación

## 🏗️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue.js** | 3.5.18 | Framework principal |
| **Vite** | 7.1.2 | Build tool y dev server |
| **Pinia** | 3.0.3 | Gestión de estado |
| **jsPDF** | 2.5.1 | Generación de PDFs |
| **CSS3** | Personalizado | Estilos responsive |

### Arquitectura del Proyecto
```
src/
├── components/          # Componentes reutilizables
├── composables/        # Lógica reutilizable (toasts, validación)
├── stores/             # Gestión de estado con Pinia
├── utils/              # Utilidades y configuraciones
└── App.vue            # Componente principal
```

## 🌐 Despliegue

### GitHub Pages (Automático)
- **URL**: https://rohmedina.github.io/cvalinstante/
- **CI/CD**: GitHub Actions en cada push a `main`
- **Configuración**: `.github/workflows/deploy.yml`

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome 88+ ✅
- Firefox 85+ ✅  
- Safari 14+ ✅
- Edge 88+ ✅

### Características Responsive
- **Desktop**: Layout de dos paneles con navegación lateral
- **Móvil**: Layout apilado vertical optimizado
- **Toasts**: Posicionamiento adaptativo según dispositivo

## 🎯 Casos de Uso

### 👨‍💼 Para Profesionales
- Crear CVs actualizados rápidamente
- Mantener múltiples versiones
- Formato profesional reconocido

### 🎓 Para Estudiantes  
- Primer CV con formato académico
- Plantilla estructurada y guiada
- Sin costo ni registro requerido

### 🏢 Para Reclutadores
- Formato estándar y familiar
- Información bien organizada
- Fácil lectura y evaluación

## 🚀 Optimización Web

### SEO y Rendimiento
- Meta tags completos y Open Graph
- Sitemap XML y robots.txt
- Preload de fuentes y lazy loading
- Bundle splitting automático

### Accesibilidad
- Cumplimiento WCAG 2.1
- Navegación por teclado completa
- Compatible con lectores de pantalla
- Contraste de colores optimizado

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**¿Necesitas ayuda?** Abre un [issue](https://github.com/rohmedina/cv-harvard-vue/issues) o contacta al equipo.

**⭐ ¡Dale una estrella si te resulta útil!**
