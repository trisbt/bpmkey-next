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

  return (
    <div className='background-gradient min-h-[100em]'>
      <SongPageCard songDetails={songDetails} artist={artist} song={song} id={id} recs={recs} />
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
  const song = params.song[0];
  const artist = params.song[1];
  return {
    title: `${decodeURI(song.replace(/-/g, ' '))} by ${decodeURI(artist.replace(/-/g, ' '))} Bpm, Key, Credits BpmKey.com`,
    description: `Key BPM Credits finder for ${artist}`
  }
}

export default SongPage;