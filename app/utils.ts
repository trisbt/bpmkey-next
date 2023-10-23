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
export const tempoRound = (num: number): number =>{
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
