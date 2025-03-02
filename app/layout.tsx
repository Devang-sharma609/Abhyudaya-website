import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeCraft - College Coding Club",
  description: "The premier coding club at our university, dedicated to fostering innovation and technical excellence.",
  keywords: [
    "coding club",
    "programming",
    "college",
    "university",
    "tech",
    "AI/ML",
    "web development",
    "cloud computing",
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'