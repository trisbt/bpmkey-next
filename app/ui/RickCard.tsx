'use client'
import React from 'react'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import GetSpotifyById from '../server_components/GetSpotifyById';
import PlayButton from './PlayButton';
import ImageModal from './image components/ImageModal';
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
import { SongPageCardProps } from '../types/cardTypes';
import { transformSpotifyURItoURL } from '../utils';
import SpotifyBlackIcon from './icon components/SpotifyIcon';
import SpotifyGreenIcon from './icon components/SpotifyIconSongPage';

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


const RickCard = () => {
  const songDetails =
  {
    name: 'Never Gonna Give You Up',
    images: 'https://i.scdn.co/image/ab67616d0000b27315ebbedaacef61af244262a8',
    albumId: '6eUW0wxWtzkFdaEFsTJto6',
    artistId: '0gxyHStUsqpMadRV0Di1Qt',
    id: '4PTG3Z6ehGkBFwjybzWkR8',
    preview_url: 'https://p.scdn.co/mp3-preview/b4c682084c3fd05538726d0a126b7e14b6e92c83?cid=f0bb764e36ca4e2395b1c38f84c9764c',
    release_date: '1987-11-12',
    artists: [
      {
        external_urls: [Object],
        href: 'https://api.spotify.com/v1/artists/0gxyHStUsqpMadRV0Di1Qt',
        id: '0gxyHStUsqpMadRV0Di1Qt',
        name: 'Rick Astley',
        type: 'artist',
        uri: 'spotify:artist:0gxyHStUsqpMadRV0Di1Qt'
      }
    ],
    albums: 'Whenever You Need Somebody',
    explicit: false,
    popularity: 59,
    key: 'A♭',
    tempo: 113.5,
    loudness: -11.823,
    energy: 0.939,
    acousticness: 0.115,
    analysis_url: 'https://api.spotify.com/v1/audio-analysis/4PTG3Z6ehGkBFwjybzWkR8',
    danceability: 0.721,
    duration_ms: 213573,
    instrumentalness: 0.0000379,
    liveness: 0.108,
    time_signature: 4,
    track_href: 'https://api.spotify.com/v1/tracks/4PTG3Z6ehGkBFwjybzWkR8',
    uri: 'spotify:track:4PTG3Z6ehGkBFwjybzWkR8',
    valence: 0.914
  }


  return (
    <div className='song-page-main background-gradient'>

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
            textTransform: 'uppercase',
            '@media (max-width: 600px)': {
              fontSize: '22px'
            },
          }}>
            Something went wrong please retry again
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
            {/* {songDetails.name} by {songDetails.artists[0].name} */}
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
                    {/* <Link prefetch={false} href={`/artists/${slugifiedArtistName}/${songDetails.artistId}`}> */}
                    <Typography variant="h4"
                    >{songDetails.artists[0]?.name}
                    </Typography>
                    {/* </Link> */}

                    {/* <Link prefetch={false} href={`/album/${slugifiedAlbumName}/${songDetails.albumId}`}> */}
                    <Typography variant="subtitle1" component="h1" sx={{
                    }}>
                      {songDetails.albums}
                    </Typography>
                    {/* </Link> */}
                    <Typography variant="subtitle2" component="h4" >Released: {songDetails.release_date}</Typography>

                    <Grid item container xs={12} alignItems='center' justifyContent='space-between' >

                      {/*link spotify render*/}
                      <Link prefetch={false} href={transformSpotifyURItoURL(songDetails.uri) as string}>

                        <svg
                          // style={{ marginLeft: '-8px', paddingTop: '5px' }}
                          xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 24 24">
                          <path fill="#00e676" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5c-.1-.4.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" />
                        </svg>
                      </Link>
                      {/*play button render*/}
                      {songDetails.preview_url && (
                        <PlayButton previewUrl={songDetails.preview_url} />
                      )}
                      {/*credits button render*/}

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

            </Grid>

            {/* analysis row */}
            <Grid item container xs={12} justifyContent='center' >
              <Grid item container xs={11} md={11}
                flexDirection='column'
                alignContent="center"
                // alignItems='center'
                justifyContent='center'
              >
                <Typography style={{ textAlign: 'center' }} variant="h4" color='text.primary'>Song Metrics</Typography>
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
    </div>
  )
}

export default RickCard;
