'use client'
import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, TrackballControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { Typography, Card } from '@mui/material';
import GetSpotifyPlaylist from '../server_components/GetSpotifyPlaylist';

// const genres = 
//   [
//     "acoustic",
//     "afrobeat",
//     "alt-rock",
//     "alternative",
//     "ambient",
//     "anime",
//     "black-metal",
//     "bluegrass",
//     "blues",
//     "bossanova",
//     "brazil",
//     "breakbeat",
//     "british",
//     "cantopop",
//     "chicago-house",
//     "children",
//     "chill",
//     "classical",
//     "club",
//     "comedy",
//     "country",
//     "dance",
//     "dancehall",
//     "death-metal",
//     "deep-house",
//     "detroit-techno",
//     "disco",
//     "disney",
//     "drum-and-bass",
//     "dub",
//     "dubstep",
//     "edm",
//     "electro",
//     "electronic",
//     "emo",
//     "folk",
//     "forro",
//     "french",
//     "funk",
//     "garage",
//     "german",
//     "gospel",
//     "goth",
//     "grindcore",
//     "groove",
//     "grunge",
//     "guitar",
//     "happy",
//     "hard-rock",
//     "hardcore",
//     "hardstyle",
//     "heavy-metal",
//     "hip-hop",
//     "holidays",
//     "honky-tonk",
//     "house",
//     "idm",
//     "indian",
//     "indie",
//     "indie-pop",
//     "industrial",
//     "iranian",
//     "j-dance",
//     "j-idol",
//     "j-pop",
//     "j-rock",
//     "jazz",
//     "k-pop",
//     "kids",
//     "latin",
//     "latino",
//     "malay",
//     "mandopop",
//     "metal",
//     "metal-misc",
//     "metalcore",
//     "minimal-techno",
//     "movies",
//     "mpb",
//     "new-age",
//     "new-release",
//     "opera",
//     "pagode",
//     "party",
//     "philippines-opm",
//     "piano",
//     "pop",
//     "pop-film",
//     "post-dubstep",
//     "power-pop",
//     "progressive-house",
//     "psych-rock",
//     "punk",
//     "punk-rock",
//     "r-n-b",
//     "rainy-day",
//     "reggae",
//     "reggaeton",
//     "road-trip",
//     "rock",
//     "rock-n-roll",
//     "rockabilly",
//     "romance",
//     "sad",
//     "salsa",
//     "samba",
//     "sertanejo",
//     "show-tunes",
//     "singer-songwriter",
//     "ska",
//     "sleep",
//     "songwriter",
//     "soul",
//     "soundtracks",
//     "spanish",
//     "study",
//     "summer",
//     "swedish",
//     "synth-pop",
//     "tango",
//     "techno",
//     "trance",
//     "trip-hop",
//     "turkish",
//     "work-out",
//     "world-music"
//   ];
const genres = [
  "Top Lists",
  "Hip-Hop",
  "Pop",
  "Country",
  "Latin",
  "Rock",
  "Summer",
  "Workout",
  "R&B",
  "Dance/Electronic",
  "Netflix",
  "Indie",
  "Mood",
  "Sleep",
  "Christian & Gospel",
  "Regional Mexican",
  "Wellness",
  "Chill",
  "EQUAL",
  "Gaming",
  "Frequency",
  "Kids & Family",
  "Party",
  "Decades",
  "Fresh Finds",
  "Jazz",
  "Focus",
  "Romance",
  "Folk & Acoustic",
  "K-Pop",
  "Instrumental",
  "Ambient",
  "Alternative",
  "In the car",
  "Classical",
  "Soul",
  "Spotify Singles",
  "Cooking & Dining",
  "Punk",
  "Pop culture",
  "Blues",
  "Desi",
  "Arab",
  "RADAR",
  "Student",
  "Anime",
  "Tastemakers",
  "Afro",
  "Comedy",
  "Metal",
]


function Word({ genre, children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    // font: '/Inter-Bold.woff',
    fontSize: 3,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.stopPropagation();
    // console.log("Clicked genre:", genre);
    // const res = await GetSpotifyPlaylist(genre);
    // const res = await fetch(`/api/genre?name=${genre}`)
    const url = `genre/${slugify(genre, { lower: true, strict: true })}`;
    router.push(url);
    // const res = await GetSpotifyPlaylist(genre);
    // const res = await fetch(`/api/genre?name=${genre}`)
    // console.log(res);
  };

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => (document.body.style.cursor = 'auto');
  }, [hovered]);

  useFrame(({ camera }) => {
    ref.current.material.color.lerp(color.set(hovered ? '#90caf9' : 'white'), 0.1);
  });

  return (
    <Billboard {...props}>
      <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={handleClick} {...fontProps}>
        {children}
      </Text>
    </Billboard>
  );
}

function Cloud({ count = 4, radius = 20 }) {
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    let genreIndex = 0;

    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), genres[genreIndex]]);
        genreIndex = (genreIndex + 1) % genres.length; 
      }
    }

    return temp;
  }, [count, radius]);

  return words.map(([pos, genre], index) => <Word key={index} position={pos} genre={genre} >{...genre}</Word>);
}

const CloudRender = () => {

  return (
    <div className='canvas-container'>
      <Card
        sx={{
          display: 'flex',
             flexDirection: 'row',
             // margin: '0px 10px 0',
             marginBottom:'.5em',
             boxShadow: 3,
             justifyContent: 'center',
             backgroundColor: 'rgb(0, 71, 212)',
             width: '95%',
             '@media (max-width: 900px)': {
               width: '100%',
             },
            }}
            >     
            <Typography variant='h4' component="h1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '10px 10px 10px',
                // textTransform: 'uppercase',
                color: '#e8eaf6',
                fontWeight: 'bold',
                background: '#e8eaf6',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
                borderRadius: '2px',
              
                '@media (max-width: 600px)': {
                  fontSize: '24px'
                },
              }}>
             Get a Song By Genre
           </Typography>
      </Card>
    <div className='canvas'>
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={['#202025', 0, 80]} />
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          <Cloud count={8} radius={20} />
        </group>
      </Suspense>
      <TrackballControls minDistance={10} maxDistance={32}/>
    </Canvas>
    </div> 
    </div>
  );
};

export default CloudRender;
