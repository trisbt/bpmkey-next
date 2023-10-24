import GetSpotifyArtist from '@/app/server_components/GetSpotifyArtist'
import React from 'react'
import ArtistTopTracksCards from './ArtistTopTracksCards'
import { SongDetails } from '@/app/types/dataTypes'

const ArtistPage = async ({
  params,
}: {
  params: { artist: [string, string, string] };
}) => {
  const artist = params.artist[0];
  const id = params.artist[1];
  const results: SongDetails[] = await GetSpotifyArtist(id);
  

  return (
    <div className='background-gradient'>
      <ArtistTopTracksCards results={results} artist={artist} />
    </div>
  )
}

export default ArtistPage;