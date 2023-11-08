import React from "react";

export interface KeyMapping {
  [key: number]: [string, string];
}
export type KeyConvertFunction = (num: number, mode: number) => string;

export type ReverseKeyConvertFunction = (key: string) => number | null;

export type CircleOfFifthsProps = {
  activeSlice: string[];
  setActiveSlice: React.Dispatch<React.SetStateAction<string[]>>;
};
export type PlayButtonProps = {
  previewUrl: string;
}

export interface Artist {
  external_urls: { [key: string]: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface Album {
  name: string;
  images: Images[];
  release_date?: string;
  id?: string;
}
export interface Images {
  height: number;
  url: string;
}
export interface SearchDetails {
  name: string;
  images: string;
  id: string;
  preview_url: string | null;
  release_date: string;
  artists: Artist[];
  albums: string;
  explicit: boolean;
  popularity: number;
  key: string;
  tempo: number;
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
export interface TopTracksDetails {
  name: string;
  id: string;
  preview_url: string | null;
  release_date: string;
  artists: Artist[];
  album: Album;
  explicit: boolean;
  popularity: number;
  key: string;
  tempo: number;
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
export interface SongDetails {
  name: string;
  images: string;
  albumId: string;
  artistId: string;
  id: string;
  preview_url: string | null;
  release_date: string;
  artists: Artist[];
  albums: string;
  explicit: boolean;
  popularity: number;
  key: string;
  tempo: number;
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
export interface Recs {
  name: string;
  images: string;
  id: string;
  preview_url: string | null;
  release_date: string;
  artists: Artist[];
  albums: string;
  explicit: boolean;
  popularity: number;
  key: string;
  tempo: number;
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
export interface AlbumDetails {
  name: string;
  album: string;
  artist: string;
  images: string;
  id: string;
  preview_url: string;
  artists: Artist[];
  explicit: boolean;
  key: string;
  tempo: number;
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

export type Credits = ProcessedCredit[] | string[] | null;

export type ProcessedCredit = {
  role: string;
  artist_name: string;
};

export type Track = {
  title: string;
  extraartists?: Array<{
    role: string;
    name: string;
  }>;
};

export type MasterData = {
  tracklist?: Track[];
};


export interface CreditsResult {
  [key: string]: ProcessedCredit;
}
