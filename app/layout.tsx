import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Outfit, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Devashish Bose - Data Science & IoT Portfolio",
  description:
    "Data Science and IoT enthusiast with expertise in machine learning, big data, and microcontroller programming. B.Tech student at MITS, RGPV Gwalior specializing in converting raw data into actionable insights.",
  keywords: "Data Science, IoT, Machine Learning, Python, Arduino, Hadoop, Power BI, Devashish Bose, MITS Gwalior",
  authors: [{ name: "Devashish Bose" }],
  openGraph: {
    title: "Devashish Bose - Data Science & IoT Portfolio",
    description:
      "Data Science and IoT enthusiast with expertise in machine learning, big data, and microcontroller programming.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.dev',
}

// ✅ FIXED: viewport is now exported separately
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-inter antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-aura-indigo focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-aura-indigo"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
