import GetAccessToken from "./GetAccessToken"
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { keyConvert, tempoRound } from "../utils";
import { GetTracksItem } from "../types/serverTypes";

const GetSpotifyArtist = async (id: string) => {
    const token = await GetAccessToken();
    const mainRes = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await mainRes.json();
    const mainData = data.tracks.map((item: GetTracksItem) => {
        const { name, album, preview_url, explicit, popularity } = item;
        const artists = item.artists
        const images = album.images[0].url;
        const id = item.id;
        const release_date = item.album.release_date;
        const albums = item.album.name;
        return { name, images, id, preview_url, release_date, artists, albums, explicit, popularity };
    });
    const ids = mainData.map((item: GetTracksItem) => item.id);
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
export default GetSpotifyArtist;