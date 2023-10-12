import React from 'react'
import { createTheme, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, styled, Typography, Theme } from '@mui/material';
import GetAccessToken from '../fetchComponents/GetAccessToken';
import GetSpotifySearch from '../fetchComponents/GetSpotifySearch';
import PlayButton from '../components/PlayButton';
// import { useSearchParams } from 'next/navigation';

const page = async() => {
    // const {query} = useSearchParams();
    const token = await GetAccessToken();
    const mainData = await GetSpotifySearch(token,'a')
  return (
    <div>
        <Box>
        <Grid container item xs={12} justifyContent='center' alignItems='center' >
          {mainData.length > 0 && (
            <>
              {/* text row */}
              <Grid item xs={11} md={8}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '10px 10px 0',
                    boxShadow: 3,
                    justifyContent: 'center',
                    backgroundColor: 'rgb(0, 71, 212, .6)',

                  }}
                >
                  <Typography variant='h4' sx={{
                    display: 'flex',

                    alignItems: 'center',
                    color: '#e8eaf6',
                    fontWeight: 'bold',
                    background: '#e8eaf6',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '1px',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    '@media (max-width: 600px)': {
                      fontSize: '24px'
                    },
                  }}>
                    Daily Top Tracks
                  </Typography>
                </Card>
              </Grid>

              {/* main search */}
              {mainData.map((item: ResultItem, index: number) => (

                <Grid item xs={11} md={8} key={index}>
                  {/* each card */}
                  {/* <Link
                    to={{
                      pathname: `/${encodeURIComponent(item.name)}/${encodeURIComponent(item.artists[0].name)}/${item.id}`,
                    }}
                    state={{
                      songDetails: {
                        id: item.id,
                        name: item.name,
                        artists: item.artists,
                        albums: item.albums,
                        images: item.images,
                        release_date: item.release_date,
                        preview_url: item.preview_url,
                        key: item.key,
                        tempo: item.tempo,
                        loudness: item.loudness,
                        energy: item.energy,
                        acousticness: item.acousticness,
                        analysis_url: item.analysis_url,
                        danceability: item.danceability,
                        duration_ms: item.duration_ms,
                        instrumentalness: item.instrumentalness,
                        liveness: item.liveness,
                        time_signature: item.time_signature,
                        track_href: item.track_href,
                        uri: item.uri,
                        valence: item.valence,
                        explicit: item.explicit,
                        popularity: item.popularity,
                      },
                    }}
                    key={index}
                  > */}

                    {/* <div key={index} > */}
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '10px 10px 0',
                        boxShadow: 3,
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        }
                      }}
                    >
                      <CardContent sx={{
                         width:'80vw',
                        paddingBottom: '15px',
                        '&:last-child': {
                          paddingBottom: '15px',
                        }
                      }}>
                        <Grid container >
                          {/* image */}
                          <Grid item xs={3} sm={2} >
                            <CardMedia
                              component="img"
                              image={item.images}
                              alt={item.name}
                            />
                          </Grid>
                          {/* song info */}
                          <Grid item xs={9} sm={5} sx={{
                            paddingLeft: '.5em',
                          }}>
                            <Typography component="div" color="text.primary" variant="h5" sx={{
                              "@media (max-width: 600px)": {
                                fontSize: '1rem'
                              },
                            }}>
                              {item.name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" component="div" sx={{
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
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{
                              "@media (max-width: 600px)": {
                                fontSize: '.7em',
                              }
                            }}>
                              {item.albums}
                            </Typography>
                          </Grid>

                          <Grid container item xs={12} sm={5} alignItems='center' rowSpacing={1} sx={{
                            "@media (max-width: 600px)": {
                              paddingTop: '.8rem',
                            }
                          }}>
                            <Grid item xs={3} sm={6}  >
                              {/* <Card sx={{ width: '90%' }}> */}
                              <Typography variant="subtitle1" color="text.secondary" component="div"
                                sx={{
                                  display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '0.5rem',
                                  "@media (max-width: 600px)": {
                                    fontSize: '.8em',
                                  }
                                }}
                              >
                                Key
                                <Typography className='song-sub-info' variant="h4" color="text.primary" component="div" sx={{
                                  "@media (max-width: 600px)": {
                                    fontSize: '1.5rem',
                                  }
                                }}>
                                  {item.key}
                                </Typography>
                              </Typography>
                              {/* </Card> */}
                            </Grid>

                            <Grid item xs={3.5} sm={6} sx={{
                              "@media (max-width: 600px)": {
                                marginRight: '.5em',
                              }
                            }}>
                              {/* <Card sx={{ width: '90%' }}> */}
                              <Typography variant="subtitle1" color="text.secondary" component="div"
                                sx={{
                                  display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '0.5rem',
                                  "@media (max-width: 600px)": {
                                    fontSize: '.8em',
                                  }
                                }}
                              >
                                BPM
                                <Typography className='song-sub-info' variant="h4" color="text.primary" component="div" sx={{
                                  "@media (max-width: 600px)": {
                                    fontSize: '1.5rem',
                                  }
                                }}>
                                  {item.tempo}
                                </Typography>
                              </Typography>
                              {/* </Card> */}
                            </Grid>

                            {/* preview button */}
                            <Grid item xs={2.5} sm={6} sx={{
                              display: 'flex',
                              justifyContent: 'center'
                            }} >
                              {item.preview_url &&(
                                <PlayButton previewUrl={item.preview_url}/>
                              )}
                              {/* {item.preview_url && (
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
                              <audio ref={audioRef}></audio> */}
                            </Grid>

                            {/* </Grid> */}
                          </Grid>
                        </Grid>
                      </CardContent>

                    </Card>


                  {/* </Link> */}
                </Grid>
              ))}
            </>
          )
          }
        </Grid >
      </Box>
    </div>
  )
}

export default page