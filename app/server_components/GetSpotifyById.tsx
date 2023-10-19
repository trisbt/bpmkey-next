import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
interface KeyMapping {
    [key: number]: [string, string];
}
type KeyConvertFunction = (num: number, mode: number) => string;

const keyConvert: KeyConvertFunction = (num: number, mode: number): string => {
    const chart: KeyMapping = {
        '0': ['C', 'Am'],
        '1': ['D♭', 'B♭m'],
        '2': ['D', 'Bm'],
        '3': ['E♭', 'Cm'],
        '4': ['E', 'C♯m'],
        '5': ['F', 'Dm'],
        '6': ['G♭', 'E♭m'],
        '7': ['G', 'Em'],
        '8': ['A♭', 'Fm'],
        '9': ['A', 'F♯m'],
        '10': ['B♭', 'Gm'],
        '11': ['B', 'G♯m'],
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

const GetSpotifyById = async (id) => {
    const token = await GetAccessToken();
    const mainRes = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const trackData = await mainRes.json();

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