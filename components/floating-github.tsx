"use client"

import { useState } from "react"
import { Github } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingGitHub() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-8 left-8 z-40"
    >
      <div className="relative group">
        <a
          href="https://github.com/devashish588"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-aura-indigo to-dill-green text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-aura-indigo"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Visit Devashish's GitHub profile (opens in new tab)"
        >
          <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.6 }}>
            <Github size={24} />
          </motion.div>
        </a>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute left-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-lg">
                <span className="text-sm font-outfit font-medium text-foreground">Visit GitHub Profile</span>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background/90 border-l border-b border-border/50 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-aura-indigo/20 animate-ping" />
      </div>
    </motion.div>
  )
}
