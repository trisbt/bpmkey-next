import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { GetTracksItem } from "../types/serverTypes";
import { reverseKeyModeConvert, sleep, fetchWithRetry, minMaxKey } from "../utils";


const GetSpotifyRecs = async (
  seedSong: string, 
  seedArtist: string, 
  targetBpm: number, 
  targetKey: string,
  ) => {
    const token = await GetAccessToken();
    let uri = `https://api.spotify.com/v1/recommendations?limit=11&seed_artists=${seedArtist}&seed_tracks=${seedSong}`;
    // if (seedGenres) {
    //     uri += `&seed_genres=${seedGenres}`;
    // }
    if(targetBpm){
      uri += `&target_tempo=${targetBpm}`;
    }
    if(targetKey){
      let revKey = reverseKeyModeConvert(targetKey).key;
      let minMax = minMaxKey(revKey);
      uri += `&min_key=${minMax[0]}`;
      uri += `&max_key=${minMax[1]}`;
      // uri += `&target_key=${reverseKeyModeConvert(targetKey).key}`;
      uri += `&target_mode=${reverseKeyModeConvert(targetKey).mode}`;
    }

    const res = await fetchWithRetry(uri, {
        headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    const mainData = data.tracks.map((item: GetTracksItem) => {
        const { name, album, preview_url, explicit, popularity } = item;
        const artists = item.artists
        const images = album.images[0].url;
        const id = item.id;
        const release_date = item.album.release_date;
        const albums = item.album.name;
        return { name, images, id, preview_url, release_date, artists, albums, explicit, popularity };
    });
    const ids = data.tracks.map((item: GetTracksItem) => item.id);

    const audioData = await GetSpotifyAdvancedAudio(token, ids);
    

    const results = [];
    for (let i = 0; i < mainData.length; i++) {
        const combinedObject = {
            ...mainData[i],
            ...audioData[i]
        };
        if(combinedObject.id !== seedSong){
          results.push(combinedObject);
        }
    }

    return results;
}

export default GetSpotifyRecs;