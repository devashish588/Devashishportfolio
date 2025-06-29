"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-40 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-aura-indigo focus:ring-offset-2 focus:ring-offset-background"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" aria-hidden="true" />
      )}
    </button>
  )
}
