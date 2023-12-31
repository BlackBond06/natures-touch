import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modalProvider'
import { ToasterProvider } from '@/providers/toastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NaturesTouch Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <ClerkProvider>

    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider/>
        <ModalProvider/>
        {children}
      </body>
    </html>

    </ClerkProvider>
  )
}
