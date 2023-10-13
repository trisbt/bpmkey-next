import React from 'react'
import GetAccessToken from '../actions/GetAccessToken';
import GetSpotifySearch from '../actions/GetSpotifySearch';
import GetSpotifyAdvancedAudio from '../actions/GetSpotifyAdvancedAudio';
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
