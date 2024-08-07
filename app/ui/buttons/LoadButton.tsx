import React from 'react'
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';

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

export default LoadButton