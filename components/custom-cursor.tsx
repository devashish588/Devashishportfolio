"use client"

import { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setTargetPosition({ x: mouseX, y: mouseY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Ultra smooth cursor animation with optimized interpolation
    const animateCursor = () => {
      const dx = targetPosition.x - position.x
      const dy = targetPosition.y - position.y

      // Higher interpolation for ultra-smooth movement
      setPosition((prev) => ({
        x: prev.x + dx * 0.3,
        y: prev.y + dy * 0.3,
      }))

      animationRef.current = requestAnimationFrame(animateCursor)
    }

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    animationRef.current = requestAnimationFrame(animateCursor)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [position, targetPosition])

  return (
    <>
      {/* Ultra-Smooth Custom Arrow Cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-100 ease-out ${
          isClicking ? "scale-75" : isHovering ? "scale-125" : "scale-100"
        }`}
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        }}
      >
        {/* Arrow Cursor Design */}
        <div className="relative w-6 h-6">
          <div
            className={`absolute inset-0 transition-all duration-100 ease-out ${
              isHovering ? "text-aura-indigo" : "text-foreground"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path d="M3 3L21 12L12 21L9 18L15 12L9 6L3 3Z" fill="currentColor" className="drop-shadow-sm" />
              <path
                d="M5 5L18 12L12 18L10 16L14 12L10 8L5 5Z"
                fill={isHovering ? "hsl(var(--butter-yellow))" : "hsl(var(--muted))"}
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Subtle glow effect when hovering */}
          {isHovering && (
            <div className="absolute inset-0 bg-aura-indigo/10 rounded-full blur-sm animate-pulse scale-150" />
          )}

          {/* Click ripple effect */}
          {isClicking && <div className="absolute inset-0 bg-aura-indigo/15 rounded-full animate-ping scale-150" />}
        </div>
      </div>
    </>
  )
}
