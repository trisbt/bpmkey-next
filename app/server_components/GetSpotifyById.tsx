import GetAccessToken from "./GetAccessToken";
import GetSpotifyAdvancedAudio from "./GetSpotifyAdvancedAudio";
// import { Redis } from '@upstash/redis';
// import { Ratelimit } from '@upstash/ratelimit';
// import { request } from "http";
// import { NextResponse } from "next/server";

// const rateLimit = new Ratelimit({
//     redis: Redis.fromEnv(),
//     limiter: Ratelimit.slidingWindow(1, '5 s'),
// })



const GetSpotifyById = async (id: string) => {
    // //check ip at redis
    // const ip = request.headers.get('x-forwarded-for') ?? '';
    // const { success, reset } = await ratelimit.limit(ip);
    // if(!success){
    //     const now = Date.now();
    //     const retryAfter = Math.floor((reset-now) / 1000);
    //     return new NextResponse('Too Many Requests', {
    //         status: 429,
    //         headers: {
    //             ['retry-after']: `${retryAfter},`
    //         },
    //     })
    // }

    const token = await GetAccessToken();

    const mainRes = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const trackData = await mainRes.json();
    // console.log('id', mainRes.status)
    const basicData = {
        name: trackData.name,
        images: trackData.album.images[0].url,
        albumId: trackData.album.id,
        artistId: trackData.artists[0].id,
        id: trackData.id,
        preview_url: trackData.preview_url,
        release_date: trackData.album.release_date,
        artists: trackData.artists,
        albums: trackData.album.name,
        explicit: trackData.explicit,
        popularity: trackData.popularity,
      };
    const audioData = await GetSpotifyAdvancedAudio(token, [id])

    const songDetails = { ...basicData, ...audioData[0] };
    return songDetails;
}

export default GetSpotifyById