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
	const [tempoSelect, setTempoSelect] = useState<[number, number]>([0, 200]);
	const offset: null = null;

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
		<Box>
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
									backgroundColor: 'transparent',
									paddingBottom: '1em',
								}}
							>
								<Typography variant='h4' sx={{
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
									'@media (max-width: 600px)': {
										fontSize: '22px'
									},
								}}>
									{decodeURIComponent(album.replace(/-/g, ' '))}
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
							.map((item: AlbumDetails, index: number) => (

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
												width: '100vw',
												paddingBottom: '15px',
												'&:last-child': {
													paddingBottom: '15px',
												}
											}}>
												<Grid container item >
													{/* song info */}
													<Grid item xs={6} sx={{
														paddingLeft: '.5em',
													}}>
														<Typography component="div" color="text.primary" variant="h5" sx={{
															"@media (max-width: 600px)": {
																fontSize: '.9rem'
															},
														}}>
															{item.name}
														</Typography>
														<Typography variant="h6" color="text.secondary" component="div" sx={{
															"@media (max-width: 600px)": {
																fontSize: '.8rem'
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
													<Grid container item xs={6} alignItems='center' rowSpacing={1} sx={{
														"@media (max-width: 600px)": {
															// paddingTop: '.8rem',
														}
													}}>

														<Grid item xs={4} sx={{
															display: 'flex',
															justifyContent: 'center'
														}} >
															{item.preview_url && (
																<SmallPlayButton className='preview-button' sx={{
																	boxShadow: 3,
																	borderRadius: '50px',
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

														<Grid item xs={5}   >
															{/* <Card sx={{ width: '90%' }}> */}
															<Typography variant="subtitle1" color="text.secondary" component="div"
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
																		fontSize: '1.2rem',
																	}
																}}>
																	{item.key}
																</Typography>
															</Typography>
															{/* </Card> */}
														</Grid>

														<Grid item xs={3} sx={{
															"@media (max-width: 600px)": {
																// marginRight: '.5em',
															}
														}}>
															{/* <Card sx={{ width: '90%' }}> */}
															<Typography variant="subtitle1" color="text.secondary" component="div"
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
																		fontSize: '1.2rem',
																	}
																}}>
																	{item.tempo}
																</Typography>
															</Typography>
															{/* </Card> */}
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
	)
}

export default AlbumTrackCards;