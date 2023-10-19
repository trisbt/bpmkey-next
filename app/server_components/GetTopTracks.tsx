import TopTracks from "../components/TopTracks";
import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";

interface KeyMapping {
    [key: number]: [string, string];
}
type KeyConvertFunction = (num: number, mode: number) => string;

type CombinedDataType = DataItem & AudioDataItem;


//bpm and key helper conversions

const GetTopTracks = async () => {
    const token = await GetAccessToken();

    const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF?si=ce928cdd687a4612/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await res.json();
    const trackData = data.tracks.items.slice(0, 10).map(item => item.track);
    const trackID = data.tracks.items.slice(0, 10).map(item => item.track.id);

    const audioData = await GetSpotifyAdvancedAudio(token, trackID);

    const results = [];
    for (let i = 0; i < trackData.length; i++) {
        const combinedObject = {
            ...trackData[i],
            ...audioData[i]
        };
        results.push(combinedObject);
    }
    // console.log(results)
    return <TopTracks results = {results}/>;
}

export default GetTopTracks;