import GetSpotifyArtist from '@/app/server components/GetSpotifyArtist'
import React from 'react'
import ArtistTopTracksCards from './ArtistTopTracksCards'

const ArtistPage = async ({params}) => {

  // let offset = 1
  const artist = params.artist[0];
  const id = params.artist[1];
  const results = await GetSpotifyArtist(id);

  return (
    <div className='background-gradient'>
    <ArtistTopTracksCards results={results} artist = {artist}/>
  </div>
  )
}

export default ArtistPage;