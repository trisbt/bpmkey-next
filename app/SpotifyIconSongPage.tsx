import React from 'react'

const SpotifyIconSongPage = () => {
  return (
    <div 
      className="spotify-icon-container"
      style={{
        width: '55px',
        height: '55px',
        backgroundImage: 'url("/Spotify_Icon_RGB_Black.png")',
        backgroundSize: 'cover',
        transition: 'background-image 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundImage = 'url("/Spotify_Icon_RGB_Green.png")';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = 'url("/Spotify_Icon_RGB_Black.png")';
      }}
    >
    </div>
  );
}

export default SpotifyIconSongPage