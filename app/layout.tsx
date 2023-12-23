import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './loading'
import { Suspense } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import ThemeRegistry from './ThemeRegistry'
import Script from 'next/script'

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
// }

export const metadata: Metadata = {
  title: `BpmKey - Find A Song's Key, BPM, and Credits`,
  description: `Find any song's Key, BPM and additional metrics like Song Credits, Loudness, Popularity, and Energy.`,
  alternates:{
    canonical: 'https://www.bpmkey.com'
  },
  viewport: 
    "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
  
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
              {/* <Suspense fallback={<Loading />}> */}
                {children}
                <Analytics />
                <SpeedInsights/>
              {/* </Suspense> */}
            </div>
            <Footer />
          </div>
        </ThemeRegistry>
      </body>
    </html>
  )
}
