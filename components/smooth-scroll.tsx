"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Enhanced smooth scrolling with easing
    const smoothScrollTo = (target: HTMLElement, duration = 1000) => {
      const targetPosition = target.offsetTop - 100 // Account for fixed navigation
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + distance * ease)

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    // Handle navigation clicks
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement
      const href = target.getAttribute("href")

      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetElement = document.querySelector(href)
        if (targetElement) {
          smoothScrollTo(targetElement as HTMLElement)
        }
      }
    }

    // Add smooth scroll to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]')
    internalLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick)
    })

    // Smooth scroll for programmatic navigation
    const originalScrollTo = window.scrollTo
    window.scrollTo = (x: number | ScrollToOptions, y?: number) => {
      if (typeof x === "object") {
        const options = x as ScrollToOptions
        if (options.behavior === "smooth") {
          const targetY = options.top || 0
          smoothScrollTo({ offsetTop: targetY } as HTMLElement)
          return
        }
      }
      originalScrollTo.call(window, x, y)
    }

    return () => {
      internalLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick)
      })
      window.scrollTo = originalScrollTo
    }
  }, [])

  return null
}
