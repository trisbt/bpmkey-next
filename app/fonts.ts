import localFont from 'next/font/local'
import { Archivo } from 'next/font/google'
import { Inter } from 'next/font/google'


export const inter = Inter({ 
  weight: '500',
  subsets: ['latin'] 
});

export const logoFont = localFont({
    src: '../public/a4speed-bold-webfont.woff2',
    variable: '--font-logo',
    display: 'swap',
  })

export const archivo = Archivo({
  // weight: '700',
  subsets: ['latin'],
  style:['italic', 'normal'],
  display: 'swap',
})