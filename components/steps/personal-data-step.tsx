"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User, IdCard, Link as LinkIcon, Briefcase, GraduationCap, Zap, Globe, PlusCircle, Trash2, Sparkles, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/LanguageContext"
import { generateCVContent } from "@/lib/groq"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"

/**
 * Interfaz para los enlaces profesionales
 * @interface Link
 * @property {string} id - Identificador único del enlace
 * @property {string} label - Etiqueta del enlace (ej: LinkedIn)
 * @property {string} url - URL completa del enlace
 */
interface Link {
  id: string
  label: string
  url: string
}

/**
 * Interfaz para la experiencia laboral
 * @interface Experience
 * @property {string} id - Identificador único de la experiencia
 * @property {string} role - Cargo o puesto
 * @property {string} company - Nombre de la empresa
 * @property {string} startDate - Fecha de inicio
 * @property {string} endDate - Fecha de finalización
 * @property {string} description - Descripción de las responsabilidades y logros
 */
interface Experience {
  id: string
  role: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  uid: string
  degree: string
  institution: string
  graduationYear: string
}

interface Certification {
  uid: string
  name: string
  institution: string
  date: string
  id?: string
}

interface Language {
  uid: string
  language: string
  level: string
}

interface CVData {
  presentation: string
  fullName: string
  email: string
  phone: string
  city: string
  country: string
  links: Link[]
  objective?: string
  experiences: Experience[]
  educations: Education[]
  certifications: Certification[]
  languages: Language[]
  technicalSkills: string
  showCertifications: boolean
  professionalTitle?: string
  jobDescription?: string
}

interface PersonalDataStepProps {
  value: CVData
  onChange: (data: CVData) => void
  jobDescription?: string
}

/**
 * Componente que maneja el formulario de datos personales del CV
 * Incluye secciones para:
 * - Presentación profesional
 * - Información personal
 * - Enlaces profesionales
 * - Experiencia laboral
 */
export function PersonalDataStep({ value, onChange, jobDescription }: PersonalDataStepProps) {
  const { language } = useLanguage();
  const t = {
    es: {
      presentacion: "Presentación Profesional",
      objetivo: "Objetivo o Presentación Personal",
      objetivoPlaceholder: "Escribe una breve presentación profesional que destaque tus fortalezas y objetivos de carrera...",
      objetivoTip: "Tip: Menciona tu experiencia clave, habilidades principales y lo que buscas en tu próximo rol",
      mejorarIA: "Mejorar con IA",
      infoPersonal: "Información Personal",
      nombre: "Nombre Completo",
      nombrePlaceholder: "Tu nombre completo",
      email: "Email",
      emailPlaceholder: "tu.email@ejemplo.com",
      telefono: "Teléfono",
      telefonoPlaceholder: "+1 (555) 123-4567",
      ciudad: "Ciudad",
      ciudadPlaceholder: "Tu ciudad",
      pais: "País",
      paisPlaceholder: "Tu país",
      enlaces: "Enlaces Profesionales",
      etiqueta: "Etiqueta",
      etiquetaPlaceholder: "Ej: LinkedIn, Portfolio",
      url: "URL",
      urlPlaceholder: "https://...",
      agregarEnlace: "Añadir Enlace",
      eliminar: "Eliminar",
      experiencia: "Experiencia Laboral",
      experienciaN: "Experiencia",
      rol: "Puesto o Cargo",
      rolPlaceholder: "Ej: Desarrollador Frontend",
      empresa: "Empresa",
      empresaPlaceholder: "Ej: Google",
      inicio: "Fecha de Inicio",
      fechaInicioPlaceholder: "Ej: Enero 2022",
      fin: "Fecha de Fin",
      fechaFinPlaceholder: "Presente o fecha",
      descripcion: "Descripción",
      descripcionPlaceholder: "Describe tus responsabilidades y logros principales...",
      agregarExp: "Añadir Experiencia",
      educacion: "Educación",
      estudios: "Estudios",
      estudiosPlaceholder: "Ej: Licenciatura en Ingeniería Informática",
      institucion: "Institución",
      institucionPlaceholder: "Ej: Universidad de Buenos Aires",
      fechaEdu: "Año de finalización",
      habilidades: "Habilidades Técnicas",
      habilidadesPlaceholder: "JavaScript, React, Node.js, Python, SQL...",
      idiomas: "Idiomas",
      idiomasPlaceholder: "Español (Nativo), Inglés (Avanzado)...",
      certificaciones: "Certificaciones",
      certificacionesOpcional: "Certificaciones (opcional)",
      mostrarCertificaciones: "Chequear para incluir",
      nombreCertificacion: "Nombre de la certificación",
      nombreCertificacionPlaceholder: "Ej: AWS Certified Solutions Architect",
      institucionCertificacion: "Institución emisora",
      institucionCertificacionPlaceholder: "Ej: Amazon Web Services",
      fechaCertificacion: "Fecha de obtención",
      fechaCertificacionPlaceholder: "Ej: Marzo 2023",
      idCertificacion: "ID de la certificación",
      idCertificacionPlaceholder: "Ej: AWS-123456",
      idCertificacionOpcional: "ID (opcional)",
      agregarCertificacion: "Añadir certificación",
      eliminarCertificacion: "Eliminar certificación",
      nivel: "Nivel",
      nivelPlaceholder: "Ej: Avanzado, B2, Nativo...",
      tituloProfesional: "Título Profesional",
      tituloProfesionalPlaceholder: "Ej: Ingeniero en Sistemas, Abogado, Diseñador Gráfico...",
    },
    en: {
      presentacion: "Professional Summary",
      objetivo: "Objective or Personal Statement",
      objetivoPlaceholder: "Write a brief professional summary highlighting your strengths and career goals...",
      objetivoTip: "Tip: Mention your key experience, main skills, and what you seek in your next role",
      mejorarIA: "Improve with AI",
      infoPersonal: "Personal Information",
      nombre: "Full Name",
      nombrePlaceholder: "Your full name",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      telefono: "Phone",
      telefonoPlaceholder: "+1 (555) 123-4567",
      ciudad: "City",
      ciudadPlaceholder: "Your city",
      pais: "Country",
      paisPlaceholder: "Your country",
      enlaces: "Professional Links",
      etiqueta: "Label",
      etiquetaPlaceholder: "e.g. LinkedIn, Portfolio",
      url: "URL",
      urlPlaceholder: "https://...",
      agregarEnlace: "Add Link",
      eliminar: "Delete",
      experiencia: "Work Experience",
      experienciaN: "Experience",
      rol: "Role or Position",
      rolPlaceholder: "e.g. Frontend Developer",
      empresa: "Company",
      empresaPlaceholder: "e.g. Google",
      inicio: "Start Date",
      fechaInicioPlaceholder: "e.g. January 2022",
      fin: "End Date",
      fechaFinPlaceholder: "Present or date",
      descripcion: "Description",
      descripcionPlaceholder: "Describe your main responsibilities and achievements...",
      agregarExp: "Add Experience",
      educacion: "Education",
      estudios: "Degree",
      estudiosPlaceholder: "e.g. BSc in Computer Engineering",
      institucion: "Institution",
      institucionPlaceholder: "e.g. University of Buenos Aires",
      fechaEdu: "Graduation Year",
      habilidades: "Technical Skills",
      habilidadesPlaceholder: "JavaScript, React, Node.js, Python, SQL...",
      idiomas: "Languages",
      idiomasPlaceholder: "Spanish (Native), English (Advanced)...",
      certificaciones: "Certifications",
      certificacionesOpcional: "Certifications (optional)",
      mostrarCertificaciones: "Check to include",
      nombreCertificacion: "Certification name",
      nombreCertificacionPlaceholder: "e.g. AWS Certified Solutions Architect",
      institucionCertificacion: "Issuing institution",
      institucionCertificacionPlaceholder: "e.g. Amazon Web Services",
      fechaCertificacion: "Date obtained",
      fechaCertificacionPlaceholder: "e.g. March 2023",
      idCertificacion: "Certification ID",
      idCertificacionPlaceholder: "e.g. AWS-123456",
      idCertificacionOpcional: "ID (optional)",
      agregarCertificacion: "Add certification",
      eliminarCertificacion: "Remove certification",
      nivel: "Level",
      nivelPlaceholder: "e.g. Advanced, B2, Native...",
      tituloProfesional: "Professional Title",
      tituloProfesionalPlaceholder: "e.g. Systems Engineer, Lawyer, Graphic Designer...",
    },
  }[language];

  const [isImproving, setIsImproving] = useState(false);
  const [improvingExpId, setImprovingExpId] = useState<string | null>(null);

  // Handlers para campos simples
  const handleChange = (field: string, val: any) => {
    onChange({ ...value, [field]: val });
  };

  // Handlers para links
  const addLink = () => {
    onChange({
      ...value,
      links: [
        ...value.links,
        { id: crypto.randomUUID(), label: "", url: "" }
      ]
    });
  };
  const removeLink = (id: string) => {
    const newLinks = value.links.filter((l: Link) => l.id !== id);
    onChange({ ...value, links: newLinks });
  };
  const updateLink = (id: string, field: keyof Link, val: string) => {
    const newLinks = value.links.map((l: Link) => l.id === id ? { ...l, [field]: val } : l);
    onChange({ ...value, links: newLinks });
  };

  // Handlers para experiencias
  const addExperience = () => {
    onChange({
      ...value,
      experiences: [
        ...value.experiences,
        { id: crypto.randomUUID(), role: "", company: "", startDate: "", endDate: "", description: "" }
      ]
    });
  };
  const removeExperience = (id: string) => {
    const newExps = value.experiences.filter((exp: Experience) => exp.id !== id);
    onChange({ ...value, experiences: newExps });
  };
  const updateExperience = (id: string, field: keyof Experience, val: string) => {
    const newExps = value.experiences.map((exp: Experience) => exp.id === id ? { ...exp, [field]: val } : exp);
    onChange({ ...value, experiences: newExps });
  };

  // Nueva función para traducir texto al inglés usando la API de Groq
  async function translateToEnglish(text: string) {
    const prompt = `Traduce el siguiente texto profesional al inglés, manteniendo el tono formal y profesional. No expliques la traducción ni agregues notas, solo devuelve el texto traducido.\n\nTexto a traducir:\n${text}`;
    const res = await fetch("/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, language: "en" }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error translating");
    return data.result;
  }

  // Nueva función para llamar a la API Route mejorada
  async function improveWithAI({ text, type }: { text: string, type: 'presentation' | 'experience' }) {
    if (!text.trim()) return text;
    const response = await fetch('/api/improve-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalText: text,
        jobDescription: '',
        type,
        language
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error improving text');
    return data.improvedText;
  }

  // Presentación profesional
  const handleImprovePresentation = async () => {
    if (!value.presentation.trim()) {
      toast.error(language === 'es' ? 'Por favor, escribe una presentación primero' : 'Please write a presentation first');
      return;
    }
    setIsImproving(true);
    try {
      const improved = await improveWithAI({ text: value.presentation, type: 'presentation' });
      onChange({ ...value, presentation: improved });
      toast.success(language === 'es' ? '¡Presentación mejorada!' : 'Presentation improved!');
    } catch (error) {
      console.error('Error improving presentation:', error);
      toast.error(language === 'es' ? 'Error al mejorar la presentación' : 'Error improving presentation');
    } finally {
      setIsImproving(false);
    }
  };

  // Experiencia laboral
  const handleImproveExperience = async (expId: string, description: string) => {
    if (!description.trim()) {
      toast.error(language === 'es' ? 'Por favor, escribe una descripción primero' : 'Please write a description first');
      return;
    }
    setImprovingExpId(expId);
    try {
      const improved = await improveWithAI({ text: description, type: 'experience' });
      updateExperience(expId, 'description', improved);
      toast.success(language === 'es' ? '¡Descripción mejorada!' : 'Description improved!');
    } catch (error) {
      console.error('Error improving experience description:', error);
      toast.error(language === 'es' ? 'Error al mejorar la descripción' : 'Error improving description');
    } finally {
      setImprovingExpId(null);
    }
  };

  // EDUCACIÓN dinámica
  const addEducation = () => {
    onChange({
      ...value,
      educations: [
        ...value.educations,
        { uid: crypto.randomUUID(), degree: "", institution: "", graduationYear: "" }
      ]
    });
  };
  const removeEducation = (uid: string) => {
    const newEds = value.educations.filter((ed: any) => ed.uid !== uid);
    onChange({ ...value, educations: newEds });
  };
  const updateEducation = (uid: string, field: string, val: string) => {
    const newEds = value.educations.map((ed: any) => ed.uid === uid ? { ...ed, [field]: val } : ed);
    onChange({ ...value, educations: newEds });
  };

  // IDIOMAS dinámica
  const addLanguage = () => {
    onChange({
      ...value,
      languages: [
        ...value.languages,
        { uid: crypto.randomUUID(), language: "", level: "" }
      ]
    });
  };
  const removeLanguage = (uid: string) => {
    const newLangs = value.languages.filter((l: any) => l.uid !== uid);
    onChange({ ...value, languages: newLangs });
  };
  const updateLanguage = (uid: string, field: string, val: string) => {
    const newLangs = value.languages.map((l: any) => l.uid === uid ? { ...l, [field]: val } : l);
    onChange({ ...value, languages: newLangs });
  };

  // CERTIFICACIONES dinámica
  const addCertification = () => {
    onChange({
      ...value,
      certifications: [
        ...value.certifications,
        { uid: crypto.randomUUID(), name: "", institution: "", date: "", id: "" }
      ]
    });
  };
  const removeCertification = (uid: string) => {
    const newCerts = value.certifications.filter((c: any) => c.uid !== uid);
    onChange({ ...value, certifications: newCerts });
  };
  const updateCertification = (uid: string, field: string, val: string) => {
    const newCerts = value.certifications.map((c: any) => c.uid === uid ? { ...c, [field]: val } : c);
    onChange({ ...value, certifications: newCerts });
  };

  return (
    <main className="w-full min-h-screen">
      <div className="w-full rounded-2xl space-y-8 min-h-screen bg-gradient-to-br from-violet-100 to-emerald-100 dark:from-violet-950 dark:to-emerald-950 transition-colors duration-500">
        {/* Sección de Presentación Profesional */}
        <Card className="w-full p-8 bg-gradient-to-br from-violet-200/80 to-emerald-100/80 border-violet-300 shadow-lg dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-emerald-900/80 dark:border-violet-800 dark:shadow-violet-900/30">
          <h3 className="text-2xl font-bold text-violet-800 dark:text-emerald-200 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 dark:bg-emerald-600 rounded-xl flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
          </div>
            {t.presentacion}
        </h3>
          {/* Campo para el título profesional */}
          <div className="mb-4">
            <Label htmlFor="professionalTitle" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              {t.tituloProfesional}
            </Label>
            <Input
              id="professionalTitle"
              value={value.professionalTitle || ""}
              onChange={e => handleChange("professionalTitle", e.target.value)}
              placeholder={t.tituloProfesionalPlaceholder}
              className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
            />
          </div>
          {/* Campo de texto para la presentación profesional */}
        <div className="space-y-4">
          <div>
              <Label htmlFor="presentation" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                {t.objetivo}
            </Label>
            <Textarea
              id="presentation"
                value={value.presentation}
                onChange={(e) => handleChange("presentation", e.target.value)}
                placeholder={t.objetivoPlaceholder}
                className="min-h-[120px] border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.objetivoTip}
            </p>
          </div>
            {/* Botón para mejorar la presentación con IA */}
            <Button
              variant="outline"
              onClick={handleImprovePresentation}
              disabled={isImproving || !value.presentation.trim()}
              className="border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-400 dark:hover:border-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isImproving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === "es" ? "Mejorando..." : "Improving..."}
                </>
              ) : (
                <>
            <Sparkles className="w-4 h-4 mr-2" />
                  {language === "es" ? "Mejorar con IA" : t.mejorarIA}
                </>
              )}
          </Button>
        </div>
      </Card>

        {/* Sección de Información Personal */}
        <Card className="w-full p-8 bg-gradient-to-br from-violet-200/80 to-emerald-100/80 border-violet-300 shadow-lg dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-emerald-900/80 dark:border-violet-800 dark:shadow-violet-900/30">
          <h3 className="text-2xl font-bold text-violet-800 dark:text-emerald-200 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 dark:bg-emerald-600 rounded-xl flex items-center justify-center">
              <IdCard className="w-7 h-7 text-white" />
          </div>
            {t.infoPersonal}
        </h3>
          {/* Grid de campos de información personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.nombre}
            </Label>
            <Input
              id="fullName"
                value={value.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder={t.nombrePlaceholder}
                className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
            />
          </div>
          <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.email}
            </Label>
            <Input
              id="email"
              type="email"
                value={value.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={t.emailPlaceholder}
                className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
            />
          </div>
          <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.telefono}
            </Label>
            <Input
              id="phone"
                value={value.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder={t.telefonoPlaceholder}
                className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
            />
          </div>
          <div>
              <Label htmlFor="city" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.ciudad}
            </Label>
            <Input
              id="city"
                value={value.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder={t.ciudadPlaceholder}
                className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
            />
          </div>
          <div className="md:col-span-2">
              <Label htmlFor="country" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.pais}
            </Label>
            <Input
              id="country"
                value={value.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder={t.paisPlaceholder}
                className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
            />
          </div>
        </div>
        </Card>

        {/* Sección de Enlaces Profesionales */}
        <Card className="w-full p-8 bg-gradient-to-br from-violet-200/80 to-emerald-100/80 border-violet-300 shadow-lg dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-emerald-900/80 dark:border-violet-800 dark:shadow-violet-900/30">
          <h3 className="text-2xl font-bold text-violet-800 dark:text-emerald-200 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 dark:bg-emerald-600 rounded-xl flex items-center justify-center">
              <LinkIcon className="w-7 h-7 text-white" />
            </div>
            {t.enlaces}
          </h3>
          <div className="space-y-4">
            {value.links.map((link: Link) => (
              <div key={link.id} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Label htmlFor={`link-label-${link.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.etiqueta}
                  </Label>
                  <Input
                    id={`link-label-${link.id}`}
                    value={link.label}
                    onChange={e => updateLink(link.id, "label", e.target.value)}
                    placeholder={t.etiquetaPlaceholder}
                    className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                <div className="flex-[2]">
                  <Label htmlFor={`link-url-${link.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.url}
                  </Label>
                  <Input
                    id={`link-url-${link.id}`}
                    value={link.url}
                    onChange={e => updateLink(link.id, "url", e.target.value)}
                    placeholder={t.urlPlaceholder}
                    className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                  <Button
                  variant="ghost"
                  size="icon"
                    onClick={() => removeLink(link.id)}
                  className="mt-7 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50"
                  >
                  <Trash2 className="w-5 h-5" />
                  </Button>
              </div>
            ))}
          <Button
            variant="outline"
            onClick={addLink}
              className="mt-4 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-400 dark:hover:border-violet-600"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
              {t.agregarEnlace}
          </Button>
        </div>
      </Card>

        {/* Sección de Experiencia Laboral */}
        <Card className="w-full p-8 bg-gradient-to-br from-violet-200/80 to-emerald-100/80 border-violet-300 shadow-lg dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-emerald-900/80 dark:border-violet-800 dark:shadow-violet-900/30">
          <h3 className="text-2xl font-bold text-violet-800 dark:text-emerald-200 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 dark:bg-emerald-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
          </div>
            {t.experiencia}
        </h3>
        <div className="space-y-6">
            {value.experiences.map((exp: Experience) => (
              <div key={exp.id} className="p-6 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-violet-200 dark:border-violet-800">
              <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-violet-800 dark:text-violet-200">{t.experienciaN} {value.experiences.indexOf(exp) + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`role-${exp.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.rol}
                    </Label>
                  <Input
                      id={`role-${exp.id}`}
                      value={exp.role}
                      onChange={e => updateExperience(exp.id, "role", e.target.value)}
                      placeholder={t.rolPlaceholder}
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                <div>
                    <Label htmlFor={`company-${exp.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.empresa}
                    </Label>
                  <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={e => updateExperience(exp.id, "company", e.target.value)}
                      placeholder={t.empresaPlaceholder}
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                <div>
                    <Label htmlFor={`startDate-${exp.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.inicio}
                    </Label>
                  <Input
                      id={`startDate-${exp.id}`}
                      value={exp.startDate}
                      onChange={e => updateExperience(exp.id, "startDate", e.target.value)}
                      placeholder={t.fechaInicioPlaceholder}
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                <div>
                    <Label htmlFor={`endDate-${exp.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.fin}
                    </Label>
                  <Input
                      id={`endDate-${exp.id}`}
                      value={exp.endDate}
                      onChange={e => updateExperience(exp.id, "endDate", e.target.value)}
                      placeholder={t.fechaFinPlaceholder}
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`description-${exp.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.descripcion}
                    </Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      value={exp.description}
                      onChange={e => updateExperience(exp.id, "description", e.target.value)}
                      placeholder={t.descripcionPlaceholder}
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 min-h-[100px] bg-white/50 dark:bg-gray-900/50"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleImproveExperience(exp.id, exp.description)}
                      disabled={improvingExpId === exp.id || !exp.description.trim()}
                      className="mt-2 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-400 dark:hover:border-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {improvingExpId === exp.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {language === "es" ? "Mejorando..." : "Improving..."}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          {language === "es" ? "Mejorar con IA" : "Mejorar con IA"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        <Button
          variant="outline"
          onClick={addExperience}
              className="mt-4 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-400 dark:hover:border-violet-600"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
              {t.agregarExp}
        </Button>
          </div>
      </Card>

        {/* Educación */}
        <Card className="w-full p-8 bg-gradient-to-br from-violet-200/80 to-emerald-100/80 border-violet-300 shadow-lg dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-emerald-900/80 dark:border-violet-800 dark:shadow-violet-900/30 mb-8">
          <h3 className="text-2xl font-bold text-violet-800 dark:text-emerald-200 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 dark:bg-emerald-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            {t.educacion}
          </h3>
          <div className="space-y-4">
            {value.educations.map((ed: any) => (
              <div key={ed.uid} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.estudios}</Label>
                  <Input value={ed.degree} onChange={e => updateEducation(ed.uid, "degree", e.target.value)} placeholder={t.estudiosPlaceholder} className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.institucion}</Label>
                  <Input value={ed.institution} onChange={e => updateEducation(ed.uid, "institution", e.target.value)} placeholder={t.institucionPlaceholder} className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.fechaEdu}</Label>
                  <Input value={ed.graduationYear} onChange={e => updateEducation(ed.uid, "graduationYear", e.target.value)} placeholder="Ej: 2020" className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeEducation(ed.uid)} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addEducation} className="mt-2 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-400 dark:hover:border-violet-600">
              <PlusCircle className="w-4 h-4 mr-2" />Añadir
            </Button>
          </div>
        </Card>

        {/* Certificaciones */}
        <Card className="w-full p-8 bg-gradient-to-br from-violet-200/80 to-emerald-100/80 border-violet-300 shadow-lg dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-emerald-900/80 dark:border-violet-800 dark:shadow-violet-900/30 mb-8">
          <div className="flex flex-row justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-violet-800 dark:text-emerald-200 flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600 dark:bg-emerald-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              {t.certificacionesOpcional}
            </h3>
            <div className="flex items-center gap-2">
              <Checkbox
                id="showCertifications"
                checked={value.showCertifications}
                onCheckedChange={(checked) => handleChange("showCertifications", checked)}
              />
              <Label 
                htmlFor="showCertifications" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t.mostrarCertificaciones}
              </Label>
            </div>
          </div>
          {value.showCertifications && (
            <div className="space-y-4">
              {value.certifications.map((c: any) => (
                <div key={c.uid} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.nombreCertificacion}
                    </Label>
                    <Input 
                      value={c.name} 
                      onChange={e => updateCertification(c.uid, "name", e.target.value)} 
                      placeholder={t.nombreCertificacionPlaceholder} 
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" 
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.institucionCertificacion}
                    </Label>
                    <Input 
                      value={c.institution} 
                      onChange={e => updateCertification(c.uid, "institution", e.target.value)} 
                      placeholder={t.institucionCertificacionPlaceholder} 
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" 
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.fechaCertificacion}
                    </Label>
              <Input
                      value={c.date} 
                      onChange={e => updateCertification(c.uid, "date", e.target.value)} 
                      placeholder={t.fechaCertificacionPlaceholder} 
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" 
              />
            </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.idCertificacionOpcional}
                    </Label>
              <Input
                      value={c.id} 
                      onChange={e => updateCertification(c.uid, "id", e.target.value)} 
                      placeholder={t.idCertificacionPlaceholder} 
                      className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" 
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeCertification(c.uid)} 
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50"
                    aria-label={t.eliminarCertificacion}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={addCertification} 
                className="mt-2 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-400 dark:hover:border-violet-600"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                {t.agregarCertificacion}
              </Button>
            </div>
          )}
        </Card>

        {/* Habilidades */}
        <Card className="w-full p-8 bg-gradient-to-br from-violet-200/80 to-emerald-100/80 border-violet-300 shadow-lg dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-emerald-900/80 dark:border-violet-800 dark:shadow-violet-900/30">
          <h3 className="text-2xl font-bold text-violet-800 dark:text-emerald-200 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 dark:bg-emerald-600 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            {t.habilidades}
          </h3>
          <div className="space-y-4">
              <Textarea
              id="technicalSkills"
              value={value.technicalSkills}
              onChange={(e) => handleChange("technicalSkills", e.target.value)}
              placeholder={t.habilidadesPlaceholder}
              className="mt-1 min-h-[80px] border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50"
            />
            {/* Idiomas dinámicos */}
            <div className="space-y-4">
              {value.languages.map((l: any) => (
                <div key={l.uid} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.idiomas}</Label>
                    <Input value={l.language} onChange={e => updateLanguage(l.uid, "language", e.target.value)} placeholder={t.idiomasPlaceholder} className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.nivel}</Label>
                    <Input value={l.level} onChange={e => updateLanguage(l.uid, "level", e.target.value)} placeholder={t.nivelPlaceholder} className="mt-1 border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-500 dark:focus:ring-violet-400 bg-white/50 dark:bg-gray-900/50" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeLanguage(l.uid)} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50">
                    <Trash2 className="w-5 h-5" />
                  </Button>
            </div>
              ))}
              <Button variant="outline" onClick={addLanguage} className="mt-2 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-400 dark:hover:border-violet-600">
                <PlusCircle className="w-4 h-4 mr-2" />Añadir
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
