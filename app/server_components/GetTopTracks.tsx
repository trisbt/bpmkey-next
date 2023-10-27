'use server'
import TopTracks from "../components/TopTracks";
import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { GetTracksItem, TopTracksItem } from "../types/serverTypes";

//revalidation every half week
const GetTopTracks = async () => {
    const client_id = process.env.client_id;
    const client_secret = process.env.client_secret;
    const authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    };
  
    const auth = await fetch(authOptions.url, {
      method: authOptions.method,
      headers: authOptions.headers,
      body: authOptions.body,
      revalidate: 302400,
    });
  
    if (!auth.ok) {
      throw new Error('Spotify API access token not valid');
    }
    const awaitToken = await auth.json();
    const token = awaitToken.access_token;

    const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF?si=ce928cdd687a4612/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        revalidate: 302400
    });

    const data = await res.json();
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
    return <TopTracks results={results} />;
}

export default GetTopTracks;