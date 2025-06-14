import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/LanguageContext"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Civi - Creador de CV Inteligente",
  description: "Crea CVs profesionales y personalizados en minutos con la ayuda de IA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="theme-transition">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased theme-transition`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="civi-theme"
          themes={["light", "dark", "system"]}
        >
          <LanguageProvider>
            {children}
            <Toaster richColors position="top-center" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
