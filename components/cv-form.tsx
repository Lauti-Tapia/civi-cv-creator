"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PersonalDataStep } from "./steps/personal-data-step"
import { JobDescriptionStep } from "./steps/job-description-step"
import { CVPreview } from "@/components/cv-preview"
import { useLanguage } from "@/components/LanguageContext"
import { toast } from "sonner"
import { useReactToPrint } from "react-to-print"
import { CVPrintable } from "@/components/CVPrintable"

/**
 * Props del componente CVForm
 * @interface CVFormProps
 * @property {number} currentStep - El paso actual del formulario
 * @property {function} onStepChange - Función para cambiar entre pasos
 */
interface CVFormProps {
  currentStep: number
  onStepChange: (step: number) => void
}

interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Link {
  id: string;
  label: string;
  url: string;
}

interface Education {
  uid: string;
  degree: string;
  institution: string;
  graduationYear: string;
}

interface Certification {
  uid: string;
  name: string;
  institution: string;
  date: string;
  id?: string;
}

interface Language {
  uid: string;
  language: string;
  level: string;
}

interface CVData {
  presentation: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  links: Link[];
  objective?: string;
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  languages: Language[];
  technicalSkills: string;
  showCertifications: boolean;
  professionalTitle?: string;
  jobDescription: string;
}

function ThankYouModal({ open, onClose, language }: { open: boolean, onClose: () => void, language: 'es' | 'en' }) {
  if (!open) return null;
  const t = {
    es: {
      title: "¡Gracias por usar CIVI!",
      subtitle: "Si este proyecto te ayudó, podés invitarme un cafecito para seguir mejorándolo 💙",
      button: "Invitame un cafecito",
      close: "Volver al editor"
    },
    en: {
      title: "Your CV is ready 🎉",
      subtitle: "If this project helped you, you can buy me a coffee to keep improving it 💙",
      button: "Support from $1 USD",
      close: "Back to editor"
    }
  }[language];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-violet-100/90 to-emerald-100/90 dark:from-violet-950/90 dark:to-emerald-950/90 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center border border-violet-200 dark:border-violet-800">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-2xl font-bold mb-2 text-violet-700 dark:text-emerald-200">{t.title}</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">{t.subtitle}</p>
        <a href="https://cafecito.app/lautarotapia" target="_blank" rel="noopener noreferrer">
          <button className="bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all text-lg mb-4 w-full">
            {t.button}
          </button>
        </a>
        <button onClick={onClose} className="text-violet-700 dark:text-emerald-200 underline text-base mt-2 w-full">{t.close}</button>
      </div>
      <style>{`.animate-fadeIn{animation:fadeIn .5s ease}`}
      </style>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}

/**
 * Componente principal del formulario de CV
 * Maneja la estructura y navegación entre los diferentes pasos del formulario
 * Cada paso está contenido en una Card con un diseño distintivo
 */
export function CVForm({ currentStep, onStepChange }: CVFormProps) {
  const { language } = useLanguage();
  const t = {
    es: {
      paso1: "Paso 1: Datos de tu CV",
      paso1Desc: "Completa tu información personal y profesional",
      siguiente: "Siguiente →",
      paso2: "Paso 2: Trabajo Objetivo",
      paso2Desc: "Pega la descripción del trabajo al que quieres aplicar",
      generarPreview: "Generar Preview",
      volver: "← Volver a editar"
    },
    en: {
      paso1: "Step 1: Your CV Data",
      paso1Desc: "Fill in your personal and professional information",
      siguiente: "Next →",
      paso2: "Step 2: Target Job",
      paso2Desc: "Paste the job description you want to apply for",
      generarPreview: "Generate Preview",
      volver: "← Back to edit"
    },
  }[language];

  // Estado global de los datos del CV
  const [cvData, setCVData] = useState<CVData>({
    presentation: "",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    links: [],
    objective: "",
    experiences: [],
    educations: [],
    certifications: [],
    languages: [],
    technicalSkills: "",
    showCertifications: false,
    professionalTitle: "",
    jobDescription: "",
  });

  // Nuevo estado controlado para jobDescription
  const [jobDescription, setJobDescription] = useState("");

  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewCounter, setPreviewCounter] = useState(0);

  // Agregar estado para los textos mejorados del preview
  const [previewData, setPreviewData] = useState<{
    presentation: string;
    experiences: Experience[];
  }>({
    presentation: "",
    experiences: [],
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: "CV-Preview",
    pageStyle: "@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }",
    onAfterPrint: () => {
      setShowThankYouModal(true);
    }
  });

  useEffect(() => {
    setCVData((prev) => ({
      ...prev,
      links: prev.links.length ? prev.links : [{ id: crypto.randomUUID(), label: "LinkedIn", url: "" }],
      experiences: prev.experiences.length ? prev.experiences : [{ id: crypto.randomUUID(), role: "", company: "", startDate: "", endDate: "", description: "" }],
      educations: prev.educations.length ? prev.educations : [{ uid: crypto.randomUUID(), degree: "", institution: "", graduationYear: "" }],
      certifications: prev.certifications.length ? prev.certifications : [{ uid: crypto.randomUUID(), name: "", institution: "", date: "", id: "" }],
      languages: prev.languages.length ? prev.languages : [{ uid: crypto.randomUUID(), language: "", level: "" }],
    }));
  }, []);

  const handlePersonalDataChange = (updatedData: CVData) => {
    setCVData(updatedData);
  };

  const handleJobDescriptionChange = (jobDesc: string) => {
    setJobDescription(jobDesc);
    setCVData(prev => ({ 
      ...prev, 
      jobDescription: jobDesc 
    }));
  };

  // Agregar función para llamar a la API
  async function callImproveCVAPI(originalText: string, jobDescription: string, type: 'presentation' | 'experience'): Promise<string> {
    const response = await fetch('/api/improve-cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originalText,
        jobDescription,
        type,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error improving CV text');
    }

    const data = await response.json();
    return data.improvedText;
  }

  // Nueva función para extraer lo relevante de la job description
  async function callExtractRelevantJobInfo(jobDescription: string, language: 'es' | 'en'): Promise<string> {
    const response = await fetch('/api/extract-job-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription, language }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error extracting relevant job info');
    }
    const data = await response.json();
    return data.relevantText;
  }

  // Nueva función para llamar a la API de mejora inteligente para preview
  async function callImproveForPreview(originalText: string, jobContext: string, type: 'presentation' | 'experience', language: 'es' | 'en'): Promise<string> {
    const response = await fetch('/api/improve-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalText,
        jobContext,
        type,
        language,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error improving text for preview');
    }
    const data = await response.json();
    return data.improvedText;
  }

  // Actualizar regeneratePreview para usar jobDescription en lugar de cvData.jobDescription
  const regeneratePreview = async () => {
    if (!jobDescription || !jobDescription.trim()) {
      toast.error(language === "es" 
        ? "Por favor, ingresa la descripción del trabajo para personalizar el CV"
        : "Please enter the job description to customize the CV"
      );
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Extraer lo relevante de la job description
      const relevantJobInfo = await callExtractRelevantJobInfo(jobDescription, language);

      // 2. Mejorar presentación profesional usando el resumen relevante y el flujo inteligente
      let improvedPresentation = cvData.presentation;
      if (cvData.presentation.trim()) {
        improvedPresentation = await callImproveForPreview(
          cvData.presentation,
          relevantJobInfo,
          'presentation',
          language
        );
      }

      // 3. Mejorar experiencias usando el resumen relevante y el flujo inteligente
      let improvedExperiences = [...cvData.experiences];
      if (cvData.experiences.length > 0) {
        improvedExperiences = await Promise.all(
          cvData.experiences.map(async (exp) => {
            if (exp.description.trim()) {
              const improvedDescription = await callImproveForPreview(
                exp.description,
                relevantJobInfo,
                'experience',
                language
              );
              return { ...exp, description: improvedDescription };
            }
            return exp;
          })
        );
      }

      setPreviewData({
        presentation: improvedPresentation,
        experiences: improvedExperiences,
      });
      setShowPreview(true);
      setPreviewCounter(prev => prev + 1);
      toast.success(language === "es"
        ? "Preview generado con éxito"
        : "Preview generated successfully"
      );
    } catch (error: any) {
      console.error('Error generating preview:', error);
      toast.error(language === "es"
        ? "Error al generar el preview. Por favor, intenta nuevamente."
        : "Error generating preview. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePreview = () => {
    regeneratePreview();
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 bg-gradient-to-br from-violet-100 to-emerald-100 dark:from-violet-950 dark:to-emerald-950 transition-colors duration-500">
      {/* Paso 1: Formulario de datos personales */}
      <div id="step-1" className="scroll-mt-16 sm:scroll-mt-24">
        <Card className="w-full max-w-full overflow-hidden shadow-xl border-0 bg-violet-50/90 dark:bg-gradient-to-br dark:from-violet-950/90 dark:to-emerald-950/90 transition-colors duration-500 rounded-lg sm:rounded-xl">
          {/* Encabezado del paso 1 con gradiente violeta */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 sm:p-6 md:p-8 text-center rounded-t-lg sm:rounded-t-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{t.paso1}</h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">{t.paso1Desc}</p>
          </div>
          {/* Contenido del paso 1 */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <PersonalDataStep
              value={{
                presentation: cvData.presentation,
                fullName: cvData.fullName,
                email: cvData.email,
                phone: cvData.phone,
                city: cvData.city,
                country: cvData.country,
                links: cvData.links,
                educations: cvData.educations,
                certifications: cvData.certifications,
                languages: cvData.languages,
                technicalSkills: cvData.technicalSkills,
                experiences: cvData.experiences,
                objective: cvData.objective,
                showCertifications: cvData.showCertifications,
                professionalTitle: cvData.professionalTitle,
              }}
              onChange={handlePersonalDataChange}
              jobDescription={jobDescription}
            />
            {/* Botón de navegación al siguiente paso */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <Button
                onClick={() => onStepChange(2)}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-lg rounded-lg sm:rounded-xl"
              >
                {t.siguiente}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Paso 2: Formulario de descripción del trabajo y preview */}
      <div id="step-2" className="scroll-mt-16 sm:scroll-mt-24">
        <Card className="w-full max-w-full overflow-hidden shadow-xl border-0 bg-violet-50/90 dark:bg-gradient-to-br dark:from-violet-950/90 dark:to-emerald-950/90 transition-colors duration-500 rounded-lg sm:rounded-xl">
          {/* Encabezado del paso 2 */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-500 dark:from-emerald-800 dark:to-emerald-600 text-white p-4 sm:p-6 md:p-8 text-center transition-colors duration-500 rounded-t-lg sm:rounded-t-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
              {showPreview
                ? (language === "es" ? "Preview del CV personalizado" : "Personalized CV Preview")
                : t.paso2}
            </h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">{t.paso2Desc}</p>
          </div>
          {/* Contenido del paso 2 */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <JobDescriptionStep 
              onGeneratePreview={handleGeneratePreview} 
              isGenerating={isGenerating} 
              onJobDescriptionChange={handleJobDescriptionChange}
              jobDescription={jobDescription}
            />
            {/* Card de preview real */}
            <div>
              <Button onClick={handlePrint} className="mb-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold">
                Descargar Preview
              </Button>
              <Card className="p-8 bg-gradient-to-br from-indigo-50/80 to-white dark:from-indigo-950/50 dark:to-gray-900 border-indigo-200 dark:border-indigo-800 shadow-lg mt-8">
                <h4 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-6 flex items-center gap-2">
                  <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-clipboard-list w-7 h-7 text-white'><rect width='8' height='4' x='8' y='2' rx='1' ry='1'></rect><path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path><path d='M12 11h4'></path><path d='M12 16h4'></path><path d='M8 11h.01'></path><path d='M8 16h.01'></path></svg>
                  </div>
                  {language === "es" ? "Preview del CV personalizado" : "Personalized CV Preview"}
                </h4>
                {showPreview ? (
                  <div style={{ display: 'none' }}>
                    {/* Componente oculto para impresión */}
                    <div ref={previewRef}>
                      <CVPrintable
                        data={{
                          ...cvData,
                          presentation: previewData.presentation || cvData.presentation,
                          experiences: previewData.experiences.length > 0 ? previewData.experiences : cvData.experiences,
                          educations: cvData.educations,
                          certifications: cvData.certifications,
                          languages: cvData.languages,
                          professionalTitle: cvData.professionalTitle,
                        }}
                        language={language}
                      />
                    </div>
                  </div>
                ) : null}
                {showPreview ? (
                  <div>
                    <CVPreview 
                      key={previewCounter} 
                      data={{
                        ...cvData,
                        // Usar los textos mejorados solo para el preview
                        presentation: previewData.presentation || cvData.presentation,
                        experiences: previewData.experiences.length > 0 ? previewData.experiences : cvData.experiences,
                        educations: cvData.educations,
                        certifications: cvData.certifications,
                        languages: cvData.languages,
                        professionalTitle: cvData.professionalTitle,
                      }} 
                      language={language} 
                    />
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 min-h-[400px] flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      {language === "es"
                        ? "El CV personalizado aparecerá aquí después de generar"
                        : "Your personalized CV will appear here after generating"}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </Card>
      </div>
      <ThankYouModal open={showThankYouModal} onClose={() => setShowThankYouModal(false)} language={language} />
    </div>
  )
}
