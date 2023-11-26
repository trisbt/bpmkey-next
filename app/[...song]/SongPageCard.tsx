'use client'
import React from 'react'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import GetSpotifyById from '../server_components/GetSpotifyById';
import PlayButton from '../components/PlayButton';
import ImageModal from '../components/ImageModal';
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { createTheme } from '@mui/material';
import Fade from '@mui/material/Fade';
import Hidden from '@mui/material/Hidden';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { GetCredits } from '../actions/GetCredits';
// import CreditsModal from '../components/CreditsModal';
import { SongPageCardProps } from '../types/cardTypes';
import { Credits } from '../types/dataTypes';
import DisplaySettings from '@mui/icons-material/DisplaySettings';
import SongRecs from './SongRecs';
import slugify from 'slugify';
import MultiAd from '../components/MultiAd';
import CardAd from '../components/CardAd';
import HorizontalAd from '../components/HorizontalAd';
import CreditsLoader from '../components/CreditsLoader';
import dynamic from 'next/dynamic'
import { Suspense } from 'react';
import { transformSpotifyURItoURL } from '../utils';
import SpotifyBlackIcon from '../SpotifyIcon';
import SpotifyGreenIcon from '../SpotifyIconSongPage';


//progress value color function
function determineColor(value: number): string {
  if (value > 80) {
    return 'linear-gradient(to right, rgba(66,187,7,0.7595413165266106) 0%, rgba(149,255,2,0.7595413165266106) 100%)';
  } else if (value > 50) {
    return 'linear-gradient(to right, #f9a825, #ffea00)';
  } else if (value >= 25 && value < 50) {
    return 'linear-gradient(to right, #e65100, #ff9800)';
  } else {
    return 'linear-gradient(to right, rgba(184,4,4,0.7595413165266106) 0%, rgba(255,2,2,0.7595413165266106) 100%)';
  }
}
//convert song duration format
const msConvert = (num: number): string => {
  let totalSeconds = Math.floor(num / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return minutes + ':' + formattedSeconds;
}

const CreditsButton = styled(Button)(() => ({
  '&&': {
    color: '#fff',
    backgroundColor: 'black',
    '&:hover': {
      color: 'white',
      backgroundColor: '#00e676'
    },
    fontSize: '15px',
    width: '200px',
    height: '50px',
    lineHeight: '0',
    boxShadow: 3,
    borderRadius: '50px',
  }
}));

const SmallCreditsButton = styled(Button)(() => ({
  '&&': {
    color: '#fff',
    backgroundColor: 'black',
    '&:hover': {
      color: 'white',
      backgroundColor: '#00e676'
    },
    fontSize: '15px',
    width: '100px',
    height: '50px',
    lineHeight: '0',
    boxShadow: 3,
    borderRadius: '50px',
  }
}));

const SongPageCard: React.FC<SongPageCardProps> = ({ songDetails, song, artist, id, }) => {
  const [showCredits, setShowCredits] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [credits, setCredits] = useState<Credits>(null);
  const slugifiedAlbumName = slugify(songDetails.albums, { lower: true, strict: true });
  const slugifiedArtistName = (artist) => {
    return slugify(artist, { lower: true, strict: true });
  }
  
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!credits) {
      try {
        const res = await GetCredits(songDetails.albums, songDetails.artists[0].name, songDetails.name);
        setCredits(res);
      } catch (error) {
        console.error("Failed to fetch credits:", error);
      }
    }
    setShowCredits(true);
    setLoading(false);
  }
  const CreditsModal = dynamic(
    () => import('../components/CreditsModal'),
  )

  return (
    <div className='song-page-main background-gradient'>
      <Grid container item md={12} justifyContent='center' paddingBottom='1em'>
        <HorizontalAd />
      </Grid>
      <Grid item xs={11} md={8}>

        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px 10px 0',
            boxShadow: 0,
            justifyContent: 'center',
            backgroundColor: 'transparent',
            // paddingBottom: '1em',
          }}
        >
          <Typography variant="h4" component="h1" sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#e8eaf6',
            fontWeight: 'bold',
            background: '#e8eaf6',
            WebkitBackgroundClip: 'text',
            letterSpacing: '1px',
            borderRadius: '2px',
            '@media (max-width: 600px)': {
              fontSize: '22px'
            },
          }}>
            Bpm, Key, Credits for
          </Typography>
        </Card>

        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '8px 10px 0',
            boxShadow: 0,
            justifyContent: 'center',
            backgroundColor: 'transparent',
            // paddingBottom: '1em',
          }}
        >
          <Typography variant='h5' component="h1" sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#e8eaf6',
            // fontWeight: 'bold',
            background: '#e8eaf6',
            WebkitBackgroundClip: 'text',
            letterSpacing: '1px',
            borderRadius: '2px',
            fontStyle: 'italic',
            '@media (max-width: 600px)': {
              fontSize: '22px'
            },
          }}>
            {songDetails.name} by {songDetails.artists[0].name}
          </Typography>
        </Card>


      </Grid>
      <div className='song-page-container '>
        {songDetails && (
          <Card sx={{
            width: '90vw',
            overflowY: 'visible',
            maxHeight: 'inherit',
            borderRadius: '0',
            paddingTop: '3px',
            paddingLeft: '5px',
            paddingRight: '5px',
            paddingBottom: '5px'
          }}>
            <Grid item container xs={12} direction='row' justifyContent="center" padding='0'
              sx={{
                width: '100vw',
                height: '8vh',
                alignItems: 'center',
                padding: '0',

              }}>
            </Grid>

            {/* top row */}
            <Grid item container xs={12} direction='row' justifyContent="center" sx={{
              padding: '1em',
            }}>
              {/* First Row - Image and Song Details */}
              <Grid container item xs={12} spacing={2} >
                {/* image and modal */}
                <Grid
                  item xs={12} sm={5} md={4} lg={3}
                >
                  <CardMedia sx={{
                    cursor: 'pointer',
                    boxShadow: 2,
                    "@media (max-width: 500px)": {
                      width: '75%',
                    }
                  }}>
                    <ImageModal songDetails={songDetails} />
                  </CardMedia>
                </Grid>
                {/* song info */}
                <Grid item container xs={12} sm={7} md={7.5} lg={9} direction="column" justifyContent="space-between" >

                  <Grid item >
                    <Typography variant="h5" component="h1" color='text.primary'>{songDetails.name}</Typography>
                    <div className='flex flex-row'>
                      {songDetails.artists.map((artist, index) => (
                        <div key={index} className='flex-row'>
                          <Link prefetch={false} href={`/artists/${slugifiedArtistName(artist.name)}/${artist.id}`}>
                            <Typography variant="h5" component="h1" sx={{
                              fontSize: '1.7em',
                              transition: 'color 0.3s',
                              '&:hover': {
                                color: '#3f51b5',
                                fontStyle: 'italic'
                              }
                            }}>
                              {artist.name}
                              {index < songDetails.artists.length - 1 && (
                                <span style={{ fontStyle: 'italic', marginLeft: '5px', marginRight: '5px' }}>|</span>
                              )}
                            </Typography>
                          </Link>

                        </div>
                      ))}
                    </div>
                    <Link prefetch={false} href={`/album/${slugifiedAlbumName}/${songDetails.albumId}`}>
                      <Typography variant="subtitle1" component="h1" sx={{
                        transition: 'color 0.3s',
                        '&:hover': {
                          color: '#3f51b5',
                          fontStyle: 'italic'
                        }
                      }}>
                        {songDetails.albums}
                      </Typography>
                    </Link>
                    <Typography variant="subtitle2" component="h4" >Released: {songDetails.release_date}</Typography>

                    <Grid item container xs={12} alignItems='center' justifyContent='space-between' paddingTop={1}>

                      {/*link spotify render*/}
                      <Link prefetch={false} href={transformSpotifyURItoURL(songDetails.uri) as string}>
                        <SpotifyGreenIcon />
                      </Link>

                      {/*play button render*/}
                      {songDetails.preview_url && (
                        <PlayButton previewUrl={songDetails.preview_url} />
                      )}
                      {/*credits button render*/}
                      <Grid item>
                        <Hidden only={['sm', 'md', 'lg', 'xl']}>
                          {/* This will be displayed only on xs screens */}
                          <form onSubmit={handleClick}>
                            <SmallCreditsButton type="submit">Credits</SmallCreditsButton>
                          </form>
                          <>
                            {loading && <CreditsLoader />}
                            {showCredits && (
                              <CreditsModal
                                open={showCredits}
                                handleClose={() => setShowCredits(false)}
                                credits={credits}
                              />
                            )}
                          </>
                        </Hidden>

                        <Hidden only={['xs']}>
                          {/* This will be displayed on sm, md, lg, xl screens */}
                          <form onSubmit={handleClick}>
                            <CreditsButton type="submit">Get Credits</CreditsButton>
                          </form>
                          <>
                            {loading && <CreditsLoader />}
                            {showCredits && (
                              <CreditsModal
                                open={showCredits}
                                handleClose={() => setShowCredits(false)}
                                credits={credits}
                              />
                            )}
                          </>
                        </Hidden>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Other Details, shows inline with song details on large screens */}
                  <Grid container item spacing={2} xs={1} justifyContent='center' sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}>
                    <Grid item xs={3} >
                      <Paper className='paper-card'>
                        Key
                        <Typography variant="h5" color='text.primary' >{songDetails.key}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className='paper-card'>
                        Tempo
                        <Typography variant="h5" color='text.primary' >{songDetails.tempo}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className='paper-card'>
                        Duration
                        <Typography variant="h5" color='text.primary' >{msConvert(songDetails.duration_ms)}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className='paper-card'>
                        Time Signature
                        <Typography variant="h5" color='text.primary' >{`${songDetails.time_signature} / 4`}</Typography>
                      </Paper>
                    </Grid>

                  </Grid>

                </Grid>

                {/* Other Details, shows flex with song details on smaller screens */}
                <Grid container item xs={12} spacing={2} sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' } }}>
                  <Grid item xs={6} md={3} >
                    <Paper className='paper-card'>
                      Key
                      <Typography variant="h5" color='text.primary' >{songDetails.key}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Paper className='paper-card'>
                      Tempo
                      <Typography variant="h5" color='text.primary' >{songDetails.tempo}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Paper className='paper-card'>
                      Duration
                      <Typography variant="h5" color='text.primary' >{msConvert(songDetails.duration_ms)}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Paper className='paper-card'>
                      Time Signature
                      <Typography variant="h5" color='text.primary' >{`${songDetails.time_signature} / 4`}</Typography>
                    </Paper>
                  </Grid>

                </Grid>

              </Grid>
            </Grid>

            <Grid item display='flex' justifyContent='center' >
              <MultiAd />
            </Grid>

            {/* analysis row */}
            <Grid item container xs={12} justifyContent='center' >
              <Grid item container xs={11} md={11}
                flexDirection='column'
                alignContent="center"
                // alignItems='center'
                justifyContent='center'
              >
                <Typography style={{ textAlign: 'center', fontStyle: 'italic', }} variant="h4" color='text.primary'>Song Metrics</Typography>
                <hr className="border-t-2 border-gray-400 my-4 w-full mt-2" />
              </Grid>

              <Grid item container xs={12} >
                <CardContent sx={{
                  width: '100vw',
                }}>

                  {/* loudness */}
                  <Grid item container direction="row" xs={12} alignItems='center'>
                    <Grid item xs={3} sm={2} md={3}>
                      <Typography variant="subtitle2" color='text.primary'>Loudness</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color='text.primary'>{songDetails.loudness}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <LinearProgress variant="determinate" value={((songDetails.loudness + 60) / 60) * 100} sx={{
                      marginBottom: '.5em',
                      paddingBottom: '.5em',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundImage: determineColor(((songDetails.loudness + 60) / 60) * 100)
                      }
                    }} />
                  </Grid>

                  {/* energy */}
                  <Grid item container direction="row" xs={12} alignItems='center'>
                    <Grid item xs={3} sm={2} md={3}>
                      <Typography variant="subtitle2" color='text.primary'>Energy</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color='text.primary'>{songDetails.energy}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <LinearProgress color='primary' variant="determinate" value={songDetails.energy * 100} sx={{
                      marginBottom: '.5em',
                      paddingBottom: '.5em',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundImage: determineColor(songDetails.energy * 100)
                      }
                    }} />
                  </Grid>

                  {/* valence */}
                  <Grid item container direction="row" xs={12} alignItems='center'>
                    <Grid item xs={3} sm={2} md={3}>
                      <Typography variant="subtitle2" color='text.primary'>Valence</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color='text.primary'>{songDetails.valence}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <LinearProgress color='primary' variant="determinate" value={songDetails.valence * 100} sx={{
                      marginBottom: '.5em',
                      paddingBottom: '.5em',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundImage: determineColor(songDetails.valence * 100)
                      }
                    }} />
                  </Grid>

                  {/* acousticness */}
                  <Grid item container direction="row" xs={12} alignItems='center'>
                    <Grid item xs={4} sm={2.5} md={3}>
                      <Typography variant="subtitle2" color='text.primary'>Acousticness</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color='text.primary'>{songDetails.acousticness}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <LinearProgress color='primary' variant="determinate" value={songDetails.acousticness * 100} sx={{
                      marginBottom: '.5em',
                      paddingBottom: '.5em',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundImage: determineColor(songDetails.acousticness * 100)
                      }
                    }} />
                  </Grid>

                  {/* danceability */}
                  <Grid item container direction="row" xs={12} alignItems='center'>
                    <Grid item xs={4} sm={2} md={3}>
                      <Typography variant="subtitle2" color='text.primary'>Danceability</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color='text.primary'>{songDetails.danceability}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <LinearProgress color='primary' variant="determinate" value={songDetails.danceability * 100} sx={{
                      marginBottom: '.5em',
                      paddingBottom: '.5em',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundImage: determineColor(songDetails.danceability * 100)
                      }
                    }} />
                  </Grid>


                  {/* liveness */}
                  <Grid item container direction="row" xs={12} alignItems='center'>
                    <Grid item xs={3} sm={2} md={3}>
                      <Typography variant="subtitle2" color='text.primary'>Liveness</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color='text.primary'>{songDetails.liveness}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <LinearProgress color='primary' variant="determinate" value={songDetails.liveness * 100} sx={{
                      marginBottom: '.5em',
                      paddingBottom: '.5em',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundImage: determineColor(songDetails.liveness * 100)
                      }
                    }} />
                  </Grid>


                  {/* popularity */}
                  <Grid item container direction="row" xs={12} alignItems='center'>
                    <Grid item xs={3} sm={2} md={3}>
                      <Typography variant="subtitle2" color='text.primary'>Popularity</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color='text.primary'>{songDetails.popularity}</Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <LinearProgress color='primary' variant="determinate" value={songDetails.popularity} sx={{
                      marginBottom: '.5em',
                      paddingBottom: '.5em',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundImage: determineColor(songDetails.popularity)
                      }
                    }} />
                  </Grid>

                </CardContent>
              </Grid>

            </Grid>

          </Card>
        )}

      </div>
      <Grid container item md={12} justifyContent='center' paddingBottom='1em'>
        <HorizontalAd />
      </Grid>
      {/* <div className='recs-page-container'>
      <SongRecs recs={recs} />
      </div> */}
    </div>
  )
}

export default SongPageCard;
