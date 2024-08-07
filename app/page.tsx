import Image from 'next/image';
import dynamic from 'next/dynamic';
import Splash from './ui/Splash';
import TopTracks from './ui/TopTracks';
import GetTopTracks from './server_components/GetTopTracks';
import { ThemeProvider } from '@mui/material';
import { archivoTheme, theme } from './theme';
import HorizontalAd from './ui/ad components/HorizontalAd';
import CloudRender from './ui/CloudRender';


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
      <TopTracks results={topTracksData} />
      {/* <HorizontalAd /> */}
    </div>
  )
}
