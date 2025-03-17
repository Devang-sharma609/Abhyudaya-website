import "@/app/globals.css"
import { Montserrat } from 'next/font/google'
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

const montserrat = Montserrat({
  subsets: ['latin'],
  // You can specify which weights you need
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Abhyudaya Coding Club",
  description: "A coding club where students can learn, collaborate, and build amazing projects together.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}