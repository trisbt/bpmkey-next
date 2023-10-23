import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";

const GetSpotifyRecs = async (seedSong, seedArtist) => {
    const token = await GetAccessToken();
    // console.log(token)
    const res = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${seedArtist}&seed_tracks=${seedSong}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await res.json();
    const mainData = data.tracks.map((item) => {
        const { name, album, preview_url, explicit, popularity } = item;
        const artists = item.artists
        // console.log(artists)
        const images = album.images[0].url;
        const id = item.id;
        const release_date = item.album.release_date;
        const albums = item.album.name;
        return { name, images, id, preview_url, release_date, artists, albums, explicit, popularity };
    });
    const ids = data.tracks.map(item => item.id);
    // console.log(ids)
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