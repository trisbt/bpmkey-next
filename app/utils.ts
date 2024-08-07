import { KeyMapping, KeyConvertFunction, ReverseKeyConvertFunction } from "./types/dataTypes";

// Convert key and mode number to a key string
export const keyConvert: KeyConvertFunction = (num: number, mode: number): string => {
    const chart: KeyMapping = {
        '0': ['C', 'Am'],
        '1': ['D♭', 'B♭m'],
        '2': ['D', 'Bm'],
        '3': ['E♭', 'Cm'],
        '4': ['E', 'C♯m'],
        '5': ['F', 'Dm'],
        '6': ['G♭', 'E♭m'],
        '7': ['G', 'Em'],
        '8': ['A♭', 'Fm'],
        '9': ['A', 'F♯m'],
        '10': ['B♭', 'Gm'],
        '11': ['B', 'G♯m'],
    }

    if (mode === 1) {
        return chart[num][0];
    } else if (mode === 0) {
        return chart[num][1];
    } else {
        return "Unknown";
    }
}

// Round tempo to nearest half
export const tempoRound = (num: number): number => {
    return Math.round(num * 2) / 2;
}

// Convert numeric tempo value to string
export const valuetext = (value: number): string => {
    return `${value} bpm`;
}

// Return adjacent numerical keys
export const minMaxKey = (key: number): [number, number] => {
    if(key === 0){
        return [11, 1];
    }else if(key === 11){
        return [10, 0];
    }else{
        return [key - 1, key + 1];
    }
};

// Convert string key to key numerical
export const reverseKeyConvert: ReverseKeyConvertFunction = (key: string): number | null => {
    const reverseChart: { [key: string]: number } = {
        'C': 0, 'Am': 0,
        'D♭': 1, 'B♭m': 1,
        'D': 2, 'Bm': 2,
        'E♭': 3, 'Cm': 3,
        'E': 4, 'C♯m': 4,
        'F': 5, 'Dm': 5,
        'G♭': 6, 'E♭m': 6,
        'G': 7, 'Em': 7,
        'A♭': 8, 'Fm': 8,
        'A': 9, 'F♯m': 9,
        'B♭': 10, 'Gm': 10,
        'B': 11, 'G♯m': 11
    };

    return reverseChart[key] ?? null;
};

// Convert string key to mode numerical
export const reverseKeyModeConvert = (key: string): { key: number, mode: number } => {
    const reverseChart: { [key: string]: { key: number, mode: number } } = {
        'C': { key: 0, mode: 1 }, 'Am': { key: 0, mode: 0 },
        'D♭': { key: 1, mode: 1 }, 'B♭m': { key: 1, mode: 0 },
        'D': { key: 2, mode: 1 }, 'Bm': { key: 2, mode: 0 },
        'E♭': { key: 3, mode: 1 }, 'Cm': { key: 3, mode: 0 },
        'E': { key: 4, mode: 1 }, 'C♯m': { key: 4, mode: 0 },
        'F': { key: 5, mode: 1 }, 'Dm': { key: 5, mode: 0 },
        'G♭': { key: 6, mode: 1 }, 'E♭m': { key: 6, mode: 0 },
        'G': { key: 7, mode: 1 }, 'Em': { key: 7, mode: 0 },
        'A♭': { key: 8, mode: 1 }, 'Fm': { key: 8, mode: 0 },
        'A': { key: 9, mode: 1 }, 'F♯m': { key: 9, mode: 0 },
        'B♭': { key: 10, mode: 1 }, 'Gm': { key: 10, mode: 0 },
        'B': { key: 11, mode: 1 }, 'G♯m': { key: 11, mode: 0 }
    };
    return reverseChart[key] ?? null;
};

// Convert Spotify URI to URL
export const transformSpotifyURItoURL = (uri: string): string | null => {
    const match = uri.match(/spotify:track:([a-zA-Z0-9]+)/);

    if (match && match[1]) {
        return `https://open.spotify.com/track/${match[1]}`;
    }
    return null;
};

// Convert Spotify Album URI to URL
export const transformSpotifyAlbumURItoURL = (uri: string): string | null => {
    const match = uri.match(/spotify:album:([a-zA-Z0-9]+)/);

    if (match && match[1]) {
        return `https://open.spotify.com/album/${match[1]}`;
    }
    return null;
};

// Convert milliseconds to a string in the format of "minutes:seconds 
export const msConvert = (num: number): string => {
    let totalSeconds = Math.floor(num / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + formattedSeconds;
};

//progress value color function
export const determineColor = (value: number): string => {
    if (value > 80) {
      return 'linear-gradient(to right, rgba(66,187,7,0.7595413165266106) 0%, rgba(149,255,2,0.7595413165266106) 100%)';
    } else if (value > 50) {
      return 'linear-gradient(to right, #f9a825, #ffea00)';
    } else if (value >= 25 && value < 50) {
      return 'linear-gradient(to right, #e65100, #ff9800)';
    } else {
      return 'linear-gradient(to right, rgba(184,4,4,0.7595413165266106) 0%, rgba(255,2,2,0.7595413165266106) 100%)';
    }
  }

// Pause execution for a specified number of milliseconds
export const sleep = (ms:number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

// Perform a fetch request with automatic retries in case of rate limiting
export const fetchWithRetry = async (
    uri: string,
    options: RequestInit,
    retries: number = 3,
    backoff: number = 300
  ): Promise<Response> => {
    try {
      const res = await fetch(uri, options);
      if (!res.ok && res.status === 429 && retries > 0) {
        const retryAfter = res.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : backoff * 1000;
        await sleep(waitTime);
        return fetchWithRetry(uri, options, retries - 1, backoff * 2);
      }
      return res;
    } catch (error) {
      if (retries > 0) {
        await sleep(backoff * 1000);
        return fetchWithRetry(uri, options, retries - 1, backoff * 2);
      }
      throw error;
    }
};