import React from 'react'
import { useRouter } from 'next/router';
import GetAccessToken from '../server components/GetAccessToken';
import GetSpotifySearch from '../server components/GetSpotifySearch';
import GetSpotifyAdvancedAudio from '../server components/GetSpotifyAdvancedAudio';
import SearchCards from './SearchCards';

const SearchPage = async ({ searchParams }) => {
  let offset = 1
  const results = await GetSpotifySearch(searchParams.q, offset);
  return (
    <div className='background-gradient'>
      <SearchCards results={results} />
    </div>
  )
}

export default SearchPage;
