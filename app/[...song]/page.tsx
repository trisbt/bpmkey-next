import React from 'react'
import SongPageCard from './SongPageCard'
import GetSpotifyById from '../server_components/GetSpotifyById'
import GetSpotifyRecs from '../server_components/GetSpotifyRecs'
import { SongPageProps } from '../types/pageTypes'
import { SongDetails } from '../types/dataTypes'


const SongPage: React.FC<SongPageProps> = async ({ params }) => {
  const song = params.song[0];
  const artist = params.song[1];
  const id = params.song[2];
  const songDetails: SongDetails = await GetSpotifyById(id);
  const seedArtist = songDetails.artistId;

  const recs = await GetSpotifyRecs(id, seedArtist)
  // console.log(recs)
  return (
    <div className='background-gradient'>
      <SongPageCard songDetails={songDetails} artist={artist} song={song} id={id} recs={recs} />
    </div>
  )
}

export default SongPage