<template>
  <div class="bg-white shadow-lg rounded-lg p-8 min-h-full max-w-4xl mx-auto print:shadow-none print:rounded-none">
    <!-- Header con nombre y contacto -->
    <div class="text-center mb-8">
      <h1 class="font-bold mb-4 uppercase tracking-wider text-cv-name" style="font-size: var(--cv-name-size);">
        {{ personal?.name || 'Nombre Completo' }}
      </h1>
      <div class="flex flex-wrap justify-center items-center gap-6 text-cv-contact" style="font-size: var(--cv-contact-size);">
        <div v-if="personal?.phone" class="flex items-center gap-1">
          <span class="text-gray-400">📞</span>
          <span>{{ personal.phone }}</span>
        </div>
        <div v-if="personal?.email" class="flex items-center gap-1">
          <span class="text-gray-400">✉️</span>
          <span>{{ personal.email }}</span>
        </div>
        <div v-if="personal?.address" class="flex items-center gap-1">
          <span class="text-gray-400">📍</span>
          <span>{{ personal.address }}</span>
        </div>
        <div v-if="personal?.linkedin" class="flex items-center gap-1">
          <span class="text-gray-400">🔗</span>
          <a :href="personal.linkedin" target="_blank" class="text-cv-name hover:underline">LinkedIn</a>
        </div>
        <div v-if="personal?.website" class="flex items-center gap-1">
          <span class="text-gray-400">🌐</span>
          <a :href="personal.website" target="_blank" class="text-cv-name hover:underline">Sitio Web</a>
        </div>
        <div v-if="personal?.github" class="flex items-center gap-1">
          <span class="text-gray-400">👨‍💻</span>
          <a :href="personal.github" target="_blank" class="text-cv-name hover:underline">GitHub</a>
        </div>
      </div>
    </div>
    
    <!-- Línea divisoria -->
    <div class="border-t border-gray-300 mb-8"></div>

    <!-- Resumen Profesional -->
    <div v-if="professionalSummary" class="mb-8">
      <h2 class="font-bold mb-4 uppercase tracking-wide border-b border-gray-200 pb-2 text-cv-section" style="font-size: var(--cv-section-title-size);">
        RESUMEN PROFESIONAL
      </h2>
      <p class="leading-relaxed text-justify text-cv-text whitespace-pre-line" style="font-size: var(--cv-text-size);">
        {{ professionalSummary }}
      </p>
    </div>

    <!-- Experiencia Laboral -->
    <div v-if="workExperience?.length" class="mb-8">
      <h2 class="font-bold mb-4 uppercase tracking-wide border-b border-gray-200 pb-2 text-cv-section" style="font-size: var(--cv-section-title-size);">
        EXPERIENCIA LABORAL
      </h2>
      <div v-for="(job, i) in workExperience" :key="i" class="mb-6">
        <div class="flex justify-between items-start mb-1">
          <div class="flex-1">
            <h3 class="font-bold text-cv-text mb-0" style="font-size: var(--cv-text-size);">{{ job.position }} • {{ job.company }}</h3>
          </div>
          <div class="text-right text-cv-date ml-4" style="font-size: var(--cv-date-size);">
            {{ job.startDate }} - {{ job.endDate }}
          </div>
        </div>
        <div class="mt-2">
          <div v-for="(line, index) in job.description.split('\n').filter(line => line.trim())" :key="index" class="flex items-start mb-1 print:block">
            <span class="text-cv-text mr-2 print:hidden" style="font-size: var(--cv-text-size);">•</span>
            <span class="text-cv-text leading-relaxed print:inline" style="font-size: var(--cv-text-size);">{{ line.trim() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Educación -->
    <div v-if="education?.length" class="mb-8">
      <h2 class="font-bold mb-4 uppercase tracking-wide border-b border-gray-200 pb-2 text-cv-section" style="font-size: var(--cv-section-title-size);">
        EDUCACIÓN
      </h2>
      <div v-for="(edu, index) in education" :key="index" class="mb-4">
        <div class="flex justify-between items-start mb-1">
          <div>
            <h3 class="font-semibold text-cv-text" style="font-size: var(--cv-text-size);">{{ edu.degree }}</h3>
            <p class="text-cv-text" style="font-size: var(--cv-text-size);">{{ edu.institution }}</p>
          </div>
          <span class="text-cv-date bg-cv-skills px-3 py-1 rounded" style="font-size: var(--cv-date-size);">
            {{ edu.year }}
          </span>
        </div>
        <p v-if="edu.description" class="text-cv-text whitespace-pre-line" style="font-size: var(--cv-text-size);">{{ edu.description }}</p>
      </div>
    </div>

    <!-- Habilidades Técnicas -->
    <div v-if="technicalSkills?.length" class="mb-8">
      <h2 class="font-bold mb-4 uppercase tracking-wide border-b border-gray-200 pb-2 text-cv-section" style="font-size: var(--cv-section-title-size);">
        HABILIDADES
      </h2>
      <div class="space-y-3">
        <div v-for="(skillGroup, idx) in technicalSkills" :key="idx" class="mb-4">
          <!-- Categoría Principal -->
          <h3 class="font-semibold text-cv-text mb-2" style="font-size: var(--cv-text-size);">
            • {{ skillGroup.category }}:
          </h3>
          
          <!-- Subcategorías -->
          <div class="ml-4 space-y-1">
            <div v-for="(subcategory, subIdx) in parseSubcategories(skillGroup.subcategories)" :key="subIdx">
              <!-- Si tiene subcategoría específica -->
              <div v-if="subcategory.name" class="text-cv-text" style="font-size: var(--cv-text-size);">
                <span class="font-medium">• {{ subcategory.name }}:</span>
                <span class="ml-1">{{ subcategory.skills.join(', ') }}</span>
              </div>
              
              <!-- Si es una habilidad directa sin subcategoría -->
              <div v-else class="text-cv-text" style="font-size: var(--cv-text-size);">
                <span>• {{ subcategory.skills.join(', ') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificaciones -->
    <div v-if="certifications?.length" class="mb-8">
      <h2 class="font-bold mb-4 uppercase tracking-wide border-b border-gray-200 pb-2 text-cv-section" style="font-size: var(--cv-section-title-size);">
        CERTIFICACIONES
      </h2>
      <div class="space-y-3">
        <div v-for="(cert, idx) in certifications" :key="idx">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-cv-text" style="font-size: var(--cv-text-size);">{{ cert.name }}</h3>
              <p class="text-cv-text" style="font-size: var(--cv-text-size);">{{ cert.issuer }}</p>
            </div>
            <span class="text-cv-date" style="font-size: var(--cv-date-size);">{{ cert.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Información Adicional -->
    <div v-if="additionalInfo" class="mb-8">
      <h2 class="font-bold mb-4 uppercase tracking-wide border-b border-gray-200 pb-2 text-cv-section" style="font-size: var(--cv-section-title-size);">
        INFORMACIÓN ADICIONAL
      </h2>
      <p class="leading-relaxed text-justify text-cv-text whitespace-pre-line" style="font-size: var(--cv-text-size);">
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
  if (currentY > 270) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.setTextColor(41, 128, 185); // Azul para títulos
  doc.text(title, marginLeft, currentY);
  currentY += lineHeight + 2;
  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.setTextColor(60, 60, 60);
  contentLines.forEach((line) => {
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
    doc.text(line, marginLeft, currentY);
    currentY += lineHeight;
  });
  currentY += lineHeight;
  return currentY;
}

function exportPdf() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const marginLeft = 25;
  const pageWidth = 210;
  const lineHeight = 6;
  let currentY = 25;

  // Nombre centrado arriba en azul
  doc.setFontSize(24);
  doc.setFont(undefined, "bold");
  doc.setTextColor(41, 128, 185); // Azul
  doc.text(personal.value?.name?.toUpperCase() || "NOMBRE APELLIDO", pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 12;

  // Información de contacto centrada en formato horizontal
  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.setTextColor(80, 80, 80);
  
  // Crear array con información de contacto
  const contactInfo = [];
  if (personal.value?.phone) contactInfo.push(`Tel: ${personal.value.phone}`);
  if (personal.value?.email) contactInfo.push(`Email: ${personal.value.email}`);
  if (personal.value?.address) contactInfo.push(`Ubicacion: ${personal.value.address}`);
  
  // Agregar enlaces como hipervínculos para ahorrar espacio
  const links = [];
  if (personal.value?.linkedin) links.push({ text: 'LinkedIn', url: personal.value.linkedin });
  if (personal.value?.website) links.push({ text: 'Web', url: personal.value.website });
  if (personal.value?.github) links.push({ text: 'GitHub', url: personal.value.github });
  
  // Agregar los enlaces al array de contacto
  links.forEach(link => {
    contactInfo.push(link.text);
  });
  
  // Mostrar toda la información en una línea horizontal
  if (contactInfo.length > 0) {
    // Crear línea de contacto con información básica
    const basicInfo = contactInfo.filter(info => !links.some(link => link.text === info));
    const contactLine = basicInfo.join(" | ");
    
    // Agregar enlaces como hipervínculos
    if (links.length > 0) {
      const linkTexts = links.map(link => link.text).join(" | ");
      const fullLine = basicInfo.length > 0 ? `${contactLine} | ${linkTexts}` : linkTexts;
      
      // Renderizar texto completo
      doc.text(fullLine, pageWidth / 2, currentY, { align: "center" });
      
      // Agregar hipervínculos clickeables
      const textWidth = doc.getTextWidth(fullLine);
      const startX = (pageWidth - textWidth) / 2;
      let currentX = startX;
      
      // Calcular posición de cada enlace
      if (basicInfo.length > 0) {
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
    
    currentY += 8;
  }
  
  currentY += 5;

  // Línea divisoria
  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  currentY += lineHeight;

  // Secciones del CV usando addSection helper
  currentY = addSection(
    doc,
    "RESUMEN PROFESIONAL",
    doc.splitTextToSize(
      professionalSummary.value || "No disponible.",
      pageWidth - marginLeft * 2
    ),
    currentY,
    marginLeft,
    pageWidth,
    lineHeight
  );

  const formatWorkExp = workExperience.value?.length
    ? workExperience.value
        .map(
          (w) =>
            `${w.position} en ${w.company} (${w.startDate} - ${w.endDate})\n${w.description}`
        )
        .join("\n\n")
    : "No disponible.";
  currentY = addSection(
    doc,
    "EXPERIENCIA LABORAL",
    doc.splitTextToSize(formatWorkExp, pageWidth - marginLeft * 2),
    currentY,
    marginLeft,
    pageWidth,
    lineHeight
  );

  const formatEducation = education.value?.length
    ? education.value
        .map(
          (e) =>
            `${e.degree} en ${e.institution} (${e.startDate} - ${e.endDate})`
        )
        .join("\n")
    : "No disponible.";
  currentY = addSection(
    doc,
    "EDUCACIÓN",
    doc.splitTextToSize(formatEducation, pageWidth - marginLeft * 2),
    currentY,
    marginLeft,
    pageWidth,
    lineHeight
  );

  currentY = addSection(
    doc,
    "HABILIDADES TÉCNICAS",
    doc.splitTextToSize(
      technicalSkills.value?.join(", ") || "No disponible.",
      pageWidth - marginLeft * 2
    ),
    currentY,
    marginLeft,
    pageWidth,
    lineHeight
  );

  const formatLanguages = languages.value?.length
    ? languages.value.map((l) => `${l.language} - ${l.level}`).join("\n")
    : "No disponible.";
  currentY = addSection(
    doc,
    "IDIOMAS",
    doc.splitTextToSize(formatLanguages, pageWidth - marginLeft * 2),
    currentY,
    marginLeft,
    pageWidth,
    lineHeight
  );

  const formatCerts = certifications.value?.length
    ? certifications.value
        .map((c) => `${c.name} - ${c.issuer} (${c.date})`)
        .join("\n")
    : "No disponible.";
  currentY = addSection(
    doc,
    "CERTIFICACIONES",
    doc.splitTextToSize(formatCerts, pageWidth - marginLeft * 2),
    currentY,
    marginLeft,
    pageWidth,
    lineHeight
  );

  currentY = addSection(
    doc,
    "INFORMACIÓN ADICIONAL",
    doc.splitTextToSize(
      additionalInfo.value || "No disponible.",
      pageWidth - marginLeft * 2
    ),
    currentY,
    marginLeft,
    pageWidth,
    lineHeight
  );

  doc.save(`CV-${(personal.value?.name || "CV").replace(/\s+/g, "_")}.pdf`);
}
</script>
