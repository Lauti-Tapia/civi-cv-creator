"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles, FileText, Download, Eye, ClipboardList } from "lucide-react"
import { useLanguage } from "@/components/LanguageContext"

/**
 * Componente que maneja el paso de descripción del trabajo objetivo
 * Permite al usuario pegar la descripción del trabajo y generar un CV personalizado
 * Incluye una vista previa del CV generado
 */
export function JobDescriptionStep({ onGeneratePreview, onJobDescriptionChange, isGenerating, jobDescription }: { onGeneratePreview: () => void; onJobDescriptionChange: (jobDesc: string) => void; isGenerating: boolean; jobDescription: string }) {
  const { language } = useLanguage();
  const t = {
    es: {
      titulo: "Descripción del Trabajo",
      placeholder: "Pega aquí la descripción completa del trabajo, incluyendo requisitos, responsabilidades y cualificaciones...",
      tip: "Incluye todos los detalles del anuncio de trabajo para una mejor personalización del CV",
      generar: "Generar Preview",
      descargar: "Descargar",
      vistaPrevia: "Preview del CV personalizado",
      previewMsg: "El CV personalizado aparecerá aquí después de generar",
    },
    en: {
      titulo: "Job Description",
      placeholder: "Paste the full job description here, including requirements, responsibilities, and qualifications...",
      tip: "Include all job posting details for better CV customization",
      generar: "Generate Preview",
      descargar: "Download",
      vistaPrevia: "Personalized CV Preview",
      previewMsg: "Your personalized CV will appear here after generating",
    },
  }[language];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onJobDescriptionChange(newValue);
  };

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-gradient-to-br from-violet-100/80 to-white dark:from-violet-950/50 dark:to-gray-900 border-violet-200 dark:border-violet-800 shadow-lg">
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-6 flex items-center gap-2">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
              {t.titulo}
            </h4>
            <Textarea
              id="jobDescription"
              placeholder={t.placeholder}
              value={jobDescription}
              onChange={handleChange}
              className="mt-1 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[300px] bg-white/50 dark:bg-gray-900/50"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t.tip}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              className="bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white flex items-center"
              onClick={onGeneratePreview}
              disabled={isGenerating}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {t.generar}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
