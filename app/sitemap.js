import slugify from "slugify";
import GetAccessToken from "./server_components/GetAccessToken";

export default async function SiteMap() {
    const token = await GetAccessToken();
    const request = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF?si=ce928cdd687a4612/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    const data = await request.json();
    const trackData = data.tracks.items.map((item) => item.track);
    const results = [];
    for (let i = 0; i < trackData.length; i++) {
        const combinedObject = {
            ...trackData[i],
        };
        results.push(combinedObject);
    }
    const topTracks = results.map(item => {
        return {
            url: `https://bpmkey.com/${slugify(item.name, { lower: true, strict: true })}/${slugify(item.artists[0].name, { lower: true, strict: true })}/${item.id}`,
            lastModified: new Date(),
        }
    })
    return [
        {
            url: 'https://bpmkey.com',
            lastModified: new Date(),
        },
        ...topTracks
    ]
}


