import GetAccessToken from "./GetAccessToken"
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";

interface KeyMapping {
    [key: number]: [string, string];
}
type KeyConvertFunction = (num: number, mode: number) => string;

const keyConvert: KeyConvertFunction = (num: number, mode: number): string => {
    const chart: KeyMapping = {
        '0': ['C', 'Am'],
        '1': ['Db', 'Bbm'],
        '2': ['D', 'Bm'],
        '3': ['Eb', 'Cm'],
        '4': ['E', 'C#m'],
        '5': ['F', 'Dm'],
        '6': ['Gb', 'Ebm'],
        '7': ['G', 'Em'],
        '8': ['Ab', 'Fm'],
        '9': ['A', 'F#m'],
        '10': ['Bb', 'Gm'],
        '11': ['B', 'G#m'],
    }

    if (mode === 1) {
        return chart[num][0];
    } else if (mode === 0) {
        return chart[num][1];
    } else {
        return "Unknown";
    }
}
function tempoRound(num: number): number {
    return Math.round(num * 2) / 2;
}

const GetSpotifyArtist = async (id) => {
    const token = await GetAccessToken();
    const mainRes = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await mainRes.json();
    const mainData = data.tracks.map((item) => {
        const { name, album, preview_url, explicit, popularity } = item;
        const artists = item.artists
        const images = album.images[0].url;
        const id = item.id;
        const release_date = item.album.release_date;
        const albums = item.album.name;
        return { name, images, id, preview_url, release_date, artists, albums, explicit, popularity };
    });
    const ids = mainData.map(item => item.id);
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