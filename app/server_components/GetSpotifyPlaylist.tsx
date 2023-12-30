import GetAccessToken from "./GetAccessToken"
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { keyConvert, tempoRound } from "../utils";
import { GetTracksItem } from "../types/serverTypes";

const GetSpotifyPlaylist = async (genre: string) => {
  const token = await GetAccessToken();
  //fetch available playlist for genre
  const genrePlaylistFetch = await fetch(`https://api.spotify.com/v1/browse/categories/${genre}/playlists?limit=20`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!genrePlaylistFetch.ok) {
    throw new Error(`API response failed with status ${genrePlaylistFetch.status}: ${genrePlaylistFetch.statusText}`);
  }
  const genrePlaylist = await genrePlaylistFetch.json();
  
  const playlistId = genrePlaylist.playlists.items[0].id;
  const playlistURL = genrePlaylist.playlists.items[0].href;
  const playlistImage = genrePlaylist.playlists.items[0].images[0].url
  const playlistName = genrePlaylist.playlists.items[0].name;
  const playlistDescription = genrePlaylist.playlists.items[0].description;
  const coverIndex = playlistDescription.indexOf("Cover");
  
  const trimmedDescription = coverIndex !== -1 ? playlistDescription.slice(0, coverIndex) : playlistDescription;
  
  //get the playlist tracks
  const playlistTracksFetch = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });
  if (!playlistTracksFetch.ok) {
    throw new Error(`API response failed with status ${playlistTracksFetch.status}: ${playlistTracksFetch.statusText}`);
  }
  const playlistTracks = await playlistTracksFetch.json();
  // console.log(playlistTracks.items)
  const trackData = playlistTracks.items.map((item: TopTracksItem) => item.track).filter(track => track !== null);
  const trackID = trackData.map(track => track.id);


  const audioData = await GetSpotifyAdvancedAudio(token, trackID);

  const results = [];

  for (let i = 0; i < trackData.length; i++) {
    const combinedObject = {
      ...trackData[i],
      ...audioData[i]
    };
    results.push(combinedObject);
  }

  return {
    results: results,
    playlistURL: playlistURL,
    playlistImage: playlistImage,
    playlistName: playlistName,
    playlistDescription: trimmedDescription,
  };

}
export default GetSpotifyPlaylist;