import GetSpotifyAlbum from '@/app/server_components/GetSpotifyAlbum';
import React from 'react'
import AlbumTrackCards from './AlbumTrackCards';
import { AlbumPageProps } from '@/app/types/pageTypes';
import { AlbumDetails } from '@/app/types/dataTypes';

const AlbumPage: React.FC<AlbumPageProps> = async ({ params }) => {
  const album = params.album[0];
  const id = params.album[1];
  const results: AlbumDetails = await GetSpotifyAlbum(id);
  return (
    <div className='background-gradient'>
      <AlbumTrackCards results={results} album={album} />
    </div>
  )
}

export default AlbumPage;