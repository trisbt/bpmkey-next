import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { GetTracksItem } from "../types/serverTypes";
const GetSpotifyRecs = async (seedSong: string, seedArtist: string, seedGenres?: string) => {
    const token = await GetAccessToken();

    let uri = `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${seedArtist}&seed_tracks=${seedSong}`;

    if (seedGenres) {
        uri += `&seed_genres=${seedGenres}`;
    }

    const res = await fetch(uri, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    // console.log(res.statusText);
    // console.log('recs', res.status);
    if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After');
        console.error(`Retry-After header value: ${retryAfter}`);
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