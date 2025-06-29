"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100

      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <>
      {/* Clean top progress bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-muted/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-aura-indigo to-dill-green transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Minimalist DB progress indicator */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="relative w-16 h-16 group">
          {/* Clean progress ring */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" stroke="hsl(var(--muted))" strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="hsl(var(--aura-indigo))"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Clean DB logo center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
              <div className="relative">
                {/* Simple DB text */}
                <div className="bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1 border border-border/30">
                  <span className="text-sm font-black font-outfit gradient-text-primary">DB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean hover tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-md px-2 py-1">
              <span className="text-xs font-jetbrains-mono text-muted-foreground">{Math.round(scrollProgress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
