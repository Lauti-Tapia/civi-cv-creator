import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/LanguageContext"
import { useRouter } from "next/navigation"

export function Header() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const navigateToCafecito = () => {
    const url = "https://cafecito.app/lautarotapia";
    console.log("Intentando navegar a:", url); // Para debug
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const texts = {
    es: {
      inicio: "Inicio",
      plantillas: "Plantillas",
      ayuda: "Ayuda",
      language: "EN",
      languageTitle: "Cambiar a inglés",
    },
    en: {
      inicio: "Home",
      plantillas: "Templates",
      ayuda: "Help",
      language: "ES",
      languageTitle: "Switch to Spanish",
    },
  };
  const t = texts[language];

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-600 to-violet-700 text-white py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 shadow-xl">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white animate-pulse"></div>
        <div className="absolute top-8 sm:top-20 right-8 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white animate-pulse delay-300"></div>
        <div className="absolute bottom-4 sm:bottom-10 left-1/4 w-2 h-2 rounded-full bg-white animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-white animate-pulse delay-1000"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center relative z-10 gap-4 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-2xl overflow-hidden shadow-lg transform -rotate-3 transition-transform hover:rotate-0 hover:scale-105 duration-300 bg-transparent">
            <img
              src="/50554dd2-5d9d-486b-b5c2-b67c147e9922.png"
              alt="Logo Civi"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            />
          </div>
          <div className="flex items-center">
            <img
              src="/130c1c3e-d40c-4f93-acca-4ab124e37aba.png"
              alt="Civi Logo Letras"
              className="h-8 sm:h-9 object-contain"
            />
          </div>
        </div>

        <nav className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-white hover:bg-white/20 hover:text-white rounded-full text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5"
          >
            {t.inicio}
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-white hover:bg-white/20 hover:text-white rounded-full text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5"
          >
            {t.plantillas}
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-white hover:bg-white/20 hover:text-white rounded-full text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5"
          >
            {t.ayuda}
          </Button>
          <Button
            onClick={navigateToCafecito}
            className="inline-flex items-center justify-center px-4 py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-lg"
          >
            Donar a Cafecito
          </Button>
          <Button
            variant="ghost"
            aria-label={t.languageTitle}
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="w-full sm:w-auto text-white hover:bg-white/20 hover:text-white rounded-full text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5 border border-white/30 ml-2"
          >
            {t.language}
          </Button>
        </nav>
      </div>
    </header>
  )
}
