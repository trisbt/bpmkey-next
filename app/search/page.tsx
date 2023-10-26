import React from 'react'
import { useRouter } from 'next/router';
import GetSpotifySearch from '../server_components/GetSpotifySearch';
import SearchCards from './SearchCards';
import { SearchDetails } from '../types/dataTypes';
import type { Metadata, ResolvingMetadata } from 'next'


const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {

  let offset: number = 1
  const results: SearchDetails[] = await GetSpotifySearch(searchParams.q.replace(/-/g, ' '), offset);
  return (
    <div className='background-gradient min-h-[100em]'>
      <SearchCards results={results} />
    </div>
  )
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q: string };
},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const searchQ = searchParams.q;
  return {
    title: `results for ${decodeURI(searchQ)} Bpm, Key, Credits BpmKey.com`,
    description: `Key BPM Credits finder for ${searchQ}`
  }
}

export default SearchPage;
