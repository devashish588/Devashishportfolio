"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

export default function Navigation({ currentSection, setCurrentSection }: NavigationProps) {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setCurrentSection(sectionId)
      element.scrollIntoView({ behavior: "smooth" })
      // Focus management for accessibility
      element.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      scrollToSection(sectionId)
    }
  }

  useEffect(() => {
    const handleKeyDown = () => setIsKeyboardUser(true)
    const handleMouseDown = () => setIsKeyboardUser(false)

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setCurrentSection])

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40" aria-label="Main navigation">
      <div className="flex space-x-1 bg-background/80 backdrop-blur-md rounded-2xl px-4 py-2 border border-border/30 shadow-lg">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            className={`relative px-4 py-2 rounded-xl text-sm font-medium font-outfit transition-all duration-300 ${
              currentSection === item.id ? "text-white" : "text-muted-foreground hover:text-foreground"
            } ${
              isKeyboardUser
                ? "focus:outline-none focus:ring-2 focus:ring-aura-indigo focus:ring-offset-2 focus:ring-offset-background"
                : "focus:outline-none"
            }`}
            aria-current={currentSection === item.id ? "page" : undefined}
            aria-label={`Navigate to ${item.label} section`}
          >
            {currentSection === item.id && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-aura-indigo to-dill-green rounded-xl"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
