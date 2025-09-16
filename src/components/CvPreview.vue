<template>
  <div class="cv-container">
    <!-- Header con nombre y contacto -->
    <div class="header-section">
      <h1 class="cv-name" style="font-size: var(--cv-name-size);">
        {{ personal?.name || 'Nombre Completo' }}
      </h1>
      <div class="contact-info" style="font-size: var(--cv-contact-size);">
        <div v-if="personal?.phone" class="contact-item">
          <span class="contact-icon">📞</span>
          <span>{{ personal.phone }}</span>
        </div>
        <div v-if="personal?.email" class="contact-item">
          <span class="contact-icon">✉️</span>
          <span>{{ personal.email }}</span>
        </div>
        <div v-if="personal?.address" class="contact-item">
          <span class="contact-icon">📍</span>
          <span>{{ personal.address }}</span>
        </div>
        <div v-if="personal?.linkedin" class="contact-item">
          <span class="contact-icon">🔗</span>
          <a :href="personal.linkedin" target="_blank" class="contact-link">LinkedIn</a>
        </div>
        <div v-if="personal?.website" class="contact-item">
          <span class="contact-icon">🌐</span>
          <a :href="personal.website" target="_blank" class="contact-link">Sitio Web</a>
        </div>
        <div v-if="personal?.github" class="contact-item">
          <span class="contact-icon">👨‍💻</span>
          <a :href="personal.github" target="_blank" class="contact-link">GitHub</a>
        </div>
      </div>
    </div>
    
    <!-- Línea divisoria -->
    <div class="divider"></div>

    <!-- Resumen Profesional -->
    <div v-if="professionalSummary" class="section">
      <h2 class="section-title" style="font-size: var(--cv-section-title-size);">
        RESUMEN PROFESIONAL
      </h2>
      <p class="section-text" style="font-size: var(--cv-text-size);">
        {{ professionalSummary }}
      </p>
    </div>

    <!-- Experiencia Laboral -->
    <div v-if="workExperience?.length" class="section">
      <h2 class="section-title" style="font-size: var(--cv-section-title-size);">
        EXPERIENCIA LABORAL
      </h2>
      <div v-for="(job, i) in workExperience" :key="i" class="job-item">
        <div class="job-header">
          <div class="job-info">
            <h3 class="job-title" style="font-size: var(--cv-text-size);">{{ job.position }} • {{ job.company }}</h3>
          </div>
          <div class="job-date" style="font-size: var(--cv-date-size);">
            {{ job.startDate }} - {{ job.endDate }}
          </div>
        </div>
        <div class="job-description">
          <div v-for="(line, index) in job.description.split('\n').filter(line => line.trim())" :key="index" class="job-line">
            <span class="job-bullet" style="font-size: var(--cv-text-size);">•</span>
            <span class="job-text" style="font-size: var(--cv-text-size);">{{ line.trim() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Educación -->
    <div v-if="education?.length" class="section">
      <h2 class="section-title" style="font-size: var(--cv-section-title-size);">
        EDUCACIÓN
      </h2>
      <div v-for="(edu, index) in education" :key="index" class="education-item">
        <div class="education-header">
          <div>
            <h3 class="education-degree" style="font-size: var(--cv-text-size);">{{ edu.degree }}</h3>
            <p class="education-institution" style="font-size: var(--cv-text-size);">{{ edu.institution }}</p>
          </div>
          <span class="education-year" style="font-size: var(--cv-date-size);">
            {{ edu.year }}
          </span>
        </div>
        <p v-if="edu.description" class="education-description" style="font-size: var(--cv-text-size);">{{ edu.description }}</p>
      </div>
    </div>

    <!-- Habilidades Técnicas -->
    <div v-if="technicalSkills?.length" class="section">
      <h2 class="section-title" style="font-size: var(--cv-section-title-size);">
        HABILIDADES
      </h2>
      <div class="skills-container">
        <div v-for="(skillGroup, idx) in technicalSkills" :key="idx" class="skill-group">
          <!-- Categoría Principal -->
          <h3 class="skill-category" style="font-size: var(--cv-text-size);">
            • {{ skillGroup.category }}:
          </h3>
          
          <!-- Subcategorías -->
          <div class="skill-subcategories">
            <div v-for="(subcategory, subIdx) in parseSubcategories(skillGroup.subcategories)" :key="subIdx">
              <!-- Si tiene subcategoría específica -->
              <div v-if="subcategory.name" class="skill-item" style="font-size: var(--cv-text-size);">
                <span class="skill-name">• {{ subcategory.name }}:</span>
                <span class="skill-list">{{ subcategory.skills.join(', ') }}</span>
              </div>
              
              <!-- Si es una habilidad directa sin subcategoría -->
              <div v-else class="skill-item" style="font-size: var(--cv-text-size);">
                <span>• {{ subcategory.skills.join(', ') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificaciones -->
    <div v-if="certifications?.length" class="section">
      <h2 class="section-title" style="font-size: var(--cv-section-title-size);">
        CERTIFICACIONES
      </h2>
      <div class="certifications-container">
        <div v-for="(cert, idx) in certifications" :key="idx">
          <div class="certification-item">
            <div>
              <h3 class="certification-name" style="font-size: var(--cv-text-size);">{{ cert.name }}</h3>
              <p class="certification-issuer" style="font-size: var(--cv-text-size);">{{ cert.issuer }}</p>
            </div>
            <span class="certification-date" style="font-size: var(--cv-date-size);">{{ cert.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Información Adicional -->
    <div v-if="additionalInfo" class="section">
      <h2 class="section-title" style="font-size: var(--cv-section-title-size);">
        INFORMACIÓN ADICIONAL
      </h2>
      <p class="section-text" style="font-size: var(--cv-text-size);">
        {{ additionalInfo }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useCvStore } from "../stores/cv";
import { jsPDF } from "jspdf";

const cvStore = useCvStore();

// Listener para el evento de exportar PDF
const handleExportPdf = () => {
  exportPdf()
}

onMounted(() => {
  window.addEventListener('export-pdf', handleExportPdf)
})

onUnmounted(() => {
  window.removeEventListener('export-pdf', handleExportPdf)
})

// Usar computed para mantener reactividad
const personal = computed(() => cvStore.cvData.personalInfo);
const professionalSummary = computed(() => cvStore.cvData.professionalSummary);
const workExperience = computed(() => cvStore.cvData.workExperience);
const education = computed(() => cvStore.cvData.education);
const technicalSkills = computed(() => cvStore.cvData.technicalSkills);
const languages = computed(() => cvStore.cvData.languages);
const certifications = computed(() => cvStore.cvData.certifications);
const additionalInfo = computed(() => cvStore.cvData.additionalInfo);

// Función para parsear subcategorías
function parseSubcategories(subcategoriesText) {
  if (!subcategoriesText) return [];
  
  const lines = subcategoriesText.split('\n').filter(line => line.trim());
  const result = [];
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.includes(':')) {
      // Es una subcategoría con habilidades
      const [name, skillsText] = trimmedLine.split(':');
      const skills = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
      result.push({
        name: name.trim(),
        skills: skills
      });
    } else {
      // Es una habilidad directa sin subcategoría
      result.push({
        name: null,
        skills: [trimmedLine]
      });
    }
  });
  
  return result;
}

function addSection(
  doc,
  title,
  contentLines,
  currentY,
  marginLeft,
  pageWidth,
  lineHeight
) {
  // Calcular el espacio total necesario para toda la sección
  const totalSectionHeight = 8 + (contentLines.length * lineHeight) + 8; // título + contenido + espaciado
  
  // Si la sección completa no cabe en la página actual, mover a la siguiente
  if (currentY + totalSectionHeight > 260) {
    doc.addPage();
    currentY = 25;
  }
  
  // Título de sección con estilo similar al CSS
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60);
  doc.text(title, marginLeft, currentY);
  
  // Línea debajo del título (similar al border-bottom del CSS)
  const titleWidth = doc.getTextWidth(title);
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(marginLeft, currentY + 2, marginLeft + titleWidth + 15, currentY + 2);
  
  currentY += 8;
  
  // Contenido con estilo similar al CSS
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);
  
  // Ahora podemos escribir todas las líneas sin verificar espacio individual
  // porque ya sabemos que toda la sección cabe
  contentLines.forEach((line) => {
    doc.text(line, marginLeft, currentY);
    currentY += lineHeight;
  });
  
  // Solo agregar espaciado entre secciones si hay contenido
  if (contentLines.length > 0) {
    currentY += 8;
  }
  return currentY;
}

function exportPdf() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const marginLeft = 25;
  const pageWidth = 210;
  const lineHeight = 6;
  let currentY = 25;
  
  // Configurar fuente por defecto para que coincida con Inter
  doc.setFont("helvetica", "normal");

  // Nombre centrado arriba con estilo similar al CSS
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60); // Color similar al CSS
  doc.text(personal.value?.name?.toUpperCase() || "NOMBRE APELLIDO", pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 8;

  // Información de contacto centrada en formato horizontal con símbolos compatibles
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128); // Color gris similar al CSS
  
  // Crear array con información de contacto usando símbolos compatibles con PDF
  const contactInfo = [];
  if (personal.value?.phone) contactInfo.push(`Tel: ${personal.value.phone}`);
  if (personal.value?.email) contactInfo.push(`Email: ${personal.value.email}`);
  if (personal.value?.address) contactInfo.push(`Ubicacion: ${personal.value.address}`);
  
  // Agregar enlaces como hipervínculos con texto simple
  const links = [];
  if (personal.value?.linkedin) links.push({ text: 'LinkedIn', url: personal.value.linkedin });
  if (personal.value?.website) links.push({ text: 'Web', url: personal.value.website });
  if (personal.value?.github) links.push({ text: 'GitHub', url: personal.value.github });
  
  // Mostrar toda la información en una línea horizontal
  if (contactInfo.length > 0 || links.length > 0) {
    // Crear línea de contacto con información básica
    const contactLine = contactInfo.join(" | ");
    
    // Agregar enlaces como hipervínculos
    if (links.length > 0) {
      const linkTexts = links.map(link => link.text).join(" | ");
      const fullLine = contactInfo.length > 0 ? `${contactLine} | ${linkTexts}` : linkTexts;
      
      // Renderizar texto completo
      doc.text(fullLine, pageWidth / 2, currentY, { align: "center" });
      
      // Agregar hipervínculos clickeables
      const textWidth = doc.getTextWidth(fullLine);
      const startX = (pageWidth - textWidth) / 2;
      let currentX = startX;
      
      // Calcular posición de cada enlace
      if (contactInfo.length > 0) {
        currentX += doc.getTextWidth(contactLine + " | ");
      }
      
      links.forEach((link, index) => {
        const linkWidth = doc.getTextWidth(link.text);
        doc.link(currentX, currentY - 3, linkWidth, 6, { url: link.url });
        currentX += linkWidth;
        if (index < links.length - 1) {
          currentX += doc.getTextWidth(" | ");
        }
      });
    } else {
      doc.text(contactLine, pageWidth / 2, currentY, { align: "center" });
    }
    
    currentY += 10;
  }
  
  currentY += 5;

  // Línea divisoria con estilo similar al CSS
  doc.setDrawColor(209, 213, 219); // Color gris claro similar al CSS
  doc.setLineWidth(0.3);
  doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  currentY += 10;

  // Secciones del CV usando addSection helper - solo si tienen contenido
  if (professionalSummary.value && professionalSummary.value.trim()) {
    currentY = addSection(
      doc,
      "RESUMEN PROFESIONAL",
      doc.splitTextToSize(
        professionalSummary.value,
        pageWidth - marginLeft * 2
      ),
      currentY,
      marginLeft,
      pageWidth,
      lineHeight
    );
  }

  // Experiencia laboral con formato mejorado
  if (workExperience.value?.length) {
    currentY = addSection(
      doc,
      "EXPERIENCIA LABORAL",
      [],
      currentY,
      marginLeft,
      pageWidth,
      lineHeight
    );
    
    workExperience.value.forEach((job) => {
      currentY = addJobExperience(
        doc,
        job,
        currentY,
        marginLeft,
        pageWidth,
        lineHeight
      );
    });
  }

function addJobExperience(
  doc,
  job,
  currentY,
  marginLeft,
  pageWidth,
  lineHeight
) {
  // Calcular el espacio total necesario para todo el bloque de experiencia laboral
  const descriptionLines = job.description.split('\n').filter(line => line.trim());
  
  // Calcular líneas totales considerando el wrapping de texto
  let totalLines = 0;
  descriptionLines.forEach(line => {
    const wrappedLines = doc.splitTextToSize(line.trim(), pageWidth - marginLeft * 2 - 4); // -4 para el espacio del bullet
    totalLines += wrappedLines.length;
  });
  
  const totalJobHeight = 5 + 1 + (totalLines * lineHeight) + 6; // título + espaciado + descripción + espaciado final
  
  // Si el bloque completo no cabe en la página actual, mover a la siguiente
  if (currentY + totalJobHeight > 260) {
    doc.addPage();
    currentY = 25;
  }
  
  // Título del trabajo con formato similar al CSS (position • company)
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60);
  doc.text(`${job.position} • ${job.company}`, marginLeft, currentY);
  currentY += 5;
  
  // Fechas alineadas a la derecha con estilo similar al CSS
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  const dateText = `${job.startDate} - ${job.endDate}`;
  const dateWidth = doc.getTextWidth(dateText);
  doc.text(dateText, pageWidth - marginLeft - dateWidth, currentY - 5); // Alinear a la derecha en la misma línea del título
  currentY += 1; // Pequeño espaciado adicional
  
  // Descripción con bullets como en el CSS
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);
  
  descriptionLines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      // Dividir el texto en líneas que caben en el ancho disponible
      const wrappedLines = doc.splitTextToSize(trimmedLine, pageWidth - marginLeft * 2 - 4); // -4 para el espacio del bullet
      
      wrappedLines.forEach((wrappedLine, index) => {
        if (index === 0) {
          // Primera línea con bullet
          doc.text("•", marginLeft, currentY);
          doc.text(wrappedLine, marginLeft + 4, currentY);
        } else {
          // Líneas siguientes con indentación sin bullet
          doc.text(wrappedLine, marginLeft + 4, currentY);
        }
        currentY += lineHeight;
      });
    }
  });
  
  // Espaciado entre trabajos similar al CSS (1.5rem = ~10mm)
  currentY += 6;
  return currentY;
}

  // Educación con formato mejorado
  if (education.value?.length) {
    currentY = addSection(
      doc,
      "EDUCACIÓN",
      [],
      currentY,
      marginLeft,
      pageWidth,
      lineHeight
    );
    
    education.value.forEach((edu) => {
      currentY = addEducationItem(
        doc,
        edu,
        currentY,
        marginLeft,
        pageWidth,
        lineHeight
      );
    });
  }

function addEducationItem(
  doc,
  edu,
  currentY,
  marginLeft,
  pageWidth,
  lineHeight
) {
  // Calcular el espacio total necesario para todo el bloque de educación
  const totalEducationHeight = 5 + 6 + 4; // título + institución/año + espaciado
  
  // Si el bloque completo no cabe en la página actual, mover a la siguiente
  if (currentY + totalEducationHeight > 260) {
    doc.addPage();
    currentY = 25;
  }
  
  // Título de la educación con estilo similar al CSS
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60);
  doc.text(edu.degree, marginLeft, currentY);
  currentY += 5;
  
  // Institución y fechas con estilo similar al CSS
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text(`${edu.institution} | ${edu.year}`, marginLeft, currentY);
  currentY += 6;
  
  // Espaciado entre elementos de educación
  currentY += 4;
  return currentY;
}

  // Formatear habilidades técnicas correctamente - solo si hay contenido
  if (technicalSkills.value?.length) {
    const formatTechnicalSkills = technicalSkills.value
      .map((skillGroup) => {
        let result = `• ${skillGroup.category}:\n`;
        
        // Parsear subcategorías
        const subcategories = parseSubcategories(skillGroup.subcategories);
        subcategories.forEach((subcategory) => {
          if (subcategory.name) {
            // Subcategoría con nombre específico
            result += `  • ${subcategory.name}: ${subcategory.skills.join(', ')}\n`;
          } else {
            // Habilidades directas sin subcategoría
            result += `  • ${subcategory.skills.join(', ')}\n`;
          }
        });
        
        return result;
      })
      .join('\n');
      
    currentY = addSection(
      doc,
      "HABILIDADES TÉCNICAS",
      doc.splitTextToSize(formatTechnicalSkills, pageWidth - marginLeft * 2),
      currentY,
      marginLeft,
      pageWidth,
      lineHeight
    );
  }

  // Certificaciones - solo si hay contenido
  if (certifications.value?.length) {
    const formatCerts = certifications.value
      .map((c) => `${c.name} - ${c.issuer} (${c.date})`)
      .join("\n");
    currentY = addSection(
      doc,
      "CERTIFICACIONES",
      doc.splitTextToSize(formatCerts, pageWidth - marginLeft * 2),
      currentY,
      marginLeft,
      pageWidth,
      lineHeight
    );
  }

  // Información adicional - solo si hay contenido
  if (additionalInfo.value && additionalInfo.value.trim()) {
    currentY = addSection(
      doc,
      "INFORMACIÓN ADICIONAL",
      doc.splitTextToSize(
        additionalInfo.value,
        pageWidth - marginLeft * 2
      ),
      currentY,
      marginLeft,
      pageWidth,
      lineHeight
    );
  }

  doc.save(`CV-${(personal.value?.name || "CV").replace(/\s+/g, "_")}.pdf`);
}
</script>

<style scoped>
/* Contenedor principal del CV */
.cv-container {
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 56rem;
  margin: 0 auto;
}

/* Estilos para impresión */
@media print {
  .cv-container {
    box-shadow: none;
    border-radius: 0;
  }
}

/* Header section */
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.cv-name {
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--cv-name-color);
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  color: var(--cv-contact-color);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.contact-icon {
  color: #9ca3af;
}

.contact-link {
  color: var(--cv-name-color);
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

/* Línea divisoria */
.divider {
  border-top: 1px solid #d1d5db;
  margin-bottom: 2rem;
}

/* Secciones generales */
.section {
  margin-bottom: 2rem;
}

.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  color: var(--cv-section-color);
}

.section-text {
  line-height: 1.625;
  text-align: justify;
  color: var(--cv-text-color);
  white-space: pre-line;
}

/* Experiencia laboral */
.job-item {
  margin-bottom: 1.5rem;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.job-info {
  flex: 1;
}

.job-title {
  font-weight: bold;
  color: var(--cv-text-color);
  margin-bottom: 0;
}

.job-date {
  text-align: right;
  color: var(--cv-date-color);
  margin-left: 1rem;
}

.job-description {
  margin-top: 0.5rem;
}

.job-line {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.job-bullet {
  color: var(--cv-text-color);
  margin-right: 0.5rem;
}

.job-text {
  color: var(--cv-text-color);
  line-height: 1.625;
}

/* Estilos para impresión de experiencia laboral */
@media print {
  .job-line {
    display: block;
  }
  
  .job-bullet {
    display: none;
  }
  
  .job-text {
    display: inline;
  }
}

/* Educación */
.education-item {
  margin-bottom: 1rem;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.education-degree {
  font-weight: 600;
  color: var(--cv-text-color);
}

.education-institution {
  color: var(--cv-text-color);
}

.education-year {
  color: var(--cv-date-color);
  background-color: var(--cv-skills-bg);
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
}

.education-description {
  color: var(--cv-text-color);
  white-space: pre-line;
}

/* Habilidades */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-group {
  margin-bottom: 1rem;
}

.skill-category {
  font-weight: 600;
  color: var(--cv-text-color);
  margin-bottom: 0.5rem;
}

.skill-subcategories {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skill-item {
  color: var(--cv-text-color);
}

.skill-name {
  font-weight: 500;
}

.skill-list {
  margin-left: 0.25rem;
}

/* Certificaciones */
.certifications-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.certification-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.certification-name {
  font-weight: 600;
  color: var(--cv-text-color);
}

.certification-issuer {
  color: var(--cv-text-color);
}

.certification-date {
  color: var(--cv-date-color);
}

/* Responsive design */
@media (max-width: 768px) {
  .cv-container {
    padding: 1rem;
    margin: 0.5rem;
  }
  
  .contact-info {
    gap: 1rem;
    flex-direction: column;
  }
  
  .job-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .job-date {
    text-align: left;
    margin-left: 0;
  }
  
  .education-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .certification-item {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .cv-container {
    padding: 0.75rem;
  }
  
  .contact-info {
    gap: 0.75rem;
  }
  
  .section {
    margin-bottom: 1.5rem;
  }
}
</style>
