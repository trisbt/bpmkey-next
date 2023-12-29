import Image from 'next/image';
import Splash from './components/Splash';
import TopTracks from './components/TopTracks';
import GetTopTracks from './server_components/GetTopTracks';
import { ThemeProvider } from '@mui/material';
import { archivoTheme, theme } from './theme';
import HorizontalAd from './components/HorizontalAd';
import CloudRender from './components/CloudRender'

export default async function Home() {
  const topTracksData = await GetTopTracks();
  return (
    <div className='background-image flex flex-col items-center min-h-[140em]'>
      <ThemeProvider 
      theme={archivoTheme}
      // theme = {theme}
      >
         <Splash />
      </ThemeProvider>

      <CloudRender />
      {/* <HorizontalAd /> */}
      <TopTracks results={topTracksData} />
      <HorizontalAd />
    </div>
  )
}
