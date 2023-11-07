import Image from 'next/image'
import Splash from './components/Splash'
import TopTracks from './components/TopTracks'
import GetTopTracks from './server_components/GetTopTracks'
import { ThemeProvider } from '@mui/material'
import { archivoTheme } from './theme'
import { Suspense } from 'react'
import { SkeletonTopTracks } from './components/SkeletonTopTracks'
import HorizontalAd from './components/HorizontalAd'



export default async function Home() {
  const topTracksData = await GetTopTracks();
  return (
    <div className='background-image flex flex-col items-center min-h-[140em]'>
      <ThemeProvider theme={archivoTheme}>
        <Splash />
      </ThemeProvider>
        <TopTracks results={topTracksData} />
    </div>
  )
}
