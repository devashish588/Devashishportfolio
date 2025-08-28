"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
  currentSection: string
}

export default function PageTransition({ children, currentSection }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 600) // Clean 0.6s duration
    return () => clearTimeout(timer)
  }, [currentSection])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <>
            {/* Minimalist overlay with subtle gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              {/* Clean, centered content */}
              <div className="text-center relative z-10">
                {/* Minimalist DB Logo */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mb-6"
                >
                  {/* Simple DB monogram */}
                  <div className="relative">
                    <div className="text-6xl font-black font-outfit gradient-text-primary tracking-tight">DB</div>

                    {/* Subtle underline */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                      className="h-0.5 bg-gradient-to-r from-aura-indigo to-dill-green mx-auto mt-2 rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Clean section indicator */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  className="text-sm font-jetbrains-mono text-muted-foreground uppercase tracking-widest"
                >
                  {currentSection}
                </motion.div>

                {/* Minimalist loading indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="mt-8 flex justify-center"
                >
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0.3 }}
                        animate={{
                          scale: [0.8, 1, 0.8],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="w-1.5 h-1.5 bg-aura-indigo rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content with clean fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
