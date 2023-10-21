import { SongDetails, AlbumDetails } from "./dataTypes";

export interface SongPageCardProps {
    songDetails: SongDetails;
    song: string;
    artist: string;
    id: string;
}

export interface AlbumPageCardProps{
    results: AlbumDetails;
    album: string;
}