import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { GetTracksItem } from "../types/serverTypes";

const sleep = (ms:number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

const fetchWithRetry = async (
    uri: string,
    options: RequestInit,
    retries: number = 3,
    backoff: number = 300
  ): Promise<Response> => {
    try {
      const res = await fetch(uri, options);
      if (!res.ok && res.status === 429 && retries > 0) {
        const retryAfter = res.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : backoff * 1000;
        await sleep(waitTime);
        return fetchWithRetry(uri, options, retries - 1, backoff * 2);
      }
      return res;
    } catch (error) {
      if (retries > 0) {
        await sleep(backoff * 1000);
        return fetchWithRetry(uri, options, retries - 1, backoff * 2);
      }
      throw error;
    }
  };

const GetSpotifyRecs = async (seedSong: string, seedArtist: string, seedGenres?: string) => {
    const token = await GetAccessToken();
    let uri = `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${seedArtist}&seed_tracks=${seedSong}`;

    if (seedGenres) {
        uri += `&seed_genres=${seedGenres}`;
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
        results.push(combinedObject);
    }

    return results;
}

export default GetSpotifyRecs;