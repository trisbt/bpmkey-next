import React from 'react';
import GetSpotifyPlaylist from '@/app/server_components/GetSpotifyPlaylist'
import GenreTrackCards from './GenreTrackCards';
import { GenreCardProps } from '@/app/types/cardTypes'
import type { Metadata, ResolvingMetadata } from 'next'

const GenrePage = async ({
  params,
}: {
  params: { genre: [string] };
}) => {

  const genreID = params.genre[0];
  const spotifyPlaylistResults: GenreCardProps = await GetSpotifyPlaylist(genreID);
  const {playlistImage, playlistURL, playlistName, playlistDescription, results}  = spotifyPlaylistResults;
  // console.log(spotifyPlaylistResults)
  return (
    <div className='background-gradient'>
      <GenreTrackCards results={results} playlistURL={playlistURL} playlistImage={playlistImage} playlistName={playlistName}playlistDescription={playlistDescription}/>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { genre: [string] };
},
  parent: ResolvingMetadata
): Promise<Metadata> {
  // const genre = params.genre[0];
  const genreID = params.genre[0];
  const spotifyPlaylistResults: GenreCardProps = await GetSpotifyPlaylist(genreID);
  const {playlistImage, playlistURL, playlistName, playlistDescription}  = spotifyPlaylistResults;
  const metaArtist = spotifyPlaylistResults.results[0].artists[0].name;
  const metaSong = spotifyPlaylistResults.results[0].name;
  const metaKey = spotifyPlaylistResults.results[0].key;
  const metaBPM = spotifyPlaylistResults.results[0].tempo;
  return {
    title: `Bpm, Key, Credits for ${playlistName} tracks`, 
    description:`Key, BPM, Credits for ${playlistName}, like ${metaSong} Key: ${metaKey} BPM: ${metaBPM}.
    Find Key, Tempo and additional metrics like Credits, Loudness, Popularity, Energy.`,
    alternates:{
      canonical:`https://www.bpmkey.com/genre/${genreID}`
    }
  }
}

export default GenrePage;