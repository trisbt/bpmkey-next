'use client'
import React from 'react'
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
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
import { Theme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import PlayButton from '../ui/PlayButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import CircleOfFifths from '@/app/ui/CircleOfFifths';
import SortFilter from '@/app/ui/SortFilter';
import { reverseKeyConvert } from '@/app/utils';
import { RecsCardProps } from '../types/cardTypes';
import { Recs } from '../types/dataTypes';
import slugify from 'slugify';
import { transformSpotifyURItoURL } from '../utils';
import SpotifyBlackIcon from '../ui/icon components/SpotifyIcon';
import SmallPlayButton from '../ui/buttons/SmallPlayButton';
import SortButton from '../ui/buttons/SortButton';
import { playAudio } from '../handlers/playAudio';

const SongRecs: React.FC<RecsCardProps> = ({ recs }) => {
	const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [searchResults, setSearchResults] = useState<Recs[]>(recs);
	const router = useRouter();
	const searchParams = useSearchParams()
	const searchQuery: string | null = searchParams.get('q');
	const offset: null = null;

	const spotifyRedirect = (e: React.MouseEvent, uri: string) => {
		e.stopPropagation();
		e.preventDefault();
		router.push(transformSpotifyURItoURL(uri) as string);
	}

	return (
		<div>
			<Box component='div' sx={{ marginBottom: 2 }}>
				<Grid container item xs={12} justifyContent='center' alignItems='center' >
					{searchResults && (
						<>
							{/* text row */}
							<Grid item xs={11} md={8}>
								<Card
									sx={{
										display: 'flex',
										flexDirection: 'row',
										margin: '10px 10px 0',
										boxShadow: 0,
										justifyContent: 'center',
										backgroundColor: 'transparent'
									}}
								>
									<Typography variant='h4' sx={{
										display: 'flex',
										alignItems: 'center',
										color: '#e8eaf6',
										fontWeight: 'bold',
										background: '#e8eaf6',
										WebkitBackgroundClip: 'text',
										letterSpacing: '1px',
										borderRadius: '2px',
										fontStyle: 'italic',
										'@media (max-width: 600px)': {
											fontSize: '20px'
										},
									}}>
										Songs with Similar Key and Tempo
									</Typography>
								</Card>
							</Grid>

							{/* main search */}
							{searchResults
								.map((item: Recs, index: number) => (

									<Grid item xs={11} md={10} key={index}>
										{/* each card */}
										<Link prefetch={false} href={`
										/${slugify(item.name, { lower: true, strict: true })}
										/${slugify(item.artists[0].name, { lower: true, strict: true })}
										/${item.id}`}>
											<Card
												sx={{
													display: 'flex',
													flexDirection: 'row',
													justifyContent: 'center',
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
																unoptimized
																width={150}
																height={150}
																src={item.images}
																alt={item.name}
															/>
														</Grid>
														{/* song info */}
														<Grid item xs={9} sm={5} sx={{
															paddingLeft: '.5em',
														}}>
															<Typography color="text.primary" variant="h5" component="h1" sx={{
																"@media (max-width: 600px)": {
																	fontSize: '1rem'
																},
															}}>
																{item.name}
															</Typography>
															<Typography variant="h6" color="text.secondary" component="h1" sx={{
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
															<Typography variant="subtitle1" color="text.secondary" component="h1" sx={{
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
																<Typography variant="subtitle1" component="h1" color="text.secondary"
																	sx={{
																		display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1rem',
																		"@media (max-width: 600px)": {
																			fontSize: '.8em',
																		}
																	}}
																>
																	Key
																	<Typography className='song-sub-info' color="text.primary" sx={{
																		fontSize: '2rem',
																		"@media (max-width: 600px)": {
																			fontSize: '1.5rem',
																		}
																	}}>
																		{item.key}
																	</Typography>
																</Typography>
															</Grid>

															<Grid item xs={3} sm={6}>
																<Typography variant="subtitle1" color="text.secondary" component="h1"
																	sx={{
																		display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1rem',
																		"@media (max-width: 600px)": {
																			fontSize: '.8em',
																		}
																	}}
																>
																	BPM
																	<Typography className='song-sub-info' color="text.primary" sx={{
																		fontSize: '2rem',
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

																	}}
																		onClick={(event) => playAudio(event, item.preview_url, audioRef, setCurrentlyPlayingUrl || null)}
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
																<audio ref={audioRef} onEnded={() => setCurrentlyPlayingUrl(null)}></audio>
															</Grid>

															<Grid item xs={3} sm={6} sx={{
																display: 'flex',
																justifyContent: 'center'
															}}>
																<Button onClick={(e) => spotifyRedirect(e, item.uri)} sx={{
																	padding: '0',
																	'&:hover': {
																		color: 'transparent',
																		backgroundColor: 'transparent'
																	},
																}}>
																	<SpotifyBlackIcon />
																</Button>
															</Grid>

														</Grid>
													</Grid>
												</CardContent>
											</Card>
										</Link>
									</Grid>
								))}
						</>
					)}
				</Grid >
			</Box>
		</div>
	)
}

export default SongRecs;