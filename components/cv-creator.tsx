"use client"

import { useState } from "react"
import { FixedHeader } from "./fixed-header"
import { CVForm } from "./cv-form"
import { Footer } from "./footer"

/**
 * Componente principal que maneja la creación del CV
 * Este componente actúa como contenedor principal y gestiona el estado del paso actual
 * en el proceso de creación del CV
 */
export function CVCreator() {
  // Estado para controlar en qué paso del formulario se encuentra el usuario
  const [currentStep, setCurrentStep] = useState(1)

  /**
   * Función para navegar entre los diferentes pasos del formulario
   * @param step - El número del paso al que se quiere navegar
   * Actualiza el estado y realiza un scroll suave hasta la sección correspondiente
   */
  const scrollToStep = (step: number) => {
    setCurrentStep(step)
    const element = document.getElementById(`step-${step}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    // Contenedor principal con un fondo degradado que cambia según el tema (claro/oscuro)
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Header fijo que muestra el progreso y permite navegar entre pasos */}
      <FixedHeader currentStep={currentStep} onStepChange={scrollToStep} />
      
      {/* Contenido principal del formulario */}
      <main className="flex-1 flex flex-col pt-32">
        <CVForm currentStep={currentStep} onStepChange={scrollToStep} />
      </main>

      {/* Pie de página sin padding */}
      <Footer />
    </div>
  )
}
