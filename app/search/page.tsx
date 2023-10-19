import React from 'react'
import { useRouter } from 'next/router';
import GetSpotifySearch from '../server_components/GetSpotifySearch';
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
