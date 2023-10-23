import Link from 'next/link'
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
import SearchBar from './SearchBar';
import { logoFont } from '../fonts';


function Navbar() {

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
          }}>

              <Card sx={{
                display: 'flex',
                height: '40px',
                width: '180px',
                justifyContent: 'center',
               
                backgroundColor: 'transparent',
                boxShadow: '0',
                // overflow: 'hidden',
                '@media (max-width:500px)': {
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft:'1px',
                  height:'35px',
                  paddingTop:'9px',
                }
              }}>
                <Link href="/">
                  <Typography className={logoFont.className} sx={{
                    color: 'white',
                    fontSize: '35px',
                    textAlign: 'center',
                    transform: 'scaleY(1.4)',
                    '@media (max-width:500px)': {
                      fontSize: '28px',
                    }
                  }}>
                    BPMKEY
                  </Typography>
                </Link>
              </Card>
 

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
            }}>
              <SearchBar />
            </Box>
          </Toolbar>
        </Container>
      </AppBar >
    </div >
  );
}
export default Navbar;