import {defineStore} from 'pinia'
import {reactive, watch} from 'vue'

export const useCvStore = defineStore('cv', () => {
    const STORAGE_KEY = 'cv_data'
    const EXPIRY_DAYS = 3
    
    // Funciones de localStorage
    function saveToLocalStorage(data) {
        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS)
        
        const storageData = {
            data: data,
            expiry: expiryDate.getTime()
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
    }
    
    function loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (!stored) return null
            
            const storageData = JSON.parse(stored)
            const now = new Date().getTime()
            
            // Verificar si los datos han expirado
            if (now > storageData.expiry) {
                localStorage.removeItem(STORAGE_KEY)
                return null
            }
            
            return storageData.data
        } catch (error) {
            console.error('Error al cargar datos del localStorage:', error)
            localStorage.removeItem(STORAGE_KEY)
            return null
        }
    }
    
    function clearExpiredData() {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const storageData = JSON.parse(stored)
                const now = new Date().getTime()
                
                if (now > storageData.expiry) {
                    localStorage.removeItem(STORAGE_KEY)
                }
            } catch (error) {
                localStorage.removeItem(STORAGE_KEY)
            }
        }
    }
    
    // Cargar datos iniciales desde localStorage
    const savedData = loadFromLocalStorage()
    
    const cvData = reactive(savedData || {
        personalInfo: {
            name: '',
            phone: '',
            email: '',
            address: '',
            linkedin: '',
            website: '',
            github: '',
        },
        professionalSummary: '',
        workExperience: [],
        education: [],
        technicalSkills: [],
        languages: [],
        certifications: [],
        additionalInfo: '',
    })

    function setPersonalInfo(data) {
        Object.assign(cvData.personalInfo, data)
    }

    function setProfessionalSummary(summary) {
        cvData.professionalSummary = summary
    }

    function addWorkExperience(experience) {
        cvData.workExperience.push(experience)
    }

    function setWorkExperience(experiences) {
        cvData.workExperience = experiences
    }

    function addEducation(educationItem) {
        cvData.education.push(educationItem)
    }

    function setEducation(educationItems) {
        cvData.education = educationItems
    }

    function addTechnicalSkills(skills) {
        cvData.technicalSkills.push(skills)
    }

    function setTechnicalSkills(skills) {
        cvData.technicalSkills = skills
    }           

    function addLanguages(languages) {
        cvData.languages.push(languages)
    }

    function setLanguages(languages) {
        cvData.languages = languages
    }

    function addCertifications(certification) {
        cvData.certifications.push(certification)
    }

    function setCertifications(certifications) {
        cvData.certifications = certifications
    }

    function setAdditionalInfo(info) {
        cvData.additionalInfo = info
    }

    // Método genérico para actualizar cualquier sección
    function updateSection(sectionName, data) {
        switch(sectionName) {
            case 'personalInfo':
                setPersonalInfo(data)
                break
            case 'professionalSummary':
                setProfessionalSummary(data.summary || data)
                break
            case 'workExperience':
                setWorkExperience(data)
                break
            case 'education':
                setEducation(data)
                break
            case 'skills':
                setTechnicalSkills(data)
                break
            case 'technicalSkills':
                setTechnicalSkills(data)
                break
            case 'languages':
                setLanguages(data)
                break
            case 'certifications':
                setCertifications(data)
                break
            case 'additionalInfo':
                setAdditionalInfo(data.info || data)
                break
            default:
                console.warn(`Sección desconocida: ${sectionName}`)
        }
    }
    
    // Watcher para guardar automáticamente en localStorage
    watch(cvData, (newData) => {
        saveToLocalStorage(newData)
    }, { deep: true })
    
    // Limpiar datos expirados al inicializar
    clearExpiredData()

    return {
        cvData, 
        setPersonalInfo, 
        setProfessionalSummary, 
        addWorkExperience, 
        setWorkExperience,
        addEducation, 
        setEducation,
        addTechnicalSkills, 
        setTechnicalSkills,
        addLanguages, 
        setLanguages,
        addCertifications, 
        setCertifications,
        setAdditionalInfo,
        updateSection,
        saveToLocalStorage,
        loadFromLocalStorage,
        clearExpiredData
    }
})