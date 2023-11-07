'use server'
import TopTracks from "../components/TopTracks";
import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { GetTracksItem, TopTracksItem } from "../types/serverTypes";

//revalidate every half week

const GetTopTracks = async () => {
    // const token = await GetAccessToken();
    const token = await GetAccessToken(95600);
    const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF?si=ce928cdd687a4612/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        next: {
            revalidate: 95600,
        }
    });
    // if (!res.ok) {
    //     throw new Error(`API response failed with status ${res.status}: ${res.statusText}`);
    // }
    
    const data = await res.json();
    // console.log(data.tracks.items.slice(0, 10).map((item: TopTracksItem) => item.track));
    const trackData = data.tracks.items.slice(0, 10).map((item: TopTracksItem) => item.track);
    const trackID = data.tracks.items.slice(0, 10).map((item: TopTracksItem) => item.track.id);

    const audioData = await GetSpotifyAdvancedAudio(token, trackID);

    const results = [];

    for (let i = 0; i < trackData.length; i++) {
        const combinedObject = {
            ...trackData[i],
            ...audioData[i]
        };
        results.push(combinedObject);
    }
    return results ;
}

export default GetTopTracks;