import { Artist, Images, Album } from "./dataTypes";

export interface AdvancedAudioItem {
    key: number;
    tempo: number;
    mode: number;
    loudness: number;
    energy: number;
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    instrumentalness: number;
    liveness: number;
    time_signature: number;
    track_href: string;
    uri: string;
    valence: number;
}
export interface GetTracksItem{
    name: string;
    id: string;
    album: Album;
    preview_url: string;
    artists: Artist[];
    explicit: boolean;
    popularity: string;
}
export interface AlbumItem{
    name: string;
    id: string;
    album: string;
    preview_url: string;
    artists: Artist[];
    explicit: boolean;
}
export interface TopTracksItem{
    is_local: boolean;
    track: GetTracksItem;
}
export interface TopTracksSubItem{
    artists: Artist[];
}