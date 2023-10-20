import React from "react";

export interface KeyMapping {
  [key: number]: [string, string];
}
export type KeyConvertFunction = (num: number, mode: number) => string;

export type ReverseKeyConvertFunction = (key: string) => number | null;

export interface Artist {
  external_urls: { [key: string]: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
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

export interface CreditEntry {
  role: string;
  artist_name?: string;
}

export type Credits = CreditEntry[];




// export interface Artist {
//   name: string;
// }
// export interface DataItem {
//   name: string;
//   album: {
//     images: { url: string }[];
//     release_date: string;
//     name: string;
//   };
//   artists: Artist[];
//   preview_url: string;
//   explicit: boolean;
//   popularity: number;
//   id: string;
// }
// export interface AudioDataItem {
//   key: number;
//   mode: number;
//   tempo: number;
//   loudness: number;
//   energy: number;
//   acousticness: number;
//   analysis_url: string;
//   danceability: number;
//   duration_ms: number;
//   instrumentalness: number;
//   liveness: number;
//   time_signature: number;
//   track_href: string;
//   uri: string;
//   valence: number;
// }


// export interface ResultItem {
//   name: string;
//   images: string;
//   id: string;
//   preview_url?: string;
//   release_date: string;
//   artists: { name: string }[];
//   albums: string;
//   explicit?: boolean;
//   popularity: number;
//   key?: string;
//   tempo?: number;
//   loudness?: number;
//   energy?: number;
//   acousticness?: number;
//   analysis_url?: string;
//   danceability?: number;
//   duration_ms?: number;
//   instrumentalness?: number;
//   liveness?: number;
//   time_signature?: number;
//   track_href?: string;
//   uri?: string;
//   valence?: number;
// }

// export interface SongDetails {
//   id: string;
//   name: string;
//   artists: Artist[];
//   albums: any[];
//   images: string;
//   release_date: string;
//   preview_url: string;
//   key: number;
//   tempo: number;
//   loudness: number;
//   energy: number;
//   acousticness: number;
//   analysis_url: string;
//   danceability: number;
//   duration_ms: number;
//   instrumentalness: number;
//   liveness: number;
//   time_signature: number;
//   track_href: string;
//   uri: string;
//   valence: number;
//   explicit: boolean;
//   popularity: number;
// }


// export interface LocationState {
//   songDetails?: SongDetails;
// }

// export interface SearchDataProps {
//   key?: string;

// }