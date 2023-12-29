import React from 'react'
import { useRouter } from 'next/router';
import GetSpotifySearch from '../server_components/GetSpotifySearch';
import SearchCards from './SearchCards';
import { SearchDetails } from '../types/dataTypes';
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react';
import Loading from '../loading';

//TODO need to setup loading fallback for new search params. Currently Next.js 13.5 and up having issues displaying. Added key to Suspense 


const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  let offset: number = 0;

  const results: SearchDetails[] = await GetSpotifySearch(searchParams.q.replace(/-/g, ' '), offset);
  return (
    <div className='background-gradient min-h-[100em]'>
      <Suspense key = {searchParams.q} fallback={<Loading/>}>
        <SearchCards results={results} />
      </Suspense>
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
    description: `Key BPM Credits finder for ${searchQ}`,
    alternates:{
      canonical: `https://www.bpmkey.com/search?q=${searchQ}`
    }
  }
}

export default SearchPage;
