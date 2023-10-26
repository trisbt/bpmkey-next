import GetSpotifyArtist from '@/app/server_components/GetSpotifyArtist'
import React from 'react'
import ArtistTopTracksCards from './ArtistTopTracksCards'
import { SongDetails } from '@/app/types/dataTypes'
import type { Metadata } from 'next'

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


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const artist = params.artist[0];
  return {
    title: `${decodeURI(artist.replace(/-/g, ' '))} Top Tracks Bpm, Key, Credits BpmKey.com`,
    description:`Key BPM Credits finder for ${artist}`
  }
}

export default ArtistPage;