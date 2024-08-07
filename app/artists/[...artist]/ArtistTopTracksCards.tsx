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
import PlayButton from '@/app/ui/buttons/PlayButton';
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
import { SongDetails } from '@/app/types/dataTypes';
import { ArtistPageCardProps } from '@/app/types/cardTypes';
import slugify from 'slugify';
import { Hidden } from '@mui/material';
import CardAd from '@/app/ui/ad components/CardAd';
import VerticalAd from '@/app/ui/ad components/VerticalAd';
import HorizontalAd from '@/app/ui/ad components/HorizontalAd';
import SpotifyIcon from '@/app/ui/icon components/SpotifyIcon';
import { transformSpotifyURItoURL } from '@/app/utils';
import SortButton from '@/app/ui/buttons/SortButton';
import SmallPlayButton from '@/app/ui/buttons/SmallPlayButton';
import { playAudio } from '@/app/handlers/playAudio';

const ArtistTopTracksCards: React.FC<ArtistPageCardProps> = ({ results, artist }) => {
	const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [searchResults, setSearchResults] = useState<SongDetails[]>(results);
	const router = useRouter();
	const searchParams = useSearchParams()
	const searchQuery: string | null = searchParams.get('q');
	//sort hooks
	const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
	const [sortBy, setSortBy] = useState<"tempo" | "key" | null>(null);
	//filter hooks
	const [activeSlice, setActiveSlice] = useState<string[]>([]);
	const [tempoSelect, setTempoSelect] = useState<[number, number]>([0, 500]);
	const offset: null = null;

	const spotifyRedirect = (e: React.MouseEvent, uri: string) => {
		e.stopPropagation();
		e.preventDefault();
		router.push(transformSpotifyURItoURL(uri) as string);
	}

	return (
		<Box component='div'>
			<Grid container item md={12} justifyContent='center' paddingBottom='1em'>
				{/* <HorizontalAd /> */}
			</Grid>
			<Grid container item xs={12} justifyContent='center' alignItems='center' >
				{searchResults && (
					<>

						{/* text row */}
						<Grid item xs={11} md={8}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'row',
									margin: '10px 10px 10px',
									boxShadow: 0,
									justifyContent: 'center',
									backgroundColor: 'transparent'
								}}
							>
								<Typography variant='h4' component="h1" sx={{
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
									Top Tracks by {results[0].artists[0].name}
								</Typography>
							</Card>
						</Grid>

						<SortFilter
							setActiveSlice={setActiveSlice}
							activeSlice={activeSlice}
							tempoSelect={tempoSelect}
							setTempoSelect={setTempoSelect}
							offset={offset}
							searchQuery={searchQuery}
							setSortOrder={setSortOrder}
							sortOrder={sortOrder}
							setSortBy={setSortBy}
							sortBy={sortBy}
						/>

						<Grid container item xs={12} display='flex' direction='row'
							alignItems='flex-start'
							justifyContent='space-between'

						>
							<Grid container item xs={1}
								display='flex'
								justifyContent='flex-start'
							>
								<Hidden lgDown>
									{/* <VerticalAd />
									<Box component='div' height='20em' />
									<VerticalAd /> */}
								</Hidden>
							</Grid>

							{/* main search */}
							<Grid container item xs={12} lg={10} display='flex'
								alignItems='flex-start'
								justifyContent='center'

							>
								{searchResults
									.filter(item =>
										(!activeSlice || activeSlice.length === 0 || activeSlice.includes(item.key))
										&& item.tempo >= tempoSelect[0]
										&& item.tempo <= tempoSelect[1]
									)
									.sort((a, b) => {
										if (sortBy && sortOrder) {
											if (sortBy === "key") {
												const aValue = reverseKeyConvert(a.key) || 0;
												const bValue = reverseKeyConvert(b.key) || 0;
												return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
											} else {
												return sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
											}
										}
										return 0;
									})
									.map((item: SongDetails, index: number) => {
										const elements: React.ReactNode[] = [];
										elements.push(
											<Grid item xs={11} md={8} key={index}>
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
																		<Typography variant="subtitle1" color="text.secondary" component="h1"
																			sx={{
																				display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1rem',
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
																	</Grid>

																	<Grid item xs={3} sm={6} >
																		<Typography variant="subtitle1" color="text.secondary" component="h1"
																			sx={{
																				display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1rem',
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
																			<SpotifyIcon />
																		</Button>
																	</Grid>

																</Grid>
															</Grid>
														</CardContent>
													</Card>
												</Link>
											</Grid>
										);
										// if ((index + 1) % 5 === 0) {
										// 	elements.push(
										// 		<Grid item xs={11} md={8} key={"ad_" + index} display='flex' justifyContent='center'>
										// 			<Card
										// 				sx={{
										// 					width: '100vw',
										// 					display: 'flex',
										// 					justifyContent: 'center',
										// 					margin: '10px 10px 0',
										// 					boxShadow: 3,
										// 					"&:hover": {
										// 						backgroundColor: "#e0e0e0",
										// 					},
										// 				}}
										// 			>
										// 				<CardContent sx={{
										// 					width: '90vw',
										// 				}}>
										// 					{/* <CardAd /> */}
										// 				</CardContent>
										// 			</Card>
										// 		</Grid>
										// 	);
										// }

										return elements;
									})
									.flat()
								}
							</Grid>

							<Grid container item xs={1}
								display='flex'
								justifyContent='flex-end'
							>
								<Hidden lgDown>
									{/* <VerticalAd />
									<Box component='div' height='20em' />
									<VerticalAd /> */}
								</Hidden>
							</Grid>
						</Grid >

					</>
				)}
			</Grid >
			<Grid container item md={12} justifyContent='center' paddingBottom='1em'>
				{/* <HorizontalAd /> */}
			</Grid>
		</Box>
	)
}

export default ArtistTopTracksCards;