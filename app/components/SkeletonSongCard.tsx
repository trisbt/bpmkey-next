import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SkeletonSongCard() {
    return (
        <div className='song-page-main background-gradient min-h-[150em] min-w-[100vw]'>
            {/* <Grid item xs={11} md={8}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '20px 10px 0',
                        boxShadow: 0,
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        // paddingBottom: '1em',
                    }}
                >
                    <Typography variant='h4' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: '#e8eaf6',
                        fontWeight: 'bold',
                        background: '#e8eaf6',
                        WebkitBackgroundClip: 'text',
                        letterSpacing: '1px',
                        borderRadius: '2px',
                        '@media (max-width: 600px)': {
                            fontSize: '22px'
                        },
                    }}>
                        Bpm, Key, Credits for
                    </Typography>
                </Card>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '8px 10px 0',
                        boxShadow: 0,
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        // paddingBottom: '1em',
                    }}
                >
                    <Typography variant='h5' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: '#e8eaf6',
                        // fontWeight: 'bold',
                        background: '#e8eaf6',
                        WebkitBackgroundClip: 'text',
                        letterSpacing: '1px',
                        borderRadius: '2px',
                        fontStyle: 'italic',
                        '@media (max-width: 600px)': {
                            fontSize: '22px'
                        },
                    }}>

                    </Typography>
                </Card>
            </Grid>
            <div className='song-page-container animate-pulse'>
                <Card sx={{
                    width: '90vw',
                    height: '90vh',
                    overflowY: 'visible',
                    maxHeight: 'inherit',
                    borderRadius: '0',
                    paddingTop: '3px',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    paddingBottom: '5px'
                }}>

                </Card>
            </div> */}
        </div>
    )
}