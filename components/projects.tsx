"use client"

import { useState } from "react"
import { Github, Code, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Typewriter from "./typewriter"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [showProjects, setShowProjects] = useState(false)

  const projects = [
    {
      title: "Big Data Analysis using Hadoop",
      description:
        "Processed 5GB+ datasets using HDFS and MapReduce. Queried structured data with Hive and visualized KPIs in Tableau for comprehensive business intelligence.",
      technologies: ["Hadoop", "Python", "Hive", "Tableau", "HDFS", "MapReduce"],
      github: "https://github.com/devashish588/hadoop-big-data-analysis",
      category: "Data Engineering",
      status: "Completed",
      image: "/images/hadoop.jpg",
    },
    {
      title: "Predictive Maintenance using Sensor Data",
      description:
        "Developed a machine learning solution to predict equipment failures in advance using the NASA Turbofan Engine Degradation dataset. Built a classification model capable of forecasting machine failure 10 cycles ahead, helping reduce potential downtime by 15%. The project demonstrates practical application of sensor data analysis for proactive maintenance in industrial settings.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Random Forests"],
      github: "https://github.com/devashish588/Predictive_Maintenance",
      category: "Data Engineering",
      status: "Completed",
      image: "public\images\PMUSD.jpg",
    },
    {
      title: "Automated Attendance System Using RFID",
      description:
        "Developed a real-time attendance system with Arduino and RFID technology. Integrated system with databases for efficient record-keeping and reporting.",
      technologies: ["Arduino", "C++", "RFID", "MySQL", "PHP"],
      github: "https://github.com/devashish588/Automated-Attendance-System-Using-RFID",
      category: "IoT Development",
      status: "Completed",
      image: "/images/rfid-attendance-system.jpg",
    },
    {
      title: "Data Visualization Dashboard",
      description:
        "Analyzed and cleaned complex datasets for business insights. Built interactive dashboards for PwC's virtual internship to display key performance indicators.",
      technologies: ["Power BI", "Excel", "DAX", "SQL"],
      github: "https://github.com/devashish588/Sales-Trend-Analysis-SQL",
      category: "Data Analytics",
      status: "Completed",
      image: "/images/power-bi-dashboard-enhanced.png",
    },
    {
      title: "Full Stack Web Application",
      description:
        "Created dynamic, responsive websites with comprehensive backend support. Implemented user authentication, content management, and database integration.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Node.js"],
      github: "https://github.com/devashish588/fullstack-web-app",
      category: "Web Development",
      status: "Completed",
      image: "public\images\Portfolio.jpg",
    },
    {
      title: "Machine Learning Prediction Model - Twitter Sentiment Analysis",
      description:
        "Built predictive models using scikit-learn for sentiment analysis on Twitter data. Implemented feature engineering, text preprocessing, and model optimization techniques for accurate emotion detection.",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "NLTK"],
      github: "https://github.com/devashish588/Twitter-sentiment-analysis",
      category: "Machine Learning",
      status: "Completed",
      image: "public\images\twitter.png",
    },
    {
      title: "Smart Home IoT System",
      description:
        "Developed an integrated smart home system using ESP32 and various sensors. Created mobile app for remote monitoring and control of lighting, temperature, and security systems.",
      technologies: ["ESP32", "Arduino", "React Native", "Firebase", "Sensors", "WiFi"],
      github: "https://github.com/devashish588/smart-home-iot",
      category: "IoT Development",
      status: "Completed",
      image: "public\images\HAS.png",
    },
  ]

  const categories = [
    "All",
    "Data Engineering",
    "Data Analytics",
    "IoT Development",
    "Web Development",
    "Machine Learning",
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const getProjectAltText = (project: any) => {
    switch (project.title) {
      case "Big Data Analysis using Hadoop":
        return "Abstract visualization of big data processing showing interconnected data nodes, network connections, and analytical workflows representing Hadoop ecosystem with HDFS and MapReduce operations for large-scale data analysis."
      case "Predictive Maintenance using Sensor Data":
        return "Predictive maintenance visualization of NASA Turbofan Engine Degradation sensor time-series with machine learning classification forecasting failures 10 cycles ahead, demonstrating proactive maintenance on industrial equipment."
      case "Automated Attendance System Using RFID":
        return "RFID-based attendance system prototype showing Arduino Uno microcontroller connected to RFID-RC522 module, green LCD display, and white breadboard with colorful jumper wires. The blue RFID reader module displays the characteristic antenna symbol, demonstrating a complete IoT hardware implementation for automated attendance tracking."
      case "Data Visualization Dashboard":
        return "Professional Power BI business intelligence dashboard featuring comprehensive sales analytics with key performance indicators showing 413.69M total revenue and 997K sales quantity. The dashboard includes interactive time filters for years 2017-2020 and monthly selection from Jan-18 to Jul-18. Multiple visualizations display: Revenue by Market analysis with Delhi NCR leading at 221M followed by Mumbai at 63M and Ahmedabad at 56M; Top 5 Products breakdown showing blank entries at 138M with Prod040, Prod159, Prod239, and Prod245 following; Revenue trends over time from Jan 2018 to Nov 2018 with seasonal patterns; Top 5 Customer analysis featuring a pie chart with Electricalsara Stores dominating at 173.05M representing 64.7% of total revenue; and Sales quantity by Markets showing Delhi NCR at 171K units leading other major Indian cities. This demonstrates advanced Power BI proficiency in creating interactive business intelligence solutions for data-driven decision making."
      case "Full Stack Web Application":
        return "Modern web development setup showing clean code on multiple monitors with HTML, CSS, JavaScript, and backend technologies. The workspace displays responsive web design elements, database schemas, and full-stack architecture representing comprehensive web application development."
      case "Machine Learning Prediction Model - Twitter Sentiment Analysis":
        return "Machine learning and artificial intelligence visualization showing data analysis charts, neural network diagrams, and sentiment analysis graphs. The image represents AI algorithms processing social media data for emotion detection and predictive modeling using Python and scikit-learn."
      case "Smart Home IoT System":
        return "Modern smart home setup featuring IoT devices including smart lighting, temperature sensors, security cameras, and mobile control interface. The image shows ESP32 microcontrollers, various sensors, and wireless connectivity representing an integrated home automation system."
      default:
        return `${project.title} project demonstration showcasing technical implementation and results`
    }
  }

  return (
    <section id="projects" className="min-h-screen py-20 px-6" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            id="projects-heading"
            className="text-5xl md:text-7xl font-black font-outfit gradient-text-primary mb-6 tracking-tight"
          >
            <Typewriter
              text="Featured Projects"
              delay={200}
              speed={90}
              onComplete={() => setShowProjects(true)}
              cursor={false}
            />
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-aura-indigo to-dill-green mx-auto rounded-full mb-6"
            aria-hidden="true"
          />
          {showProjects && (
            <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
              <Typewriter
                text="Explore my portfolio of data science, IoT, and web development projects that showcase practical problem-solving skills"
                delay={500}
                speed={30}
                cursor={false}
              />
            </p>
          )}
        </div>

        {/* Filter Buttons */}
        {showProjects && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="text-aura-indigo" size={20} aria-hidden="true" />
              <span className="text-aura-indigo font-outfit font-semibold">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Project category filters">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-2xl font-outfit font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aura-indigo focus:ring-offset-2 focus:ring-offset-background ${
                    activeFilter === category
                      ? "bg-gradient-to-r from-aura-indigo to-dill-green text-white shadow-lg transform scale-105"
                      : "professional-card text-muted-foreground hover:text-aura-indigo hover:border-aura-indigo/50"
                  }`}
                  aria-pressed={activeFilter === category}
                  aria-label={`Filter projects by ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <motion.div layout className="grid lg:grid-cols-2 gap-8" role="region" aria-label="Project showcase">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group professional-card rounded-3xl hover:border-aura-indigo/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] transform overflow-hidden focus-within:border-aura-indigo/50 focus-within:ring-2 focus-within:ring-aura-indigo/20"
              >
                {/* Project Image */}
                <div className="relative h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden rounded-t-3xl bg-muted/20">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={getProjectAltText(project)}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-jetbrains-mono font-bold backdrop-blur-sm ${
                        project.status === "Completed"
                          ? "bg-dill-green/20 text-dill-green border border-dill-green/30"
                          : "bg-butter-yellow/20 text-butter-yellow border border-butter-yellow/30"
                      }`}
                      aria-label={`Project status: ${project.status}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Code className="text-aura-indigo flex-shrink-0" size={24} aria-hidden="true" />
                      <span className="text-aura-indigo font-semibold font-outfit text-sm px-3 py-1 bg-aura-indigo/10 rounded-full border border-aura-indigo/20">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-outfit text-aura-indigo mb-4 group-hover:text-dill-green transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground font-inter mb-6 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8" role="list" aria-label="Technologies used">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        role="listitem"
                        className="px-3 py-1 gradient-bg-primary text-foreground rounded-xl text-xs md:text-sm font-medium font-outfit border border-aura-indigo/20 hover:border-aura-indigo/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-aura-indigo to-dill-green text-white hover:from-aura-indigo/90 hover:to-dill-green/90 rounded-xl transition-all duration-300 font-outfit font-bold shadow-lg hover:shadow-xl hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-aura-indigo"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github size={18} aria-hidden="true" />
                      <span>View Source</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16" role="status" aria-live="polite">
            <p className="text-muted-foreground text-xl font-inter">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
