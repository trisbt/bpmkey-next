import React from 'react'
import { styled } from "@mui/material/styles";
import { IconButton } from '@mui/material';

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

export default SmallPlayButton