import React from 'react'
import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
import { AlbumItem } from '../types/serverTypes';

const GetSpotifyAlbum = async (id: string) => {
    const token = await GetAccessToken();
    const mainRes = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks?limit=50`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await mainRes.json();
    const mainData = data.items
    .filter((item: AlbumItem) => item.name) 
    .map((item: AlbumItem) => {
        const { name, id, album, preview_url, explicit } = item;
        const artists = item.artists;
        // const albums = item.album?.name; 
        return { name, id, preview_url, artists, explicit };
    });

    const ids = mainData.map((item:AlbumItem) => item.id);
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

export default GetSpotifyAlbum;