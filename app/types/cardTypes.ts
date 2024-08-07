import { SongDetails, AlbumDetails, TopTracksDetails, SearchDetails, Recs, GenreDetails } from "./dataTypes";

export interface SongPageCardProps {
    songDetails: SongDetails;
    song: string;
    artist: string;
    id: string;
    recs: Recs[];
}

export interface AlbumPageCardProps {
    results: AlbumDetails[];
    album: string;
}
export interface RecsCardProps {
    recs: Recs[];
}
export interface ArtistPageCardProps {
    results: SongDetails[];
    artist: string;
}
export interface SearchPageCardProps{
    results: SearchDetails[];
}
export interface TopTracksCardProps{
    results: TopTracksDetails[];
}
export interface GenreCardProps {
    results: GenreDetails[];
    playlistImage: string, 
    playlistURL: string, 
    playlistDescription: string, 
    playlistName: string, 
}