import GetSpotifyAlbum from '@/app/server_components/GetSpotifyAlbum';
import React from 'react'
import AlbumTrackCards from './AlbumTrackCards';
import { AlbumDetails } from '@/app/types/dataTypes';
import type { Metadata, ResolvingMetadata } from 'next'

const AlbumPage = async ({
  params,
}: {
  params: { album: [string, string] };
}) => {
  const album = params.album[0];
  const id = params.album[1];
  const results: AlbumDetails[] = await GetSpotifyAlbum(id);

  return (
    <div className='background-gradient min-h-[40em]'>
      <AlbumTrackCards results={results} album={album} />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { album: [string, string]  };
},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const album = params.album[0];
  const id = params.album[1];
  const results: AlbumDetails[] = await GetSpotifyAlbum(id);
  const metaArtist = results[results.length - 1].artist;
  const metaAlbum = results[results.length - 1].album;
  const metaSong = results[0].name;
  const metaKey = results[0].key;
  const metaBPM = results[0].tempo;
  return {
    title: `Bpm, Key, Credits for the album ${metaAlbum} by ${metaArtist} at BpmKey`,
    description:`Key, BPM, Credits for the album ${metaAlbum} by ${metaArtist}, like ${metaSong} Key: ${metaKey} BPM: ${metaBPM}.
    Find Key, Tempo and additional metrics like Credits, Loudness, Popularity, Energy.`,
    alternates:{
      canonical:`https://www.bpmkey.com/album/${params.album[0]}/${id}`
    }
  }
}

export default AlbumPage;