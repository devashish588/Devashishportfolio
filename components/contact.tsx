"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"
import Typewriter from "./typewriter"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ValidationErrors {
  [key: string]: string
}

const EMAILJS = {
  serviceId: "service_sv4zwbl",
  templateId: "template_ijeplqd",
  autoReplyId: "template_ltaz7fe",
  publicKey: "UnROHaX9XQSSOqfpP",
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [statusMessage, setStatusMessage] = useState("")
  const alertRef = useRef<HTMLDivElement | null>(null)

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters long"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
      setStatusMessage("")
    }
  }

  const sendWithEmailJS = async () => {
  const params = {
    to_name: "Devashish Bose",
    to_email: "bosedevashish7@gmail.com",
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    reply_to: formData.email,
  }

  // 1️⃣ Send message to YOU
  await emailjs.send(
    EMAILJS.serviceId,
    EMAILJS.templateId, // <-- FIXED: use contact template here
    params,
    { publicKey: EMAILJS.publicKey }
  )

  // 2️⃣ Auto-reply to sender
  try {
    await emailjs.send(
      EMAILJS.serviceId,
      EMAILJS.autoReplyId, // <-- correct for auto reply
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      { publicKey: EMAILJS.publicKey }
    )
  } catch {
    // Ignore auto-reply errors to not affect UX
  }
}


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setStatusMessage("")

    try {
      await sendWithEmailJS()
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setErrors({})
      setTimeout(() => {
        alertRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    } catch (error) {
      console.error("EmailJS send error:", error)
      setSubmitStatus("error")
      setStatusMessage("Failed to send message. Please try again or contact me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-6" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2
            id="contact-heading"
            className="text-5xl md:text-7xl font-black font-outfit gradient-text-primary mb-6 tracking-tight"
          >
            <Typewriter
              text="Get In Touch"
              delay={200}
              speed={100}
              onComplete={() => setShowForm(true)}
              cursor={false}
            />
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-aura-indigo to-dill-green mx-auto rounded-full mb-6"
            aria-hidden="true"
          />
          {showForm && (
            <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
              <Typewriter
                text="I'm always open to discussing new opportunities, collaborations, or just having a chat about data science and IoT innovations!"
                delay={500}
                speed={25}
                cursor={false}
              />
            </p>
          )}
        </div>

        {showForm && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold font-outfit text-aura-indigo mb-8">
                <Typewriter text="Let's Connect" delay={1000} speed={80} cursor={false} />
              </h3>

              <div className="space-y-6" role="list" aria-label="Contact methods">
                <a
                  href="mailto:bosedevashish7@gmail.com"
                  className="group flex items-center space-x-6 p-6 professional-card rounded-2xl hover:border-aura-indigo/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20 focus:outline-none"
                  role="listitem"
                  aria-label="Send email to bosedevashish7@gmail.com"
                >
                  <div className="p-4 gradient-bg-primary rounded-2xl border border-aura-indigo/20" aria-hidden="true">
                    <Mail className="text-aura-indigo group-hover:scale-110 transition-transform" size={28} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-outfit font-medium">Email Address</p>
                    <p className="text-foreground font-inter font-semibold text-lg">bosedevashish7@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+91-910264397"
                  className="group flex items-center space-x-6 p-6 professional-card rounded-2xl hover:border-dill-green/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform focus:border-dill-green focus:ring-2 focus:ring-dill-green/20 focus:outline-none"
                  role="listitem"
                  aria-label="Call +91-910264397"
                >
                  <div className="p-4 gradient-bg-primary rounded-2xl border border-dill-green/20" aria-hidden="true">
                    <Phone className="text-dill-green group-hover:scale-110 transition-transform" size={28} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-outfit font-medium">Phone Number</p>
                    <p className="text-foreground font-inter font-semibold text-lg">+91-910264397</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/devashish-bose-bb044223a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-6 p-6 professional-card rounded-2xl hover:border-butter-yellow/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform focus:border-butter-yellow focus:ring-2 focus:ring-butter-yellow/20 focus:outline-none"
                  role="listitem"
                  aria-label="Visit LinkedIn profile (opens in new tab)"
                >
                  <div className="p-4 gradient-bg-accent rounded-2xl border border-butter-yellow/20" aria-hidden="true">
                    <Linkedin className="text-butter-yellow group-hover:scale-110 transition-transform" size={28} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-outfit font-medium">LinkedIn Profile</p>
                    <p className="text-foreground font-inter font-semibold text-lg">devashish-bose-bb044223a</p>
                  </div>
                </a>

                <div
                  className="flex items-center space-x-6 p-6 professional-card rounded-2xl"
                  role="listitem"
                  aria-label="Location information"
                >
                  <div className="p-4 gradient-bg-primary rounded-2xl border border-cherry-red/20" aria-hidden="true">
                    <MapPin className="text-cherry-red" size={28} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-outfit font-medium">Location</p>
                    <p className="text-foreground font-inter font-semibold text-lg">Gwalior, Madhya Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="professional-card p-8 rounded-3xl">
              <h3 className="text-3xl font-bold font-outfit text-aura-indigo mb-8">
                <Typewriter text="Send a Message" delay={1500} speed={80} cursor={false} />
              </h3>

              {/* Provided success/error banners */}
              {submitStatus === "success" && (
                <div
                  ref={alertRef}
                  className="flex items-center space-x-3 p-4 bg-dill-green/20 border border-dill-green/30 rounded-xl mb-6"
                  role="alert"
                  aria-live="polite"
                >
                  <CheckCircle className="text-dill-green" size={20} aria-hidden={true} />
                  <span className="text-dill-green font-outfit font-medium">
                    {"Message sent successfully! I'll get back to you soon."}
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  className="flex items-center space-x-3 p-4 bg-cherry-red/20 border border-cherry-red/30 rounded-xl mb-6"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle className="text-cherry-red" size={20} aria-hidden={true} />
                  <span className="text-cherry-red font-outfit font-medium">
                    {statusMessage || "Failed to send message. Please try again or contact me directly."}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-foreground font-outfit font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-3 bg-muted/30 border rounded-xl text-foreground font-inter focus:outline-none transition-colors ${
                        errors.name
                          ? "border-cherry-red focus:border-cherry-red focus:ring-2 focus:ring-cherry-red/20"
                          : "border-border focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-cherry-red" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-foreground font-outfit font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-3 bg-muted/30 border rounded-xl text-foreground font-inter focus:outline-none transition-colors ${
                        errors.email
                          ? "border-cherry-red focus:border-cherry-red focus:ring-2 focus:ring-cherry-red/20"
                          : "border-border focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-cherry-red" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-foreground font-outfit font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={`w-full px-4 py-3 bg-muted/30 border rounded-xl text-foreground font-inter focus:outline-none transition-colors ${
                      errors.subject
                        ? "border-cherry-red focus:border-cherry-red focus:ring-2 focus:ring-cherry-red/20"
                        : "border-border focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20"
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-cherry-red" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-foreground font-outfit font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 bg-muted/30 border rounded-xl text-foreground font-inter focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? "border-cherry-red focus:border-cherry-red focus:ring-2 focus:ring-cherry-red/20"
                        : "border-border focus:border-aura-indigo focus:ring-2 focus:ring-aura-indigo/20"
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-cherry-red" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-aura-indigo to-dill-green text-white font-outfit font-bold rounded-2xl hover:from-aura-indigo/90 hover:to-dill-green/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-aura-indigo"
                  aria-describedby={isSubmitting ? "submit-status" : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="text-center mt-20 pt-12 border-t border-border/50">
          <p className="text-muted-foreground font-inter">
            © 2024 Devashish Bose. Crafted with ❤️ using Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  )
}
