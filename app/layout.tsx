import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SkipLink from "@/components/accessibility/skip-link"

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
  viewport: "width=device-width, initial-scale=1",
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
    generator: 'v0.dev'
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
        <SkipLink />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
