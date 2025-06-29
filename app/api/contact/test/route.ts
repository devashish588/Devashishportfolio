import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET() {
  try {
    // Test email configuration
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Verify connection
    await transporter.verify()

    return NextResponse.json({
      success: true,
      message: "Email configuration is working correctly",
      config: {
        user: process.env.EMAIL_USER ? "Set" : "Not set",
        pass: process.env.EMAIL_PASS ? "Set" : "Not set",
      },
    })
  } catch (error) {
    console.error("Email test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Email configuration test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
