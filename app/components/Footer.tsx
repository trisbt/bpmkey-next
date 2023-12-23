import React, { FC } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SpotifyFooterLogo from '../SpotifyFooterLogo';

const Footer: FC = () => {
  return (
    <div>
      <Box
      component="div"
        sx={{
          backgroundColor: '#0047d4',
          padding: '20px',
          maxHeight: '300px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{
          width: '75%',
          '@media (max-width:600px)': {
            width: '90%'
          }
        }}>
          <Typography variant="h6" component = "h1" color='#FFFFFF' gutterBottom sx={{
            letterSpacing: '1px',
            textAlign: 'center',
            '@media (max-width:600px)': {
              fontSize: '14px'
            }
          }}>
            Bpmkey.com is your plug to finding information for any song, including BPM, Key, and Song Credits.
          </Typography>
          <hr className="border-t-2 border-gray-300 my-4" />
          <Typography variant="subtitle1" color='#FFFFFF' gutterBottom sx={{
            letterSpacing: '1px',
            textAlign: 'center',
            '@media (max-width:600px)': {
              fontSize: '14px'
            }
          }}>
            Stay tuned for future updates!
          </Typography>
        </Box>
      </Box>
      <hr className="border-gray-400" />

      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          padding: '10px',
          maxHeight: '200px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{
          width: '95%',
          paddingBottom: '.5em',
        }}>
          <Typography variant="subtitle2" color='text.secondary' gutterBottom sx={{
            display: 'flex',
            alignItems: 'center',
            
            '@media (max-width:600px)': {
              fontSize: '12px',
            }

          }}>
            Song data provided by
            <Link prefetch={false} href={'https://www.spotify.com'} className="customLink">
              <SpotifyFooterLogo/>

            </Link>
          </Typography>

          <Typography variant="subtitle2" color='text.secondary' gutterBottom sx={{
            '@media (max-width:600px)': {
              fontSize: '12px',
            }
          }}>
            Credits data provided by Discogs
          </Typography>

          <Typography variant="subtitle2" color='text.secondary' gutterBottom sx={{
            '@media (max-width:600px)': {
              fontSize: '12px',
            }
          }}>
            © 2023 BpmKey.com. All Rights Reserved. | <Link href="/privacy">Privacy Policy</Link>
          </Typography>

        </Box>

      </Box>

    </div>
  );
};

export default Footer;