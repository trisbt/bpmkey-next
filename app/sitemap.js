import slugify from "slugify";
import GetAccessToken from "./server_components/GetAccessToken";

export default async function SiteMap() {
    const token = await GetAccessToken();
    //top 50 tracks global
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
            url: `https://www.bpmkey.com/${slugify(item.name, { lower: true, strict: true })}/${slugify(item.artists[0].name, { lower: true, strict: true })}/${item.id}`,
            lastModified: new Date(),
        }
    })
    // //rap caviar tracks
    // const rapRequest = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd/tracks", {
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //     }
    // });
    // const rapData = await rapRequest.json();
    // const rapTrackData = rapData.items.map((item) => item.track);

    // const rapResults = [];
    // for (let i = 0; i < rapTrackData.length; i++) {
    //     const combinedObject = {
    //         ...rapTrackData[i],
    //     };
    //     rapResults.push(combinedObject);
    // }
    // const topRapTracks = rapResults.map(item => {
    //     return {
    //         url: `https://bpmkey.com/${slugify(item.name, { lower: true, strict: true })}/${slugify(item.artists[0].name, { lower: true, strict: true })}/${item.id}`,
    //         lastModified: new Date(),
    //     }
    // })
    // //viva latino tracks
    // const latinRequest = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX10zKzsJ2jva/tracks", {
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //     }
    // });
    // const latinData = await latinRequest.json();
    // const latinTrackData = latinData.items.map((item) => item.track);

    // const latinResults = [];
    // for (let i = 0; i < latinTrackData.length; i++) {
    //     const combinedObject = {
    //         ...latinTrackData[i],
    //     };
    //     latinResults.push(combinedObject);
    // }
    // const toplatinTracks = latinResults.map(item => {
    //     return {
    //         url: `https://bpmkey.com/${slugify(item.name, { lower: true, strict: true })}/${slugify(item.artists[0].name, { lower: true, strict: true })}/${item.id}`,
    //         lastModified: new Date(),
    //     }
    // })
    //mint dance tracks
    // const mintReq = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX4dyzvuaRJ0n/tracks', {
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //     }
    // });
    // const mintData = await mintReq.json();
    // const mintTrackData = mintData.items.map((item) => item.track);

    // const mintResults = [];
    // for (let i = 0; i < mintTrackData.length; i++) {
    //     const combinedObject = {
    //         ...mintTrackData[i],
    //     };
    //     mintResults.push(combinedObject);
    // }
    // const topMintTracks = mintResults.map(item => {
    //     return {
    //         url: `https://www.bpmkey.com/${slugify(item.name, { lower: true, strict: true })}/${slugify(item.artists[0].name, { lower: true, strict: true })}/${item.id}`,
    //         lastModified: new Date(),
    //     }
    // })
    //get all featured playlists
    // const featReq = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //     }
    // });
    // const featData = await featReq.json();
    // const featHrefs = featData.playlists.items.map(item => item.href + '/tracks');
    // const allResults = []; 

    // for (const href of featHrefs) {
    //     const playlistReq = await fetch(href, {
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //         }
    //     });
    //     const playlistData = await playlistReq.json();
    //     const playlistTrackData = playlistData.items.map(item => item.track);

    //     const playlistResults = [];
    //     for (let track of playlistTrackData) {
    //         const combinedObject = { ...track };
    //         playlistResults.push(combinedObject);
    //     }

    //     const featTracks = playlistResults.map(track => {
    //         return {
    //             url: `https://www.bpmkey.com/${slugify(track.name, { lower: true, strict: true })}/${slugify(track.artists[0].name, { lower: true, strict: true })}/${track.id}`,
    //             lastModified: new Date(),
    //         };
    //     });

    //     allResults.push(...featTracks); 
    // }

    return [
        {
            url: 'https://www.bpmkey.com',
            lastModified: new Date(),
        },
        ...topTracks,
        // ...topRapTracks,
        // ...toplatinTracks,
        // ...allResults,
        // ...topMintTracks,

    ]
}


