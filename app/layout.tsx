import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fashion Finds",
  description: "Discover the latest fashion trends",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar />
            <main className="min-h-screen bg-gray-50">{children}</main>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}
