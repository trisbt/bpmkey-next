import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './loading'
import { Suspense } from 'react'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'BpmKey.com',
  description: `BpmKey - Find A Song's Key, BPM, and Credits`,

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

      </head>
      <body className={inter.className}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
