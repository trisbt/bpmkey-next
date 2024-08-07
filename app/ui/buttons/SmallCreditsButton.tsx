import React from 'react'
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';

const SmallCreditsButton = styled(Button)(() => ({
  '&&': {
    color: '#fff',
    backgroundColor: 'black',
    '&:hover': {
      color: 'white',
      backgroundColor: '#00e676'
    },
    fontSize: '15px',
    width: '100px',
    height: '50px',
    lineHeight: '0',
    boxShadow: 3,
    borderRadius: '50px',
  }
}));

export default SmallCreditsButton