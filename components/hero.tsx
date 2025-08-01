"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react"
import Typewriter from "./typewriter"
import { motion } from "framer-motion"

export default function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
      aboutSection.focus()
    }
  }

  useEffect(() => {
    if (showDescription) {
      const timer = setTimeout(() => {
        setShowActions(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showDescription])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="text-center z-10 max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-outfit font-medium tracking-wide animate-fade-in">
            Hello, I am
          </p>

          <h1
            id="hero-heading"
            className="text-6xl md:text-8xl lg:text-9xl font-black font-outfit gradient-text-primary mb-10 animate-slide-up tracking-tighter leading-none"
          >
            <Typewriter
              text="DEVASHISH"
              delay={800}
              speed={120}
              onComplete={() => setShowSubtitle(true)}
              cursor={false}
            />
          </h1>

          <div className="space-y-6 mb-16">
            {showSubtitle && (
              <p
                className="text-2xl md:text-4xl text-foreground font-outfit font-bold tracking-wide"
                aria-label="Professional title"
              >
                <Typewriter
                  text="Crafting Smart Solutions with Data, Code & Devices"
                  delay={300}
                  speed={80}
                  onComplete={() => setShowDescription(true)}
                />
              </p>
            )}

            {showDescription && (
              <p
                className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed"
                aria-label="Professional description"
              >
                <span className="inline-block">
                  {[
                    "I",
                    "turn",
                    "raw",
                    "data",
                    "into",
                    "insights,",
                    "build",
                    "full-stack",
                    "web",
                    "apps,",
                    "and",
                    "develop",
                    "smart",
                    "IoT",
                    "systems",
                    "—",
                    "from",
                    "Power",
                    "BI",
                    "dashboards",
                    "to",
                    "React",
                    "interfaces",
                    "to",
                    "Arduino-based",
                    "automation.",
                  ].map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.1,
                        ease: "easeOut",
                      }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <br className="hidden md:block" />
                <span className="inline-block mt-2">
                  {["I", "love", "creating", "real-world", "solutions", "that", "matter."].map((word, index) => (
                    <motion.span
                      key={index + 100}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 3.2 + index * 0.1,
                        ease: "easeOut",
                      }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </p>
            )}
          </div>
        </div>

        {showActions && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 animate-fade-in">
            <nav aria-label="Social media links" className="flex space-x-4">
              <a
                href="https://github.com/devashish588"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 professional-card rounded-2xl hover:scale-110 transition-all duration-300 hover:border-aura-indigo/50 focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20 focus:outline-none"
                aria-label="Visit Devashish's GitHub profile"
              >
                <Github size={28} className="text-muted-foreground group-hover:text-aura-indigo transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/devashish-bose-bb044223a"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 professional-card rounded-2xl hover:scale-110 transition-all duration-300 hover:border-aura-indigo/50 focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20 focus:outline-none"
                aria-label="Visit Devashish's LinkedIn profile"
              >
                <Linkedin size={28} className="text-muted-foreground group-hover:text-aura-indigo transition-colors" />
              </a>
              <a
                href="mailto:bosedevashish7@gmail.com"
                className="group p-4 professional-card rounded-2xl hover:scale-110 transition-all duration-300 hover:border-aura-indigo/50 focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20 focus:outline-none"
                aria-label="Send email to Devashish"
              >
                <Mail size={28} className="text-muted-foreground group-hover:text-aura-indigo transition-colors" />
              </a>
            </nav>

            <a
              href="/Devashish-Bose-Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-aura-indigo to-dill-green text-white font-outfit font-bold rounded-2xl hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-aura-indigo"
              aria-label="Download Devashish's resume as PDF"
            >
              <Download size={20} aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          </div>
        )}

        {showActions && (
          <button
            onClick={scrollToNext}
            className="animate-bounce p-2 rounded-full professional-card hover:border-aura-indigo/50 transition-all duration-300 focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20 focus:outline-none"
            aria-label="Scroll to About section"
          >
            <ArrowDown size={24} className="text-aura-indigo" />
          </button>
        )}
      </div>

      {/* Background Effects - Hidden from screen readers */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aura-indigo/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dill-green/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-butter-yellow/10 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute top-20 left-20 w-2 h-2 bg-aura-indigo/30 rounded-full animate-float delay-300" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-dill-green/40 rounded-full animate-float delay-700" />
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-butter-yellow/30 rounded-full animate-float delay-1000" />
      </div>
    </section>
  )
}
