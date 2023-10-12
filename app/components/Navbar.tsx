// 'use client'
// import { useState, MouseEvent, useEffect } from 'react';
// import { useSearchParams, Link } from 'next/navigation';
import Link from 'next/link'
// import { useNavigation, useSearchParams, useNavigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Card, Hidden } from '@mui/material';
import Popper from '@mui/material/Popper';
import SearchData from './SearchData';
import SearchBar from './SearchBar';

// interface MenuState {
//   anchorElUser: null | HTMLElement;
// }

function Navbar({
  // setOffset, offset, setResponse, response, setAudioInfo, audioInfo, setSearchResult, searchResult 
}) {

  return (
    <div>
      <AppBar position="static"
        sx={{
          backgroundColor: '#0047d4',

        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{
            minHeight: '45px',
            '@media (max-width: 600px)': {
              minHeight: '52px',
            }
          }}>
            <Box sx={{
              position: 'relative',
              display: 'flex',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Card sx={{
                display: 'flex',
                height: '40px',
                width: '175px',
                // alignItems: 'flex',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                boxShadow: '0',
                overflow: 'hidden'
              }}>
                <Link href="/" >
                <Typography className='font-custom' sx={{
                  color:'white',
                  fontSize: '35px',
                  textAlign: 'center',
                  transform: 'scaleY(1.4)',
                }}>
                  BPMKEY
                </Typography>
                </Link>
              </Card>
            </Box>

            {/* desktop and mobile search bar*/}
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <Box display='flex' justifyContent='flex-end' sx={{
                flexGrow: {
                  flexGrow: 3,  // default value for smaller screens
                  '@media (min-width:500px)': {
                    flexGrow: 6, // value for screens 500px and larger
                  }
                }
              }}>
                <Typography variant='subtitle2' color='#f5f5f5' fontWeight={800}>
                  {/* Search */}
                </Typography>
              </Box>
            </Hidden>

            <Box display='flex' flexGrow={1} justifyContent='center' sx={{
              margin: 0,
              width: '0px',
              // backgroundColor:'green',
            }}>
              <SearchBar/>
              {/* <SearchData
                // setResponse={setResponse}
                // response={response}
                // setAudioInfo={setAudioInfo}
                // audioInfo={audioInfo}
                // setSearchResult={setSearchResult}
                // searchResult={searchResult}
                // setOffset={setOffset}
                // offset={offset}
              /> */}
            </Box>


          </Toolbar>
        </Container>
      </AppBar >
    </div >
  );
}
export default Navbar;