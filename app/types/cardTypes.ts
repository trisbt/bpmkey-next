import { SongDetails } from "./dataTypes";
export interface SongPageCardProps {
    songDetails: SongDetails;
    song: string;
    artist: string;
    id: string;
}