'use server'
import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";

const GetSpotifySearch = async (query, offset) => {

    const token = await GetAccessToken();
    const limit = 25;
    // const offset = req.query.offset;
    // const offset = 1
    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist%2Ctrack&limit=${limit}&offset=${offset}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        cache:'no-store',
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
    // console.log(results.length);
    return results;
}

export default GetSpotifySearch;