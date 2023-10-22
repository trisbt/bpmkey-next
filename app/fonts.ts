import localFont from 'next/font/local'
import { Public_Sans } from 'next/font/google'

export const logoFont = localFont({
    src: '../public/A4SPEED-Bold.ttf',
    variable: '--font-logo',
    display: 'swap',
  })

export const publicSans = Public_Sans({
  // weight: '600',
  subsets: ['latin'],
  display: 'swap',
})