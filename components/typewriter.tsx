"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
  cursor?: boolean
}

export default function Typewriter({
  text,
  delay = 0,
  speed = 50,
  className = "",
  onComplete,
  cursor = true,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        },
        currentIndex === 0 ? delay : speed,
      )

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()

      // Hide cursor after completion if specified
      if (cursor) {
        setTimeout(() => setShowCursor(false), 1000)
      }
    }
  }, [currentIndex, text, delay, speed, onComplete, isComplete, cursor])

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor || !showCursor) return

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(interval)
  }, [cursor, showCursor])

  return (
    <span className={className}>
      {displayText}
      {cursor && showCursor && <span className="inline-block w-0.5 h-[1em] bg-aura-indigo ml-1 animate-pulse" />}
    </span>
  )
}
