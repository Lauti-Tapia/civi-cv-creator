"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { cn } from "@/lib/utils";

interface MobileViewProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileView({ children, className }: MobileViewProps) {
  const isMobile = useIsMobile();
  const { language } = useLanguage();

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("md:hidden w-full overflow-x-hidden min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-3 left-3 z-50 md:hidden mobile-button mobile-focus-ring"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">
              {language === "es" ? "Abrir menú" : "Open menu"}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85vw] max-w-sm p-0 mobile-nav mobile-scrollbar">
          <div className="flex flex-col h-full">
            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-1.5 p-3 border-b mobile-list">
              <Button
                variant="ghost"
                className="justify-start w-full text-left mobile-button mobile-list-item mobile-focus-ring"
                onClick={() => window.location.href = "/"}
              >
                {language === "es" ? "Inicio" : "Home"}
              </Button>
              <Button
                variant="ghost"
                className="justify-start w-full text-left mobile-button mobile-list-item mobile-focus-ring"
                onClick={() => window.location.href = "/templates"}
              >
                {language === "es" ? "Plantillas" : "Templates"}
              </Button>
              <Button
                variant="ghost"
                className="justify-start w-full text-left mobile-button mobile-list-item mobile-focus-ring"
                onClick={() => window.location.href = "/help"}
              >
                {language === "es" ? "Ayuda" : "Help"}
              </Button>
            </nav>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-3 mobile-section mobile-scrollbar">
              {children}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 mobile-nav mobile-backdrop">
        <div className="flex items-center justify-between px-3 py-2.5 max-w-full mobile-p">
          <div className="flex items-center gap-2 min-w-0 mobile-flex">
            <div className="mobile-image-container w-7 h-7">
              <img
                src="/50554dd2-5d9d-486b-b5c2-b67c147e9922.png"
                alt="Logo Civi"
                className="w-7 h-7 object-contain flex-shrink-0 mobile-rounded"
              />
            </div>
            <div className="mobile-image-container h-7">
              <img
                src="/130c1c3e-d40c-4f93-acca-4ab124e37aba.png"
                alt="Civi Logo Letras"
                className="h-7 object-contain flex-shrink-0 mobile-rounded"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Padding for Header */}
      <main className="flex-1 pt-14 pb-3 px-3 w-full max-w-full overflow-x-hidden mobile-section">
        <div className="container mx-auto mobile-spacing">
          <div className="mobile-card mobile-shadow mobile-fade-in">
            <div className="mobile-p">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 