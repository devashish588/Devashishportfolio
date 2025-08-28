"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Minimalist logo animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Clean typography hierarchy */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black font-outfit gradient-text-primary tracking-tight leading-none mb-4"
          >
            DEVASHISH
          </motion.h1>

          {/* Simple underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-aura-indigo to-dill-green mx-auto rounded-full mb-4"
          />

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl md:text-3xl font-bold font-outfit text-foreground tracking-wide"
          >
            BOSE
          </motion.h2>

          {/* Clean subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-muted-foreground mt-6 font-outfit font-medium"
          >
            Data Science & IoT Enthusiast
          </motion.p>
        </motion.div>

        {/* Minimalist progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="space-y-6"
        >
          {/* Clean progress bar */}
          <div className="w-80 h-1 bg-muted/30 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-aura-indigo to-dill-green rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Simple percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="text-center"
          >
            <span className="text-aura-indigo text-lg font-jetbrains-mono font-bold">{Math.round(progress)}%</span>
          </motion.div>

          {/* Clean status text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.4 }}
            className="text-muted-foreground text-sm font-outfit tracking-wide"
          >
            {progress < 30 ? "Initializing" : progress < 60 ? "Loading" : progress < 90 ? "Preparing" : "Ready"}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
