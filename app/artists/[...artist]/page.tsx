import GetSpotifyArtist from '@/app/server_components/GetSpotifyArtist'
import React from 'react'
import ArtistTopTracksCards from './ArtistTopTracksCards'
import { ArtistPageProps } from '@/app/types/pageTypes'

const ArtistPage: React.FC<ArtistPageProps> = async ({ params }) => {
  const artist = params.artist[0];
  const id = params.artist[1];
  const results = await GetSpotifyArtist(id);

  return (
    <div className='background-gradient'>
      <ArtistTopTracksCards results={results} artist={artist} />
    </div>
  )
}

export default ArtistPage;