"use client"

import { useState } from "react"
import { Github, ExternalLink, Star, GitFork, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function GitHubProfile() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="professional-card p-8 rounded-3xl hover:border-aura-indigo/50 transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-aura-indigo/20 to-dill-green/20 rounded-2xl border border-aura-indigo/30">
            <Github className="text-aura-indigo" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-outfit text-aura-indigo">GitHub Profile</h3>
            <p className="text-muted-foreground font-inter">@devashish588</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isHovered ? 15 : 0 }} transition={{ duration: 0.3 }}>
          <ExternalLink className="text-muted-foreground" size={20} />
        </motion.div>
      </div>

      <p className="text-muted-foreground font-inter mb-6 leading-relaxed">
        Explore my open-source projects, contributions, and code repositories showcasing data science, IoT development,
        and web applications.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Eye size={16} className="text-aura-indigo" />
            <span className="text-sm font-jetbrains-mono font-bold text-aura-indigo">Public</span>
          </div>
          <p className="text-xs text-muted-foreground">Repositories</p>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star size={16} className="text-dill-green" />
            <span className="text-sm font-jetbrains-mono font-bold text-dill-green">Stars</span>
          </div>
          <p className="text-xs text-muted-foreground">Earned</p>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <GitFork size={16} className="text-butter-yellow" />
            <span className="text-sm font-jetbrains-mono font-bold text-butter-yellow">Forks</span>
          </div>
          <p className="text-xs text-muted-foreground">Created</p>
        </div>
      </div>

      <a
        href="https://github.com/devashish588"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-3 w-full px-6 py-4 bg-gradient-to-r from-aura-indigo to-dill-green text-white font-outfit font-bold rounded-2xl hover:from-aura-indigo/90 hover:to-dill-green/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-aura-indigo"
        aria-label="Visit Devashish's GitHub profile (opens in new tab)"
      >
        <Github size={20} />
        <span>Visit GitHub Profile</span>
        <ExternalLink size={16} />
      </a>
    </motion.div>
  )
}
