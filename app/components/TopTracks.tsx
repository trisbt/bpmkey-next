'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PlayButton from './PlayButton';
import { TopTracksCardProps } from '../types/cardTypes';
import { TopTracksDetails } from '../types/dataTypes';
import slugify from 'slugify';
import VerticalAd from './VerticalAd';
import HorizontalAd from './HorizontalAd';
import { Hidden } from '@mui/material';
import CardAd from './CardAd';

const SmallPlayButton = styled(IconButton)(() => ({
  '&&': {
    color: 'white',
    backgroundColor: 'black',
  },
  '&:hover': {
    color: 'white',
    backgroundColor: '#00e676'
  },
  fontSize: '15px',
  width: '40px',
  height: '40px',
}));

const TopTracks: React.FC<TopTracksCardProps> = ({ results }) => {
  const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (event: React.MouseEvent, previewUrl: string | null) => {
    event.stopPropagation();
    event.preventDefault();
    if (audioRef.current && previewUrl) {
      audioRef.current.volume = .3;

      if (audioRef.current.src === previewUrl && !audioRef.current.paused) {
        audioRef.current.pause();
        setCurrentlyPlayingUrl(null);
      } else {
        if (!audioRef.current.paused) {
          // Stop currently playing audio if there is any
          audioRef.current.pause();
        }
        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setCurrentlyPlayingUrl(previewUrl);
      }
    }
  };

  return (
    <div>
      <Box >
        <Grid container item xs={12} justifyContent='center' alignItems='center' >
          {results && (
            <>
              <Grid container item xs={12} justifyContent='center' paddingBottom='1em'>
                <HorizontalAd />
              </Grid>
        
              {/* text row */}
              <Grid item xs={11} md={8}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0px 10px 0',
                    boxShadow: 3,
                    justifyContent: 'center',
                    backgroundColor: 'rgb(0, 71, 212, .6)',
                  }}
                >
                  <Typography variant='h4' component="h1"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
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
                    Daily Top Tracks
                  </Typography>
                </Card>
              </Grid>

              {/* main search */}
              <Grid container item xs={12} display='flex' direction='row'
                alignContent='center'
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid container item xs={1}
                  display='flex'
                  justifyContent='flex-start'
                >
                  <Hidden lgDown>
                    <VerticalAd />
                    <Box height='20em' />
                    <VerticalAd />
                  </Hidden>
                </Grid>

                <Grid container item xs={12} lg={10} sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {results.map((item: TopTracksDetails, index: number) => (
                    <Grid item xs={11} md={10} key={index}>

                      {/* each card */}
                      <Link prefetch={false} href={`/${slugify(item.name, { lower: true, strict: true })}/${slugify(item.artists[0].name, { lower: true, strict: true })}/${item.id}`}>
                        <Card
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '10px 10px 0',
                            boxShadow: 3,
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                            }
                          }}
                        >
                          <CardContent sx={{
                            width: '80vw',
                            paddingBottom: '15px',
                            '&:last-child': {
                              paddingBottom: '15px',
                            }
                          }}>
                            <Grid container >
                              {/* image */}
                              <Grid item xs={3} sm={2} >
                                <Image

                                  src={item.album.images[0].url}
                                  alt={item.name}
                                  width={150}
                                  height={150}
                                />
                              </Grid>
                              {/* song info */}
                              <Grid item xs={9} sm={5} sx={{
                                paddingLeft: '.5em',
                              }}>
                                <Typography color="text.primary" variant="h5"component="h1" sx={{
                                  "@media (max-width: 600px)": {
                                    fontSize: '1rem'
                                  },
                                }}>
                                  {item.name}
                                </Typography>
                                <Typography variant="h6" color="text.secondary"component="h1" sx={{
                                  "@media (max-width: 600px)": {
                                    fontSize: '1rem'
                                  },
                                }}>
                                  {item.artists.map((artist, index) => (
                                    <span key={index}>
                                      {artist.name}
                                      {index < item.artists.length - 1 && (
                                        <span style={{ color: '#B3C7ED', fontStyle: 'italic', marginLeft: '5px', marginRight: '5px' }}>|</span>
                                      )}
                                    </span>
                                  ))}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary"component="h1" sx={{
                                  "@media (max-width: 600px)": {
                                    fontSize: '.7em',
                                  }
                                }}>
                                  {item.album.name}
                                </Typography>
                              </Grid>

                              <Grid container item xs={12} sm={5} alignItems='center' rowSpacing={1} sx={{
                                "@media (max-width: 600px)": {
                                  paddingTop: '.8rem',
                                }
                              }}>
                                <Grid item xs={4} sm={6}  >

                                  <Typography variant="subtitle1" color="text.secondary"component="h1"
                                    sx={{
                                      display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1rem',
                                      "@media (max-width: 600px)": {
                                        fontSize: '.8em',
                                      }
                                    }}
                                  >
                                    Key
                                    <Typography className='song-sub-info' variant="h4" color="text.primary" component="div"sx={{
                                      "@media (max-width: 600px)": {
                                        fontSize: '1.5rem',
                                      }
                                    }}>
                                      {item.key}
                                    </Typography>
                                  </Typography>

                                </Grid>

                                <Grid item xs={4} sm={6} sx={{
                                  "@media (max-width: 600px)": {
                                    marginRight: '.5em',
                                  }
                                }}>

                                  <Typography variant="subtitle1" color="text.secondary"component="h1"
                                    sx={{
                                      display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1rem',
                                      "@media (max-width: 600px)": {
                                        fontSize: '.8em',
                                      }
                                    }}
                                  >
                                    BPM
                                    <Typography className='song-sub-info' variant="h4" color="text.primary" component="div"sx={{
                                      "@media (max-width: 600px)": {
                                        fontSize: '1.5rem',
                                      }
                                    }}>
                                      {item.tempo}
                                    </Typography>
                                  </Typography>

                                </Grid>

                                {/* preview button */}
                                <Grid item xs={3} sm={6} sx={{
                                  display: 'flex',
                                  justifyContent: 'center'
                                }} >
                                  {item.preview_url && (
                                    <SmallPlayButton className='preview-button' sx={{
                                      boxShadow: 3,
                                      borderRadius: '50px',
                                      // display: { xs: 'flex', sm: 'none', md: 'none' },
                                    }}
                                      onClick={(event) => playAudio(event, item.preview_url || null)}
                                    >
                                      {currentlyPlayingUrl === item.preview_url ? (
                                        <>
                                          <StopIcon aria-label="stop"
                                            sx={{
                                              height: 36,
                                              width: 36,
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <PlayArrowIcon aria-label="play/pause"
                                            sx={{
                                              height: 35,
                                              width: 35,
                                            }}
                                          />
                                        </>
                                      )}
                                    </SmallPlayButton>
                                  )}
                                  <audio ref={audioRef} />
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                  ))}

                  {/* <Hidden lgUp> */}
                  <Grid container item xs={11} md={10} justifyContent='center' paddingBottom='1em'>
                    {/* <CardAd /> */}
                  </Grid>
                  {/* </Hidden> */}
                </Grid>

                <Grid container item xs={1}
                  display='flex'
                  justifyContent='flex-end'
                >
                  <Hidden lgDown>
                    <VerticalAd />
                    <Box height='20em' />
                    <VerticalAd />
                  </Hidden>
                </Grid>

              </Grid>
            </>
          )}
        </Grid >
      </Box>
      <Grid container item md={12} justifyContent='center' paddingBottom='1em'>
        <HorizontalAd />
      </Grid>
    </div >
  );

}
export default TopTracks;