import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './loading'
import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import ThemeRegistry from './ThemeRegistry'
import Script from 'next/script'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: `BpmKey - Find A Song's Key, BPM, and Credits`,
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
        <Script
          id="Absence-banner"
          async
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="landscape:w-screen">

        <ThemeRegistry options={{ key: 'mui' }}>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              <Suspense fallback={<Loading />}>
                {children}
                <Analytics />
              </Suspense>
            </div>
            <Footer />
          </div>
        </ThemeRegistry>
      </body>
    </html>
  )
}
