import Image from 'next/image'
import Splash from './components/Splash'
import TopTracks from './components/TopTracks'
import GetTopTracks from './server_components/GetTopTracks'
import { ThemeProvider } from '@mui/material'
import { archivoTheme } from './theme'

export default function Home() {
  return (
    <div className='background-image flex flex-col items-center min-h-[140em]'>
      <ThemeProvider theme={archivoTheme}>
        <Splash />
      </ThemeProvider>
        <GetTopTracks />
    </div>
  )
}
