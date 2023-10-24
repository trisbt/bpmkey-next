import localFont from 'next/font/local'
import { Archivo } from 'next/font/google'

export const logoFont = localFont({
    src: '../public/A4SPEED-Bold.ttf',
    variable: '--font-logo',
    display: 'swap',
  })

export const archivo = Archivo({
  // weight: '700',
  subsets: ['latin'],
  style:['italic', 'normal'],
  display: 'swap',
})