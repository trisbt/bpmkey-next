import Image from "next/image"

const SpotifyFooterLogo = () => {
  return (
    <Image src={'/Spotify_Logo_RGB_Green.png'} alt='spotifylogo' width={90} height={90} style={{
      paddingLeft: '5px'
    }} />
  );
}

export default SpotifyFooterLogo