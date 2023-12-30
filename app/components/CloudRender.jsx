'use client'
import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, TrackballControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { Typography, Card } from '@mui/material';

const genres = {
  "Top Lists": {
      "name": "Top Lists",
      "id": "toplists"
  },
  "Hip-Hop": {
      "name": "Hip-Hop",
      "id": "0JQ5DAqbMKFQ00XGBls6ym"
  },
  "Pop": {
      "name": "Pop",
      "id": "0JQ5DAqbMKFEC4WFtoNRpw"
  },
  "Country": {
      "name": "Country",
      "id": "0JQ5DAqbMKFKLfwjuJMoNC"
  },
  "Latin": {
      "name": "Latin",
      "id": "0JQ5DAqbMKFxXaXKP7zcDp"
  },
  "Rock": {
      "name": "Rock",
      "id": "0JQ5DAqbMKFDXXwE9BDJAr"
  },
  "Summer": {
      "name": "Summer",
      "id": "0JQ5DAqbMKFLVaM30PMBm4"
  },
  "Workout": {
      "name": "Workout",
      "id": "0JQ5DAqbMKFAXlCG6QvYQ4"
  },
  "R&B": {
      "name": "R&B",
      "id": "0JQ5DAqbMKFEZPnFQSFB1T"
  },
  "Dance/Electronic": {
      "name": "Dance/Electronic",
      "id": "0JQ5DAqbMKFHOzuVTgTizF"
  },
  "Netflix": {
      "name": "Netflix",
      "id": "0JQ5DAqbMKFEOEBCABAxo9"
  },
  "Indie": {
      "name": "Indie",
      "id": "0JQ5DAqbMKFCWjUTdzaG0e"
  },
  "Mood": {
      "name": "Mood",
      "id": "0JQ5DAqbMKFzHmL4tf05da"
  },
  "Sleep": {
      "name": "Sleep",
      "id": "0JQ5DAqbMKFCuoRTxhYWow"
  },
  "Christian & Gospel": {
      "name": "Christian & Gospel",
      "id": "0JQ5DAqbMKFy0OenPG51Av"
  },
  "Regional Mexican": {
      "name": "Regional Mexican",
      "id": "0JQ5DAqbMKFDTEtSaS4R92"
  },
  "Wellness": {
      "name": "Wellness",
      "id": "0JQ5DAqbMKFLb2EqgLtpjC"
  },
  "Chill": {
      "name": "Chill",
      "id": "0JQ5DAqbMKFFzDl7qN9Apr"
  },
  "Gaming": {
      "name": "Gaming",
      "id": "0JQ5DAqbMKFCfObibaOZbv"
  },
  "Frequency": {
      "name": "Frequency",
      "id": "0JQ5DAqbMKFF9bY76LXmfI"
  },
  "Kids & Family": {
      "name": "Kids & Family",
      "id": "0JQ5DAqbMKFFoimhOqWzLB"
  },
  "Party": {
      "name": "Party",
      "id": "0JQ5DAqbMKFA6SOHvT3gck"
  },
  "Decades": {
      "name": "Decades",
      "id": "0JQ5DAqbMKFIVNxQgRNSg0"
  },
  "Fresh Finds": {
      "name": "Fresh Finds",
      "id": "0JQ5DAqbMKFImHYGo3eTSg"
  },
  "Jazz": {
      "name": "Jazz",
      "id": "0JQ5DAqbMKFAJ5xb0fwo9m"
  },
  "Focus": {
      "name": "Focus",
      "id": "0JQ5DAqbMKFCbimwdOYlsl"
  },
  "Romance": {
      "name": "Romance",
      "id": "0JQ5DAqbMKFAUsdyVjCQuL"
  },
  "Folk & Acoustic": {
      "name": "Folk & Acoustic",
      "id": "0JQ5DAqbMKFy78wprEpAjl"
  },
  "K-Pop": {
      "name": "K-Pop",
      "id": "0JQ5DAqbMKFGvOw3O4nLAf"
  },
  "Instrumental": {
      "name": "Instrumental",
      "id": "0JQ5DAqbMKFRieVZLLoo9m"
  },
  "Ambient": {
      "name": "Ambient",
      "id": "0JQ5DAqbMKFLjmiZRss79w"
  },
  "Alternative": {
      "name": "Alternative",
      "id": "0JQ5DAqbMKFFtlLYUHv8bT"
  },
  "In the car": {
      "name": "In the car",
      "id": "0JQ5DAqbMKFIRybaNTYXXy"
  },
  "Classical": {
      "name": "Classical",
      "id": "0JQ5DAqbMKFPrEiAOxgac3"
  },
  "Soul": {
      "name": "Soul",
      "id": "0JQ5DAqbMKFIpEuaCnimBj"
  },
  "Cooking & Dining": {
      "name": "Cooking & Dining",
      "id": "0JQ5DAqbMKFRY5ok2pxXJ0"
  },
  "Punk": {
      "name": "Punk",
      "id": "0JQ5DAqbMKFAjfauKLOZiv"
  },
  "Pop culture": {
      "name": "Pop culture",
      "id": "0JQ5DAqbMKFQIL0AXnG5AK"
  },
  "Blues": {
      "name": "Blues",
      "id": "0JQ5DAqbMKFQiK2EHwyjcU"
  },
  "Desi": {
      "name": "Desi",
      "id": "0JQ5DAqbMKFQVdc2eQoH2s"
  },
  "Arab": {
      "name": "Arab",
      "id": "0JQ5DAqbMKFQ1UFISXj59F"
  },
  "Student": {
      "name": "Student",
      "id": "0JQ5DAqbMKFJw7QLnM27p6"
  },
  "Anime": {
      "name": "Anime",
      "id": "0JQ5DAqbMKFziKOShCi009"
  },
  "Tastemakers": {
      "name": "Tastemakers",
      "id": "0JQ5DAqbMKFRKBHIxJ5hMm"
  },
  "Afro": {
      "name": "Afro",
      "id": "0JQ5DAqbMKFNQ0fGp4byGU"
  },
  "Metal": {
      "name": "Metal",
      "id": "0JQ5DAqbMKFDkd668ypn6O"
  }
}
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
    const url = `genre/${slugify(genre.name, { lower: true, strict: true })}/${genre.id}`;
    router.push(url);
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
      {genre.name}
      </Text>
    </Billboard>
  );
}

function Cloud({ radius = 25 }) {
  const genresArray = Object.keys(genres).map(key => genres[key]);
  const count = genresArray.length; // Use the number of genres as count

  const words = useMemo(() => {
    const temp = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y

      const theta = goldenAngle * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), genresArray[i]]);
    }

    return temp;
  }, [count, radius]);

  return words.map(([pos, genre], index) => <Word key={index} position={pos} genre={genre} />);
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
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 30], fov: 90 }}>
      <fog attach="fog" args={['#202025', 0, 100]} />
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
