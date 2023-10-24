'use server'
import GetAccessToken from "./GetAccessToken";
import { reverseKeyModeConvert } from "../utils";
import { TopTracksItem, TopTracksSubItem } from "../types/serverTypes";
import { Artist } from "../types/dataTypes";

const GetRandom = async (key: string) => {
    const rev = reverseKeyModeConvert(key);
    if (!rev) {
        return;
    }
    const revKey: number = rev.key;
    const revMode: number = rev?.mode;
    const token = await GetAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF?si=ce928cdd687a4612/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    const data = await res.json();
    const trackData = data.tracks.items.slice(0, 5).map((item: TopTracksItem) => item.track);
    const artistIds = [].concat(...trackData.map((item: TopTracksSubItem) => item.artists.map((artist: Artist) => artist.id)));
    const seedArtist = artistIds.slice(0, 2).join();

    // const seedSong = data.tracks.items.slice(0, 5).map((item) => item.track.id).slice(0, 2).join();

    const genres =
        [
            "acoustic",
            "afrobeat",
            "alt-rock",
            "alternative",
            "ambient",
            "anime",
            "blues",
            "brazil",
            "breakbeat",
            "chill",
            "club",
            "dance",
            "dancehall",
            "death-metal",
            "deep-house",
            "disco",
            "dub",
            "dubstep",
            "edm",
            "electro",
            "electronic",
            "emo",
            "funk",
            "gospel",
            "groove",
            "guitar",
            "happy",
            "hard-rock",
            "hardcore",
            "hardstyle",
            "heavy-metal",
            "hip-hop",
            "house",
            "idm",
            "indie",
            "indie-pop",
            "industrial",
            "jazz",
            "k-pop",
            "latin",
            "latino",
            "minimal-techno",
            "movies",
            "mpb",
            "new-age",
            "new-release",
            "party",
            "piano",
            "pop",
            "pop-film",
            "post-dubstep",
            "power-pop",
            "progressive-house",
            "psych-rock",
            "punk",
            "punk-rock",
            "r-n-b",
            "rainy-day",
            "reggae",
            "reggaeton",
            "road-trip",
            "rock",
            "rock-n-roll",
            "romance",
            "sad",
            "soul",
            "soundtracks",
            "spanish",
            "study",
            "summer",
            "synth-pop",
            "techno",
            "trance",
            "trip-hop",
            "work-out",
            "world-music"
        ]

    const getRandomGenres = (genres: string[]) => {
        const results = ['hip-hop'];
        const tempArr = [...genres];

        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * tempArr.length);
            results.push(encodeURIComponent(tempArr[randomIndex]));
            tempArr.splice(randomIndex, 1);
        }
        return results.join();
    }
    const seedGenres = getRandomGenres(genres);

    const resByKey = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_artists=${seedArtist}&seed_genres=${seedGenres}
    &min_key=${revKey}&max_key=${revKey}&min_mode=${revMode}&max_mode=${revMode}
    `, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const dataByKey = await resByKey.json();
    const getRandomInt = () => Math.floor(Math.random() * 5);
    const index = getRandomInt();
    const item = dataByKey.tracks[index];
    const { name, id } = item;
    const artist = item.artists[0].name;
    const randomLink = { artist, name, id };
    return randomLink;
}

export default GetRandom;