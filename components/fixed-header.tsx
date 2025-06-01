"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/LanguageContext"

interface FixedHeaderProps {
  currentStep: number
  onStepChange: (step: number) => void
}

export function FixedHeader({ currentStep, onStepChange }: FixedHeaderProps) {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  // Text translations
  const texts = {
    es: {
      title: "Civi",
      subtitle: "Creador de CV",
      step1: "Datos del CV",
      step2: "Trabajo Objetivo",
      saveProgress: "Guardar Progreso",
      generatePDF: "Generar PDF",
      donate: "Donar",
      darkModeTitle: "Alternar modo oscuro",
      languageTitle: "Cambiar idioma",
      donateTitle: "Apoyar el proyecto",
    },
    en: {
      title: "Civi",
      subtitle: "CV Creator",
      step1: "CV Data",
      step2: "Target Job",
      saveProgress: "Save Progress",
      generatePDF: "Generate PDF",
      donate: "Donate",
      darkModeTitle: "Toggle dark mode",
      languageTitle: "Change language",
      donateTitle: "Support the project",
    },
  }

  const t = texts[language]

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-xl overflow-hidden shadow-md bg-transparent">
                <img
                  src="/50554dd2-5d9d-486b-b5c2-b67c147e9922.png"
                  alt="Logo Civi"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <img
                src="/130c1c3e-d40c-4f93-acca-4ab124e37aba.png"
                alt="Civi Logo Letras"
                className="h-7 object-contain"
              />
            </div>

            {/* Utility Buttons Section */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="hidden sm:flex w-9 h-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-200"
                title={t.darkModeTitle}
              >
                {mounted ? (
                  theme === "dark" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-sun"
                    >
                      <circle cx="12" cy="12" r="4"></circle>
                      <path d="M12 2v2"></path>
                      <path d="M12 20v2"></path>
                      <path d="M4.93 4.93l1.41 1.41"></path>
                      <path d="M17.66 17.66l1.41 1.41"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="M6.34 17.66l-1.41 1.41"></path>
                      <path d="M19.07 4.93l-1.41 1.41"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-moon"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                  )
                ) : null}
              </Button>

              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="hidden sm:flex h-9 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 font-medium transition-colors duration-200"
                title={t.languageTitle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-globe mr-1"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                {language.toUpperCase()}
              </Button>

              {/* Donation Button */}
              <a
                href="https://cafecito.app/lautarotapia"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center h-9 px-6 rounded-lg text-base font-bold bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white shadow-md transition-all duration-300 relative overflow-hidden group animate-wiggle"
                title={t.donateTitle}
              >
                {t.donate}
                <span className="absolute left-[-60%] top-0 w-1/2 h-full bg-white opacity-10 blur-md pointer-events-none group-hover:animate-shine"></span>
              </a>

              {/* Mobile Menu */}
              <div className="md:hidden flex items-center gap-1 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                {/* Mobile Dark Mode */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="w-9 h-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {mounted ? (
                    theme === "dark" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sun"
                      >
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="M4.93 4.93l1.41 1.41"></path>
                        <path d="M17.66 17.66l1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="M6.34 17.66l-1.41 1.41"></path>
                        <path d="M19.07 4.93l-1.41 1.41"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-moon"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      </svg>
                    )
                  ) : null}
                </Button>

                {/* Mobile Language */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="h-9 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 text-xs font-medium transition-colors duration-200"
                >
                  {language.toUpperCase()}
                </Button>

                {/* Mobile Donation */}
                <a
                  href="https://cafecito.app/lautarotapia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Step Navigation Container */}
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => onStepChange(1)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  currentStep === 1
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                }`}
              >
                1
              </div>
              <span className="hidden sm:inline">{t.step1}</span>
            </button>

            <div className="w-12 h-px bg-gray-300 dark:bg-gray-600 transition-colors duration-200"></div>

            <button
              onClick={() => onStepChange(2)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentStep === 2
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  currentStep === 2
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                }`}
              >
                2
              </div>
              <span className="hidden sm:inline">{t.step2}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
