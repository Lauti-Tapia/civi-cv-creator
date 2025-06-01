import { ThemeProvider } from './theme-provider'
import { Header } from './header'
import { Footer } from './footer'
import React from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-100 to-emerald-100 dark:from-violet-950 dark:to-emerald-950 transition-colors duration-500">
        <Header />
        <main className="flex-1 pt-24 pb-24 px-2 sm:px-4 md:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
} 