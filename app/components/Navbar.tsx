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
import { ThemeProvider } from '@mui/material';
import { logoTheme } from '../theme';

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
                height: '46px',
                width: '180px',
                justifyContent: 'center',
               
                backgroundColor: 'transparent',
                boxShadow: '0',
                '@media (max-width:500px)': {
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft:'1px',
                  height:'35px',
                  paddingTop:'6px',
                }
              }}>
                <Link prefetch={false} href="/">
                <ThemeProvider theme={logoTheme}>
                  <Typography component="h1" sx={{
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
                  </ThemeProvider>
                </Link>
              </Card>
 

            {/* desktop and mobile search bar*/}
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <Box display='flex' justifyContent='flex-end' sx={{
                paddingRight:'.8em',
                flexGrow: {
                  flexGrow: 3,  // default value for smaller screens
                  '@media (min-width:500px)': {
                    flexGrow: 6, // value for screens 500px and larger
                  }
                }
              }}>
             
              </Box>
            </Hidden>

            <Box display='flex' flexGrow={1} justifyContent='center' sx={{
              margin: -1.5,
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