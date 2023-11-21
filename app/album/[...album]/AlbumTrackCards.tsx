'use client'
import React from 'react'
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
import PlayButton from '@/app/components/PlayButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import CircleOfFifths from '@/app/components/CircleOfFifths';
import { reverseKeyConvert } from '@/app/utils';
import SortFilter from '@/app/components/SortFilter';
import { AlbumDetails } from '@/app/types/dataTypes';
import { AlbumPageCardProps } from '@/app/types/cardTypes';
import slugify from 'slugify';
import { Hidden } from '@mui/material';
import Image from 'next/image';
import CardAd from '@/app/components/CardAd';
import VerticalAd from '@/app/components/VerticalAd';
import HorizontalAd from '@/app/components/HorizontalAd';
import SpotifyLogo from '@/app/SpotifyLogo';
import SpotifyIcon from '@/app/SpotifyIcon';
import { transformSpotifyAlbumURItoURL, transformSpotifyURItoURL } from '@/app/utils';

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
	width: '42px',
	height: '42px',
}));

const SortButton = styled(Button)(({ theme }) => ({
	'&&': {
		minHeight: '4px',
		padding: '0px 10px',
		color: 'white',
	},
	'&:hover': {
		backgroundColor: '#00e676',
		color: theme.palette.secondary.contrastText,
	},
}));



const AlbumTrackCards: React.FC<AlbumPageCardProps> = ({ results, album }) => {
	const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [searchResults, setSearchResults] = useState<AlbumDetails[]>(results);
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
	const albumData = results[results.length - 1];
	const albumSpotifyLink: string | null = transformSpotifyAlbumURItoURL(albumData.uri);

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

	const spotifyRedirect = (e: React.MouseEvent, uri: string) => {
		e.stopPropagation();
		e.preventDefault();
		router.push(transformSpotifyURItoURL(uri) as string);
	}

	return (
		<Box>
			<Grid container item xs={12} justifyContent='center' paddingBottom='1em' >
				<HorizontalAd />
			</Grid>
			<Grid container item xs={12} justifyContent='center' alignItems='center' >
				{searchResults && (
					<>
						{/* text row */}
						<Grid container item xs={12} flexDirection='column' justifyContent='center' alignItems='center' >
							<Grid item xs={11} md={8}>
								<Card
									sx={{
										display: 'flex',
										flexDirection: 'row',
										margin: '10px 10px 0',
										boxShadow: 0,
										justifyContent: 'center',
										backgroundColor: 'transparent',
										paddingBottom: '.6em',
									}}
								>
									<Typography variant='h4' component="h1" sx={{
										display: 'flex',
										alignItems: 'center',
										textAlign: 'center',
										color: '#e8eaf6',
										fontWeight: 'bold',
										background: '#e8eaf6',
										WebkitBackgroundClip: 'text',
										letterSpacing: '1px',
										borderRadius: '2px',
										fontStyle: 'italic',
										paddingLeft: '1em',
										paddingRight: '1em',
										'@media (max-width: 600px)': {
											fontSize: '22px'
										},
									}}>
										{albumData.album} by {albumData.artist}
									</Typography>

								</Card>
							</Grid>

							<Grid item xs={11} md={8} sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingBottom: '.6em',
							}}>
								{albumSpotifyLink ? (
									<Link href={albumSpotifyLink}>
										<SpotifyLogo />
									</Link>
								) : (
									<SpotifyLogo />
								)}
							</Grid>

							<Grid item xs={11} md={8} paddingBottom='1em'>
								<Image
									unoptimized
									width={500}
									height={500}
									src={albumData.images}
									alt={albumData.album}
								/>
							</Grid>
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
							// wrap='no-wrap'
							alignItems='flex-start'
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

							{/* main search */}
							<Grid container item xs={12} lg={10} display='flex'
								// wrap='no-wrap'
								alignItems='flex-start'
								justifyContent='center'

							>

								{/* main search */}
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
									.map((item: AlbumDetails, index: number) => {
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
																
																</Grid>
																<Grid item xs={3} sm={2} >
																	{/* <Image
																		unoptimized
																		width={150}
																		height={150}
																		src={item.images}
																		alt={item.name}
																	/> */}
																</Grid>
																<Grid container item xs={12} sm={5} alignItems='center' rowSpacing={1} sx={{
																	"@media (max-width: 600px)": {
																		paddingTop: '.8rem',
																	}
																}}>
																	<Grid item xs={3} sm={6}  >
																		{/* <Card sx={{ width: '90%' }}> */}
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
																		{/* </Card> */}
																	</Grid>

																	<Grid item xs={3} sm={6} sx={{
																		// "@media (max-width: 600px)": {
																		// 	marginRight: '.5em',
																		// }
																	}}>
																		{/* <Card sx={{ width: '90%' }}> */}
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
																		{/* </Card> */}
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
										if ((index + 1) % 5 === 0) {
											elements.push(
												<Grid item xs={11} md={8} key={"ad_" + index} display='flex' justifyContent='center'>
													<Card
														sx={{
															width: '100vw',
															display: 'flex',
															// flexDirection: 'row',
															justifyContent: 'center',
															margin: '10px 10px 0',
															boxShadow: 3,
															"&:hover": {
																backgroundColor: "#e0e0e0",
															},
														}}
													>
														<CardContent sx={{
															width: '90vw',
														}}>
															<CardAd />
														</CardContent>
													</Card>
												</Grid>
											);
										}

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
									<VerticalAd />
									<Box height='20em' />
									<VerticalAd />
								</Hidden>
							</Grid>
						</Grid >

					</>
				)}
			</Grid >
			<Grid container item md={12} justifyContent='center' paddingBottom='1em' >
				<HorizontalAd />
			</Grid>
		</Box>
	)
}

export default AlbumTrackCards;