import React from 'react'
import SongPageCard from './SongPageCard'
import GetSpotifyById from '../server_components/GetSpotifyById'
import GetSpotifyRecs from '../server_components/GetSpotifyRecs'
import { SongDetails, Recs } from '../types/dataTypes'
import type { Metadata, ResolvingMetadata } from 'next'

const SongPage = async ({
  params,
}: {
  params: { song: [string, string, string] };
}) => {
  const song = params.song[0];
  const artist = params.song[1];
  const id = params.song[2];
  const songDetails: SongDetails = await GetSpotifyById(id);
  const seedArtist = songDetails.artistId;
  const recs: Recs[] = await GetSpotifyRecs(id, seedArtist)
  // const recs = [];

  return (
    <div className='background-gradient min-h-[50em]'>
      <SongPageCard songDetails={songDetails} artist={artist} song={song} id={id} recs = {recs}/>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { song: [string, string, string] };
},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.song[2];
  const songDetails: SongDetails = await GetSpotifyById(id);
  const metaArtist = songDetails.artists[0].name;
  const metaSong = songDetails.name;
  const metaKey = songDetails.key;
  const metaBPM = songDetails.tempo;
  return {
    title: `Bpm, Key, Credits for ${metaSong} by ${metaArtist} at BpmKey`,
    description: `Key, BPM, Credits for ${metaSong} by ${metaArtist},
    Key: ${metaKey} Tempo: ${metaBPM} Additional metrics include Credits, Loudness,
    Popularity, Energy`,
    alternates: {
      canonical: `https://www.bpmkey.com/${params.song[0]}/${params.song[1]}/${id}`
    }
  }
}

export default SongPage;