import React from 'react'
import { useRouter } from 'next/router';
import GetSpotifySearch from '../server_components/GetSpotifySearch';
import SearchCards from './SearchCards';
import { SearchDetails } from '../types/dataTypes';


const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {

  let offset: number = 1
  const results: SearchDetails[] = await GetSpotifySearch(searchParams.q, offset);
  return (
    <div className='background-gradient min-h-[100em]'>
      <SearchCards results={results} />
    </div>
  )
}

export default SearchPage;
