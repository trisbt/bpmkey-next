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
const valuetext = (value) => {
    return `${value} bpm`;
}


const GetSpotifySearch = async (token, query) => {
    const limit = 25;
    // const offset = req.query.offset;
    const offset = 1
    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist%2Ctrack&limit=${limit}&offset=${offset}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!res.ok) {
        throw new Error('Error in search fetch');
    }
    const data = await res.json();
    const mainData = data.tracks.items.map((item) => {
        const { name, album, preview_url, explicit, popularity } = item;
        const artists = item.artists
        const images = album.images[0].url;
        const id = item.id;
        const release_date = item.album.release_date;
        const albums = item.album.name;
        return { name, images, id, preview_url, release_date, artists, albums, explicit, popularity };
    });
    return mainData;
}

export default GetSpotifySearch;