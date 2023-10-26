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
import PlayButton from '../components/PlayButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Hidden from '@mui/material/Hidden';
import { FilterListTwoTone } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import GetSpotifySearch from '../server_components/GetSpotifySearch';
import CircleOfFifths from '../components/CircleOfFifths';
import SortFilter from '../components/SortFilter';
import { reverseKeyConvert } from '@/app/utils';
import { SearchPageCardProps } from '../types/cardTypes';
import { SearchDetails } from '../types/dataTypes';
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
const LoadButton = styled(Button)(({ theme }) => ({
	'&&': {
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.secondary.dark,
	},
	'&:hover': {
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.secondary.contrastText,
	},
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

const SearchCards: React.FC<SearchPageCardProps> = ({ results }) => {
	const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [searchResults, setSearchResults] = useState(results);
	const [offset, setOffset] = useState<number>(1);
	const router = useRouter();
	const searchParams = useSearchParams()
	const searchQuery: string | null = searchParams.get('q');
	//sort hooks
	const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
	const [sortBy, setSortBy] = useState<"tempo" | "key" | null>(null);
	//filter hooks
	const [activeSlice, setActiveSlice] = useState<string[]>([]);
	const [tempoSelect, setTempoSelect] = useState<[number, number]>([0, 200]);

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
	const handleLoadMore = () => {
		const nextOffset = offset + 25;
		setOffset(nextOffset);
	};

	//load more effect
	useEffect(() => {
		const fetchData = async () => {
			const newResults = await GetSpotifySearch(searchQuery, offset);

			if (offset === 1) {
				setSearchResults(newResults);
			} else {
				setSearchResults(prevResults => [...prevResults, ...newResults]);
			}
		};
		fetchData();
	}, [offset, searchQuery]);

	//new search effect
	useEffect(() => {
		if (searchQuery) {
			setOffset(1);
		}
	}, [searchQuery]);

	return (
		<Box>
			<Grid container item xs={12} justifyContent='center' alignItems='center' >
				{searchResults.length > 0 && (
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
								}}
							>
								<Typography variant='h5' sx={{
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
									results for: {searchQuery ? searchQuery.replace(/-/g, ' ') : ''}
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
							.map((item: SearchDetails, index: number) => (
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
													<Grid item xs={3} sm={2} >
														<Image
															src={item.images}
															width={150}
															height={150}
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
														<Grid item xs={4} sm={6}  >
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
																		fontSize: '1.5rem',
																	}
																}}>
																	{item.key}
																</Typography>
															</Typography>
															{/* </Card> */}
														</Grid>

														<Grid item xs={4} sm={6} sx={{
															"@media (max-width: 600px)": {
																marginRight: '.5em',
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
													</Grid>
												</Grid>
											</CardContent>
										</Card>
									</Link>
								</Grid>
							))}
						<Grid item xs={12} sx={{
							paddingTop: '1em',
							paddingBottom: '1em',
						}}>
							<div className='loadmore'>
								<LoadButton
									onClick={handleLoadMore}
									variant='outlined'
									size='large'

								>Load More...
								</LoadButton>
							</div>
						</Grid>
					</>
				)}
			</Grid >
		</Box>
	)
}

export default SearchCards