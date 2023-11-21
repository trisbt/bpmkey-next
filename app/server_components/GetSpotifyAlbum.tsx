import React from 'react'
import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { AlbumItem } from '../types/serverTypes';

const GetSpotifyAlbum = async (id: string) => {
    const token = await GetAccessToken();
    const mainRes = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await mainRes.json();
    
    const albumData = {
        images: data.images[0].url,
        artist: data.artists[0].name,
        album: data.name,
        uri: data.uri
    };
    const albumTracksData = data.tracks.items
        .map((item: AlbumItem) => {
            const { name, id, preview_url } = item;
            const artists = item.artists;
            return { name, id, preview_url, artists };
        });

    const ids = albumTracksData.map((item: AlbumItem) => item.id);
    const audioData = await GetSpotifyAdvancedAudio(token, ids);
    const results = [];
    for (let i = 0; i < albumTracksData.length; i++) {
        const combinedObject = {
            ...albumTracksData[i],
            ...audioData[i]
        };
        results.push(combinedObject);
    }
    results.push(albumData);
    // console.log(results)
    return results;
}

export default GetSpotifyAlbum;