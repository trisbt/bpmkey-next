'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled, Theme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Hidden from '@mui/material/Hidden';
import CloseIcon from '@mui/icons-material/Close';
import slugify from 'slugify';
const theme: Theme = createTheme({
	palette: {
		primary: {
			light: '#99cbfd',
			main: '#4d97f8',
			dark: '#3746a2',
			contrastText: '#fff',
		},
		secondary: {
			light: '#fffbe8',
			main: '#eec94b',
			dark: '#9e7937',
			contrastText: '#000',
		},
	},
});

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.secondary.light,
	backgroundColor: theme.palette.primary.main,
	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	},
	minWidth: '45px',
	padding: 0
}));

const SmallColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.secondary.light,
	border: 'none',
	margin: 0,
	padding: 0,
	minWidth: '20px'
}));

const CloseButton = styled(CloseIcon)(({ theme }) => ({
	color: theme.palette.text.primary,
	backgroundColor: 'transparent',
	position: 'absolute',
	borderColor: 'none',
	right: '5px',
	top: '5px'
}));

const StyledInput = styled(Input)(({ theme }) => ({
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(1),
}));

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [showInput, setShowInput] = useState(false);
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowInput(false);
		const searchQuery = slugify(query, { lower: true, strict: true })
		router.push(`/search?q=${searchQuery}`);
	};


	return (
		<ThemeProvider theme={theme}>
			<div className='searchform-container'>
				<Hidden smDown>
					<form className='searchform' onSubmit={handleSubmit} style={{
						display: 'flex',
						justifyContent: 'center',
					}}>
						<FormControl sx={{
							width: '450px',
							"@media (max-width: 800px)": {
								width: '300px',
							}
						}}>
							<StyledInput
								className='searchbox'
								placeholder='Search for songs, artists, albums...'
								type='text'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
						</FormControl>
						<ColorButton type='submit' variant='outlined'>
							<SearchIcon sx={{ fontSize: '28px' }} />
						</ColorButton>
					</form>
				</Hidden>

				<Hidden smUp>

					{!showInput ? (
						<Box>
							<SmallColorButton onClick={() => setShowInput(true)} variant='outlined'>
								<Box sx={{
									width: '10em'
								}}>
									<Typography variant='subtitle2' component="h1"color='#f5f5f5' fontWeight={800} sx={{
										fontSize: '.8em'
									}}>
										Search for songs...
									</Typography>
								</Box>
								<SearchIcon sx={{ fontSize: '28px' }} />

							</SmallColorButton>
						</Box>
					) : (
						<form className='sm-searchform' onSubmit={handleSubmit}
							style={{
								display: 'flex',
								position: 'absolute',
								margin: 0,
								padding: 0,
								top: 0,
								left: 0,
								width: '100vw',
								zIndex: 2,
								background: 'white',
								boxSizing: 'border-box',
							}}
						>
							<FormControl style={{ width: '100%', height: '52px', }}>
								<StyledInput
									className='searchbox'
									placeholder='Search for songs, artists, albums...'
									type='text'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									autoFocus
								/>
							</FormControl>
							<SmallColorButton onClick={() => setShowInput(false)} variant='outlined' style={{ marginLeft: '10px' }}>
								<CloseIcon sx={{
									border: 'none',
									color: 'black',
								}} />
							</SmallColorButton>
						</form>
					)}
				</Hidden>
			</div>
		</ThemeProvider>
	);

}

export default SearchBar