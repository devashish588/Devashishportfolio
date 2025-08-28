"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import CustomCursor from "@/components/custom-cursor"
import Navigation from "@/components/navigation"
import ScrollProgress from "@/components/scroll-progress"
import PageTransition from "@/components/page-transition"
import ThemeToggle from "@/components/theme-toggle"
import SmoothScroll from "@/components/smooth-scroll"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState("home")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      <main
        id="main-content"
        className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300"
        tabIndex={-1}
      >
        <CustomCursor />
        <SmoothScroll />
        <ScrollProgress />
        <ThemeToggle />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        <PageTransition currentSection={currentSection}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </PageTransition>
      </main>
    </>
  )
}
