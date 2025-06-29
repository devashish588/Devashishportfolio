import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import Joi from "joi"

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name must not exceed 100 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  subject: Joi.string().min(5).max(200).required().messages({
    "string.empty": "Subject is required",
    "string.min": "Subject must be at least 5 characters long",
    "string.max": "Subject must not exceed 200 characters",
  }),
  message: Joi.string().min(10).max(2000).required().messages({
    "string.empty": "Message is required",
    "string.min": "Message must be at least 10 characters long",
    "string.max": "Message must not exceed 2000 characters",
  }),
})

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3 // Max 3 emails per 15 minutes per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const userRequests = rateLimitMap.get(ip) || []

  // Remove old requests outside the window
  const validRequests = userRequests.filter((timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW)

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  // Add current request
  validRequests.push(now)
  rateLimitMap.set(ip, validRequests)

  return false
}

function createTransporter() {
  // Configure your email service here
  // Example with Gmail (you'll need to set up App Password)
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  })

  // Alternative: Using SMTP (more flexible)
  /*
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  */
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait before sending another message.",
        },
        { status: 429 },
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { error, value } = contactSchema.validate(body, { abortEarly: false })

    if (error) {
      const validationErrors = error.details.reduce(
        (acc, detail) => {
          const field = detail.path[0] as string
          acc[field] = detail.message
          return acc
        },
        {} as Record<string, string>,
      )

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          validationErrors,
        },
        { status: 400 },
      )
    }

    const { name, email, subject, message } = value

    // Create email transporter
    const transporter = createTransporter()

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError)
      return NextResponse.json(
        {
          success: false,
          error: "Email service is currently unavailable. Please try again later.",
        },
        { status: 503 },
      )
    }

    // Email content for Devashish
    const emailToDevashish = {
      from: process.env.EMAIL_USER,
      to: "bosedevashish7@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #4f46e5, #059669); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact Message</h1>
          </div>
          
          <div style="padding: 20px; background: #f9fafb;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #4f46e5; margin-top: 0;">Contact Details</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5;">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #4f46e5; margin-top: 0;">Message</h2>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #4f46e5;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; background: #f3f4f6; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This message was sent from your portfolio website contact form.
            </p>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">
              Sent at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
New Portfolio Contact Message

From: ${name} (${email})
Subject: ${subject}

Message:
${message}

Sent at: ${new Date().toLocaleString()}
      `,
    }

    // Confirmation email for sender
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Devashish Bose",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #4f46e5, #059669); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Your Message!</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <div style="background: white; padding: 25px; border-radius: 8px;">
              <h2 style="color: #4f46e5; margin-top: 0;">Hi ${name},</h2>
              
              <p style="line-height: 1.6; color: #374151;">
                Thank you for reaching out through my portfolio website! I've received your message and will get back to you as soon as possible.
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5;">
                <h3 style="margin-top: 0; color: #4f46e5;">Your Message Summary:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message.substring(0, 150)}${message.length > 150 ? "..." : ""}</p>
              </div>
              
              <p style="line-height: 1.6; color: #374151;">
                I typically respond within 24-48 hours. In the meantime, feel free to:
              </p>
              
              <ul style="color: #374151; line-height: 1.6;">
                <li>Check out my <a href="https://github.com/devashish588" style="color: #4f46e5;">GitHub profile</a> for more projects</li>
                <li>Connect with me on <a href="https://linkedin.com/in/devashish-bose-bb044223a" style="color: #4f46e5;">LinkedIn</a></li>
                <li>Explore my portfolio for more details about my work</li>
              </ul>
              
              <p style="line-height: 1.6; color: #374151;">
                Best regards,<br>
                <strong style="color: #4f46e5;">Devashish Bose</strong><br>
                Data Science & IoT Enthusiast
              </p>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; background: #f3f4f6; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This is an automated confirmation email.
            </p>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">
              If you didn't send this message, please ignore this email.
            </p>
          </div>
        </div>
      `,
      text: `
Hi ${name},

Thank you for reaching out through my portfolio website! I've received your message and will get back to you as soon as possible.

Your Message Summary:
Subject: ${subject}
Message: ${message.substring(0, 200)}${message.length > 200 ? "..." : ""}

I typically respond within 24-48 hours.

Best regards,
Devashish Bose
Data Science & IoT Enthusiast

This is an automated confirmation email.
      `,
    }

    // Send both emails
    await Promise.all([transporter.sendMail(emailToDevashish), transporter.sendMail(confirmationEmail)])

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! You should receive a confirmation email shortly.",
    })
  } catch (error) {
    console.error("Contact form error:", error)

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred. Please try again later or contact me directly at bosedevashish7@gmail.com.",
      },
      { status: 500 },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
