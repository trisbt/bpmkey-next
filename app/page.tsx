import Image from 'next/image'
import { Grid } from '@mui/material'
import Splash from './components/Splash'
import TopTracks from './components/TopTracks'
import GetTopTracks from './server_components/GetTopTracks'

export default function Home() {
  return (
    <div className='background-image'>
      <Grid item container justifyContent={'center'} xs={12}>
        <Splash />
        <GetTopTracks />
      </Grid>
    </div>
  )
}
