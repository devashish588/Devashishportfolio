"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Typewriter from "./typewriter"

export default function Skills() {
  const [showCategories, setShowCategories] = useState(false)
  const [showCompetencies, setShowCompetencies] = useState(false)
  const [showCertifications, setShowCertifications] = useState(false)

  const skillCategories = [
    {
      title: "Data & Analytics",
      skills: [
        "Python (Pandas, Scikit-learn)",
        "R Programming",
        "SQL (MySQL, Hive)",
        "DAX (Power BI & Excel)",
        "Power BI, Tableau, Excel",
        "Data Cleaning & Preprocessing",
        "Statistical Analysis, A/B Testing",
        "Hadoop, MapReduce, HDFS",
      ],
      icon: "🧠",
      color: "aura-indigo",
    },
    {
      title: "Software & Programming",
      skills: [
        "Python, C++, R, JavaScript",
        "React.js",
        "Git & GitHub",
        "Jupyter Notebooks",
        "Object-Oriented Programming (OOP)",
      ],
      icon: "💻",
      color: "dill-green",
    },
    {
      title: "Web Development",
      skills: [
        "HTML, CSS, JavaScript",
        "React.js",
        "PHP, Node.js",
        "MySQL Databases",
        "Full-Stack Web Apps",
        "User Authentication & CRUD Operations",
      ],
      icon: "🌐",
      color: "butter-yellow",
    },
    {
      title: "IoT & Embedded Systems",
      skills: [
        "Arduino, ESP32/8266",
        "Raspberry Pi",
        "Sensors & Actuators",
        "Circuit Design & Debugging",
        "Microcontroller Programming (C++)",
        "IoT System Integration",
      ],
      icon: "🔌",
      color: "cherry-red",
    },
  ]

  const toolsAndPlatforms = [
    "Git, GitHub",
    "Power BI, Excel, Tableau",
    "VS Code, Arduino IDE",
    "Jupyter Notebooks",
    "Google Colab",
  ]

  const certifications = [
    { name: "Introduction to SQL", org: "Simplilearn", date: "Mar 2025" },
    { name: "R Programming", org: "Simplilearn", date: "Jan 2025" },
    { name: "Power BI Virtual Internship", org: "PwC Forage", date: "Jul 2024" },
    { name: "Python Basics", org: "Infosys Springboard", date: "Mar 2023" },
  ]

  const coreCompetencies = [
    "Data Analysis & Visualization",
    "Machine Learning Implementation",
    "IoT System Development",
    "Full-Stack Web Development",
    "Database Design & Management",
    "Statistical Modeling",
    "Hardware-Software Integration",
    "Project Management",
  ]

  return (
    <section id="skills" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black font-outfit gradient-text-primary mb-6 tracking-tight">
            <Typewriter
              text="Technical Skills"
              delay={200}
              speed={80}
              onComplete={() => setShowCategories(true)}
              cursor={false}
            />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-aura-indigo to-dill-green mx-auto rounded-full" />
        </motion.div>

        {/* Skills Categories */}
        {showCategories && (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group professional-card p-8 rounded-3xl hover:border-${category.color}/50 transition-all duration-300 hover:scale-105`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3
                  className={`text-xl font-bold font-outfit text-${category.color} mb-6 group-hover:text-${category.color}/80 transition-colors`}
                >
                  <Typewriter text={category.title} delay={500 + index * 200} speed={50} cursor={false} />
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-${category.color} rounded-full`} />
                      <span className="text-muted-foreground font-inter text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tools & Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold font-outfit text-dill-green mb-8 text-center">
            <Typewriter text="📦 Tools & Platforms" delay={300} speed={70} cursor={false} />
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {toolsAndPlatforms.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="gradient-bg-accent p-4 rounded-xl border border-dill-green/20 text-center hover:border-dill-green/40 transition-all duration-300"
              >
                <span className="text-foreground font-inter font-medium text-sm">{tool}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
          onViewportEnter={() => setShowCompetencies(true)}
        >
          <h3 className="text-3xl font-bold font-outfit text-aura-indigo mb-8 text-center">
            {showCompetencies && <Typewriter text="Core Competencies" delay={300} speed={70} cursor={false} />}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreCompetencies.map((competency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="gradient-bg-primary p-4 rounded-xl border border-aura-indigo/20 text-center hover:border-aura-indigo/40 transition-all duration-300"
              >
                <span className="text-foreground font-inter font-medium text-sm">{competency}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="professional-card p-10 rounded-3xl"
          onViewportEnter={() => setShowCertifications(true)}
        >
          <h3 className="text-3xl font-bold font-outfit text-aura-indigo mb-8 text-center">
            {showCertifications && <Typewriter text="Certifications" delay={300} speed={70} cursor={false} />}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 bg-muted/30 rounded-2xl border border-border/50 hover:border-aura-indigo/30 transition-all duration-300"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-aura-indigo to-dill-green rounded-full mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-foreground font-semibold font-outfit">{cert.name}</h4>
                  <p className="text-aura-indigo text-sm font-medium">{cert.org}</p>
                  <p className="text-muted-foreground text-xs font-jetbrains-mono">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
