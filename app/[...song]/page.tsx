import React from 'react'
import SongPageCard from './SongPageCard'
import GetSpotifyById from '../server_components/GetSpotifyById'
import GetSpotifyRecs from '../server_components/GetSpotifyRecs'
import { SongDetails, Recs } from '../types/dataTypes'

const SongPage = async({
  params,
}: {
  params: { song: [string, string, string] };
}) =>{
  const song = params.song[0];
  const artist = params.song[1];
  const id = params.song[2];
  const songDetails: SongDetails = await GetSpotifyById(id);
  const seedArtist = songDetails.artistId;
  const recs: Recs[] = await GetSpotifyRecs(id, seedArtist)

  return (
    <div className='background-gradient min-h-[100em]'>
      <SongPageCard songDetails={songDetails} artist={artist} song={song} id={id} recs={recs} />
    </div>
  )
}

export default SongPage;