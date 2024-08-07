import React from 'react'
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';

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

export default SortButton