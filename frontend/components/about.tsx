"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Typewriter from "./typewriter"
import GitHubProfile from "./github-profile"

export default function About() {
  const [showContent, setShowContent] = useState(false)

  return (
    <section id="about" className="min-h-screen py-20 px-6" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            id="about-heading"
            className="text-5xl md:text-7xl font-black font-outfit gradient-text-primary mb-6 tracking-tight"
          >
            <Typewriter
              text="About Me"
              delay={200}
              speed={100}
              onComplete={() => setShowContent(true)}
              cursor={false}
            />
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-aura-indigo to-dill-green mx-auto rounded-full"
            aria-hidden="true"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from-aura-indigo via-dill-green to-butter-yellow rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                aria-hidden="true"
              />
              <Image
                src="/images/devashish-profile.jpg"
                alt="Devashish Bose - Professional portrait wearing a light beige blazer with dark shirt and red pocket square, standing confidently in front of ornate wooden carved backdrop. Data Science and IoT student at MITS, RGPV Gwalior."
                width={400}
                height={400}
                className="relative z-10 rounded-3xl border-4 border-aura-indigo/30 object-cover w-full max-w-md mx-auto shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold font-outfit text-aura-indigo mb-4 tracking-wide">
                {showContent && (
                  <Typewriter text="Data Science & IoT Enthusiast" delay={300} speed={60} cursor={false} />
                )}
              </h3>
              <div
                className="w-16 h-1 bg-gradient-to-r from-aura-indigo to-dill-green rounded-full mb-6"
                aria-hidden="true"
              />
            </div>

            {showContent && (
              <div className="space-y-6 text-muted-foreground font-inter leading-relaxed">
                <p className="text-lg md:text-xl">
                  <Typewriter
                    text="I'm a B.Tech student specializing in Internet of Things (IoT) at Madhav Institute of Technology and Science, RGPV, Gwalior. With practical experience in machine learning, statistical modeling, and big data tools including Hadoop and Power BI."
                    delay={800}
                    speed={25}
                    cursor={false}
                  />
                </p>

                <p className="text-lg md:text-xl">
                  <Typewriter
                    text="I excel in converting raw data into actionable insights through effective visualization and analysis. Skilled in Python, SQL, and microcontroller programming, I'm passionate about solving real-world challenges with data-driven solutions."
                    delay={3500}
                    speed={25}
                    cursor={false}
                  />
                </p>

                <p className="text-lg md:text-xl">
                  <Typewriter
                    text="My expertise spans from data analysis and visualization to IoT hardware development, bridging the gap between physical devices and intelligent data processing."
                    delay={6500}
                    speed={25}
                    cursor={false}
                  />
                </p>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-6 mt-10"
              role="region"
              aria-label="Personal information cards"
            >
              <div className="professional-card p-6 rounded-2xl hover:border-aura-indigo/50 transition-all duration-300 focus-within:border-aura-indigo/50 focus-within:ring-2 focus-within:ring-aura-indigo/20">
                <h4 className="text-aura-indigo font-bold font-outfit text-lg mb-3">Education</h4>
                <p className="text-foreground font-semibold">B.Tech in IoT</p>
                <p className="text-muted-foreground text-sm">MITS, RGPV Gwalior</p>
                <p className="text-dill-green font-semibold text-sm">CGPA: 7.0</p>
              </div>

              <div className="professional-card p-6 rounded-2xl hover:border-dill-green/50 transition-all duration-300 focus-within:border-dill-green/50 focus-within:ring-2 focus-within:ring-dill-green/20">
                <h4 className="text-dill-green font-bold font-outfit text-lg mb-3">Contact</h4>
                <p className="text-foreground font-semibold text-sm">+91-910264397</p>
                <p className="text-muted-foreground text-xs break-all">bosedevashish7@gmail.com</p>
                <p className="text-butter-yellow font-semibold text-sm">Gwalior, India</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GitHubProfile />
        </motion.div>
      </div>
    </section>
  )
}
