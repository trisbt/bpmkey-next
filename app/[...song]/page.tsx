import React from 'react'
import SongPageCard from './SongPageCard'
import GetSpotifyById from '../server_components/GetSpotifyById'
const SongPage = async ({ params }) => {
  const song = params.song[0];
  const artist = params.song[1];
  const id = params.song[2];
  const songDetails = await GetSpotifyById(id);
  return (
    <div className='background-gradient'>
      <SongPageCard songDetails={songDetails} artist={artist} song={song} id={id} />
    </div>
  )
}

export default SongPage