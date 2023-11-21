import { KeyMapping, KeyConvertFunction, ReverseKeyConvertFunction } from "./types/dataTypes";

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
export const tempoRound = (num: number): number => {
    return Math.round(num * 2) / 2;
}
export const valuetext = (value: number): string => {
    return `${value} bpm`;
}

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

export const reverseKeyModeConvert = (key: string): { key: number, mode: number } | null => {
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

export const transformSpotifyURItoURL = (uri: string): string | null => {
    const match = uri.match(/spotify:track:([a-zA-Z0-9]+)/);

    if (match && match[1]) {
        return `https://open.spotify.com/track/${match[1]}`;
    }
    return null;
};

export const transformSpotifyAlbumURItoURL = (uri: string): string | null => {
    const match = uri.match(/spotify:album:([a-zA-Z0-9]+)/);

    if (match && match[1]) {
        return `https://open.spotify.com/album/${match[1]}`;
    }
    return null;
};