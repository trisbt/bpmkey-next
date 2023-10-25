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
    // const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF?si=ce928cdd687a4612/tracks`, {
    //     headers: {
    //         'Authorization': 'Bearer ' + token
    //     },
    // });

    // const data = await res.json();
    // const trackData = data.tracks.items.slice(0, 5).map((item: TopTracksItem) => item.track);
    // const artistIds = [].concat(...trackData.map((item: TopTracksSubItem) => item.artists.map((artist: Artist) => artist.id)));
    // const seedArtist = artistIds.slice(0, 2).join();

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
    const artists = {
        drake: '3TVXtAsR1Inumwj472S9r4',
        doja_cat:"5cj0lLjcoR7YOSnhnX0Po5",
        kendrick_lamar:'2YZyLoL8N0Wb9xBt1NhZWg',
        rihanna:"5pKCCKE2ajJHZ9KAiaK11H",
        bad_bunny: "4q3ewBCX7sLwd24euuV69X",
        taylor_swift:"06HL4z0CvFAxyc27GXpf02",
        diplo: "5fMUXHkw8R8eOP2RNVYEZX",
        future:"1RyvyyTE3xzB2ZywiAwp0i",
        weeknd:"1Xyo4u8uXC1ZmMpatF05PJ",
        justin_bieber:"1uNFoZAHBGtllmzznpCI3s",
        dua_lipa:"6M2wZ9GZgrQXHCFfjv46we",
        kanye_west:"5K4W6rqBFWDnAN6FQUkS6x",
        beyonce: "6vWDO969PvNqNYHIOW5v0m",
        jcole:"6l3HvQ5sa6mXTsMTB19rO5",
        olivia_rodrigo:"1McMsnEElThX1knmY4oliG",
        frank_ocean:"2h93pZq0e7k5yf4dywlkpM",
        billie_eilish:"6qqNVTkY8uBg9cP3Jd7DAH",
        karolg:"790FomKkXshlbRYZFtlgla",
        sza:"7tYKF4w9nC0nq9CsPZTHyP",
        yg:"0A0FS04o6zMoto8OKPsDwY",
        michael_jackson:"3fMbdgg4jU18AjLCKBhRSm",
        skrillex:"5he5w2lnU9x7JFhnwcekXX",
        queen:"1dfeR4HaWDbWqFHLkxsg1d",
        travis_scott:"0Y5tJX1MQlPlqiwlOH1tJY",
        coldplay:"4gzpq5DPGxSnKTe4SA8HAU",
        nirvana:"6olE6TJLqED3rqDCT0FyPh",
        tems:"687cZJR45JO7jhk1LHIbgq",
        usher:"23zg3TcAtWQy7J6upgbUnj",
        cardib:"4kYSro6naA4h99UJvo89HB",
    }
      
    
    const getRandomGenres = (input: string[] | Record<string, string>,  numOfValues: number): string => {
        const results: string[] = [];
        const isInputArray = Array.isArray(input);
        const tempArr = isInputArray ? [...input as string[]] : Object.values(input as Record<string, string>);
    
        for (let i = 0; i < numOfValues; i++) {
            const randomIndex = Math.floor(Math.random() * tempArr.length);
            results.push(encodeURIComponent(tempArr[randomIndex]));
            tempArr.splice(randomIndex, 1);
        }
        return results.join();
    }
    const seedGenres = getRandomGenres(genres, 3);
    const seedArtist = getRandomGenres(artists, 2);

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