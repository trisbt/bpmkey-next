import Image from 'next/image'
import { Grid } from '@mui/material'
import Splash from './components/Splash'
import TopTracks from './components/TopTracks'

export default function Home() {
  return (
   <div>
    <Grid item container justifyContent={'center'}xs = {12}>
    <Splash/>
    <TopTracks/>
    </Grid>
   </div>
  )
}
