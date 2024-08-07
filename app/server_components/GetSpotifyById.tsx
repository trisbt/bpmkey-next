import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { fetchWithRetry } from "../utils";

const GetSpotifyById = async (id: string) => {

    const token = await GetAccessToken();
    
    let uri = `https://api.spotify.com/v1/tracks/${id}`;
    const res = await fetchWithRetry(uri, {
        headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    const trackData = await res.json();
  
    const basicData = {
        name: trackData.name,
        images: trackData.album.images[0].url,
        albumId: trackData.album.id,
        artistId: trackData.artists[0].id,
        id: trackData.id,
        preview_url: trackData.preview_url,
        release_date: trackData.album.release_date,
        artists: trackData.artists,
        albums: trackData.album.name,
        explicit: trackData.explicit,
        popularity: trackData.popularity,
      };
    const audioData = await GetSpotifyAdvancedAudio(token, [id])

    const songDetails = { ...basicData, ...audioData[0] };
    return songDetails;
}

export default GetSpotifyById