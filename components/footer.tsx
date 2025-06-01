"use client";

import { useState } from "react"
import { Linkedin, Github } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/LanguageContext"

export function Footer() {
  const { language } = useLanguage();
  const t = {
    es: {
      descripcion: "Creamos CVs profesionales y personalizados que te ayudan a pasar las pruebas ATS y a destacar en el mercado laboral.",
      politica: "Política de Privacidad y Contacto",
      aviso: "Esta aplicación no guarda ni almacena información personal. Todos los datos ingresados son procesados localmente y enviados únicamente al modelo de inteligencia artificial para generar contenido. No se guarda ninguna información del usuario ni del currículum generado.",
      linkedin: "LinkedIn",
      github: "GitHub",
      copyright: "© 2024 Civi. Todos los derechos reservados.",
    },
    en: {
      descripcion: "We create professional and personalized CVs that help you pass ATS tests and stand out in the job market.",
      politica: "Privacy Policy & Contact",
      aviso: "This application does not store or save any personal information. All data entered is processed locally and only sent to the AI model to generate content. No user or CV data is stored.",
      linkedin: "LinkedIn",
      github: "GitHub",
      copyright: "© 2024 Civi. All rights reserved.",
    },
  }[language];
  const [showInfo, setShowInfo] = useState(false)
  return (
    <footer className="w-full bg-white/80 dark:bg-zinc-900/80 border-t border-zinc-200 dark:border-zinc-800 shadow-lg py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
          <div className="flex justify-center w-full sm:w-auto mb-0.5">
            <Image 
              src="/130c1c3e-d40c-4f93-acca-4ab124e37aba.png" 
              alt="Civi Logo Letras" 
              width={108} 
              height={32} 
              className="h-8 sm:h-10 md:h-12 object-contain" 
            />
          </div>
          <div className="flex justify-center w-full">
            <p className="text-gray-600 dark:text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto px-2 text-center mb-1">
              {t.descripcion}
            </p>
          </div>
          <div className="flex flex-col items-center w-full sm:w-auto space-y-1">
            <button
              onClick={() => setShowInfo((v) => !v)}
              className="w-full sm:w-auto text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 hover:underline focus:outline-none px-2 py-1"
            >
              {t.politica}
            </button>
            {showInfo && (
              <div className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-gray-700 dark:text-gray-200 max-w-md mx-auto shadow transition-colors duration-300 flex flex-col items-center space-y-1 text-center justify-center mt-1">
                <p className="mb-0.5 text-center w-full">
                  {t.aviso}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 w-full sm:w-auto mt-0.5">
                  <a
                    href="https://www.linkedin.com/in/alejandrosorianoai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 hover:underline flex items-center justify-center gap-2 px-2 py-1"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.linkedin}
                  </a>
                  <a
                    href="https://github.com/alejandrosoriano/civi-cv-creator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 hover:underline flex items-center justify-center gap-2 px-2 py-1"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.github}
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-white/20 pt-2 w-full flex justify-center text-center mt-1">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-white/60 text-center">
              {t.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
