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
import PlayButton from '../components/PlayButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import GetSpotifySearch from '../server_components/GetSpotifySearch';
import CircleOfFifths from '../components/CircleOfFifths';
import { reverseKeyConvert } from '@/app/utils';

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
		// backgroundColor: 'white',
	},
	'&:hover': {
		backgroundColor: '#00e676',
		color: theme.palette.secondary.contrastText,
	},
}));
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
	minHeight: '4px',
	padding: '0px 10px',
	'&.Mui-expanded': {
		minHeight: '4px',
		padding: '0px 10px',
	},
	'& > .MuiAccordionSummary-content': {
		margin: '0',
		'&.Mui-expanded': {
			margin: '0',
		}
	}
}));

const KeyAccordionDetails = styled(AccordionDetails)({
	position: 'absolute',
	zIndex: 2,
	left: '100%',
	transform: 'translateX(-48%)',
	width: '250px',
	height: '280px',
	backdropFilter: 'blur(15px)',
	borderRadius: '1em',
	boxShadow: '0px 6px 10px #0d47a1',
});

const TempoAccordionDetails = styled(AccordionDetails)({
	position: 'absolute',
	zIndex: 2,
	left: '100%',
	transform: 'translateX(-75%)',
	backdropFilter: 'blur(15px)',
	borderRadius: '1em',
	width: '300px',
	boxShadow: '0px 6px 10px #0d47a1',
});

const SearchCards = ({ results }) => {
	const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [searchResults, setSearchResults] = useState(results);
	const [offset, setOffset] = useState<number>(1);
	const router = useRouter();
	const searchParams = useSearchParams()
	const searchQuery = searchParams.get('q')
	//sort hooks
	const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
	const [sortBy, setSortBy] = useState<"tempo" | "key" | null>(null);
	//filter hooks
	const [activeSlice, setActiveSlice] = useState<string | null>(null);
	const [tempoSelect, setTempoSelect] = React.useState([0, 200]);
	const [sliderValue, setSliderValue] = useState([80, 140]);
	const [textFieldTempo, setTextFieldTempo] = useState('');
	const [openAccordion, setOpenAccordion] = useState<string | null>(null);
	const keyAccordionRef = useRef(null);
	const bpmAccordionRef = useRef(null);

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

	//filter effect
	useEffect(() => {
		setActiveSlice(null);
		setTempoSelect([0, 200]);
	}, [offset, searchQuery]);

	//close accordion
	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [openAccordion]);

	//sorting
	const handleSort = (attribute: "tempo" | "key") => {
		if (sortBy === attribute && sortOrder === "asc") {
			setSortOrder("desc");
		} else {
			setSortBy(attribute);
			setSortOrder("asc");
		}
	};

	//tempo filter
	const valuetext = (value) => {
		return `${value} bpm`;
	}
	const handleTempoSelect = (event, tempo) => {
		setSliderValue(tempo);
	};

	const handleTempoSubmit = (event) => {
		event.preventDefault();

		if (textFieldTempo) {
			setTempoSelect([parseFloat(textFieldTempo), parseFloat(textFieldTempo)]);
		} else {
			setTempoSelect(sliderValue);
		}
	};

	const handleTextFieldChange = (event) => {
		const value = event.target.value.replace(/[^0-9]/g, '');  // Only allow digits
		setTextFieldTempo(value);
	};
	//reset filter
	const handleReset = (event) => {
		event.preventDefault();  // To prevent the default behavior
		setTempoSelect([0, 200]);
		setSliderValue([80, 140]);
		setTextFieldTempo('');  // Clear the textfield
		setActiveSlice('');
	};
	const handleOutsideClick = (event) => {
		if (keyAccordionRef.current && !keyAccordionRef.current.contains(event.target) && openAccordion === 'keyAccordion') {
			setOpenAccordion(null);
		}

		if (bpmAccordionRef.current && !bpmAccordionRef.current.contains(event.target) && openAccordion === 'bpmAccordion') {
			setOpenAccordion(null);
		}
	};
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
									paddingBottom: '1em',
								}}
							>
								<Typography variant='h5' sx={{
									display: 'flex',
									alignItems: 'center',
									color: '#e8eaf6',
									fontWeight: 'bold',
									background: '#e8eaf6',
									WebkitBackgroundClip: 'text',
									// WebkitTextFillColor: 'transparent',
									letterSpacing: '1px',
									borderRadius: '2px',
									fontStyle: 'italic',
									// textTransform: 'uppercase',
									'@media (max-width: 600px)': {
										fontSize: '20px'
									},
								}}>
									results for: {searchQuery}
								</Typography>
							</Card>
						</Grid>

						<Box border={1} borderColor="grey.500" borderRadius={2} m={0} sx={{
							width: '65vw',
							'@media (max-width: 900px)': {
								width: '90vw',
							}
						}}>
							{/* sort */}
							<Grid item container justifyContent='center' xs={12} md={8} spacing={1}>
								<Grid item xs={10} container alignItems="center" spacing={1}> {/* Added container and alignItems */}
									<Grid item> {/* Wrap Typography in a Grid item */}
										<Typography fontSize='1rem' color='white'>Sort by: </Typography>
									</Grid>
									<Grid item > {/* Wrap the SortButton in a Grid item */}
										<SortButton onClick={() => handleSort("key")}>
											<Typography fontSize='1rem' sx={{ textTransform: 'none', }}>
												Key
											</Typography>
											{sortBy === "key" && sortOrder === "asc" ? "↑" : "↓"}
										</SortButton>
									</Grid>
									<Grid item> {/* Wrap the next SortButton in a Grid item */}
										<SortButton onClick={() => handleSort("tempo")}>
											<Typography fontSize='1rem'>BPM</Typography>
											{sortBy === "tempo" && sortOrder === "asc" ? "↑" : "↓"}
										</SortButton>
									</Grid>
								</Grid>
							</Grid>

							{/*/ filter */}
							<Grid item container className='py-1' justifyContent='center' xs={12} md={8} spacing={1}>
								<Grid item xs={10} container alignItems="center" spacing={1}> {/* Added container and alignItems */}
									<Grid item >
										<Typography fontSize='1rem' color='white'>Filter by:</Typography>
									</Grid>
									<Grid item >
										<Accordion
											ref={keyAccordionRef}
											expanded={openAccordion === 'keyAccordion'}
											onChange={() => setOpenAccordion(prev => prev === 'keyAccordion' ? null : 'keyAccordion')}
										>
											<StyledAccordionSummary
												expandIcon={<ExpandMoreIcon />}
											>
												<Typography fontSize='0.8rem' >Key</Typography>
											</StyledAccordionSummary>

											<KeyAccordionDetails>
												<Box>
													<CircleOfFifths activeSlice={activeSlice} setActiveSlice={setActiveSlice} />
												</Box>
											</KeyAccordionDetails>

										</Accordion>
									</Grid>

									<Grid item >
										<Accordion
											ref={bpmAccordionRef}
											expanded={openAccordion === 'bpmAccordion'}
											onChange={() => setOpenAccordion(prev => prev === 'bpmAccordion' ? null : 'bpmAccordion')}
										>
											<StyledAccordionSummary
												expandIcon={<ExpandMoreIcon />}
											>
												<Typography fontSize='0.8rem' >BPM</Typography>
											</StyledAccordionSummary>
											<TempoAccordionDetails>
												<form onSubmit={handleTempoSubmit}>
													<Box sx={{
														display: 'flex',
														height: '200px',
														width: '270px',
														flexDirection: 'column',
														justifyContent: 'center',
													}}>
														<Slider
															min={0}
															max={200}
															getAriaLabel={() => 'Tempo'}
															value={sliderValue}
															onChange={handleTempoSelect}
															valueLabelDisplay="on"
															getAriaValueText={valuetext}
														/>
														<TextField
															value={textFieldTempo}
															onChange={handleTextFieldChange}
															id="filled-basic"
															label="select a range or enter a bpm"
															variant="filled"
															autoComplete="off"
															InputProps={{
																style: {
																	backgroundColor: '#eceff1',
																}
															}}
														/>
														<Button type="submit" variant="contained"
															sx={{
																'&&': {
																	color: 'white',
																	backgroundColor: '#4d97f8',
																	'&:hover': {
																		backgroundColor: '#3746a2',
																	},
																}

															}}
														>
															Filter Tempo
														</Button>
													</Box>
												</form>

											</TempoAccordionDetails>
										</Accordion>
									</Grid>

									<Grid item paddingLeft={'2px'}>
										<Box
											onClick={handleReset}
											variant="contained"
											color="#ffecb3"
											sx={{
												// backgroundColor:'purple',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												cursor: 'pointer',
												width: '60px',
												height: '24px',

											}}
										>
											Reset
										</Box>

									</Grid>
								</Grid>
							</Grid>
						</Box>
						{/* main search */}
						{searchResults
							.filter(item => (!activeSlice || item.key === activeSlice) && item.tempo >= tempoSelect[0] && item.tempo <= tempoSelect[1])
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
							.map((item: ResultItem, index: number) => (
								<Grid item xs={11} md={8} key={index}>
									{/* each card */}
									<Link href={`/${item.name}/${item.artists[0].name}/${item.id}`}>
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
									sx={{
										// marginBottom: '30px',
									}}
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