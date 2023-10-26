import GetSpotifyAlbum from '@/app/server_components/GetSpotifyAlbum';
import React from 'react'
import AlbumTrackCards from './AlbumTrackCards';
import { AlbumDetails } from '@/app/types/dataTypes';
import type { Metadata } from 'next'

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

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const album = params.album[0];
  return {
    title: `${decodeURI(album.replace(/-/g, ' '))} Bpm, Key, Credits BpmKey.com`,
    description:`Key BPM Credits finder for ${album}`
  }
}

export default AlbumPage;