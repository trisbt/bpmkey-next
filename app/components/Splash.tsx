import React from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { publicSans } from '../fonts';

const Splash = () => {

    return (
        <div className='splash'>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                background: 'linear-gradient(rgba(100,100,100,.5) 50%, transparent)',
                width: '100vw',
                height: '12em',
            }}>
                <Card sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '80vw',
                    backgroundColor: 'transparent',
                    boxShadow: 0,
                }}>
                    <Typography variant='h2' component="h2" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        background: '#fcfcfc',
                        // background: 'linear-gradient(45deg, #fcfcfe 0%, #bdbdbd 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textTransform: 'uppercase',
                        '@media (max-width: 1100px)': {
                            fontSize: '44px'
                        },
                        '@media (max-width: 600px)': {
                            fontSize: '34px'
                        },
                    }}>
                        Find A Song&apos;s Key, Tempo, and Credits
                        {/* Under Construction check back soon */}
                    </Typography>
                </Card>
            </Box>
        </div>
    );
}
export default Splash;