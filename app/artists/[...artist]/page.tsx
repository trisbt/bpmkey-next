import GetSpotifyArtist from '@/app/server_components/GetSpotifyArtist'
import React from 'react'
import ArtistTopTracksCards from './ArtistTopTracksCards'
import { SongDetails } from '@/app/types/dataTypes'
import type { Metadata, ResolvingMetadata } from 'next'

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


export async function generateMetadata({
  params,
}: {
  params: { artist: [string, string, string] };
},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const artist = params.artist[0];
  const id = params.artist[1];
  const results: SongDetails[] = await GetSpotifyArtist(id);
  const metaArtist = results[0].artists[0].name;
  const metaSong = results[0].name;
  const metaKey = results[0].key;
  const metaBPM = results[0].tempo;
  return {
    title: `Bpm, Key, Credits for Top Tracks by ${metaArtist}`, 
    description:`Key, BPM, Credits for Top Tracks by ${metaArtist}, like ${metaSong} Key: ${metaKey} BPM: ${metaBPM}.
    Find Key, Tempo and additional metrics like Credits, Loudness, Popularity, Energy.`,
    alternates:{
      canonical:`https://www.bpmkey.com/artists/${artist}/${id}`
    }
  }
}

export default ArtistPage;