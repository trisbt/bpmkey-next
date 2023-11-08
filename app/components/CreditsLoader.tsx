import { CircularProgress, Box } from "@mui/material";

export default function CreditsLoader() {
    return (
        <div className='song-page-main background-gradient'>
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(2px)',
                zIndex: 9999
            }}>
                <CircularProgress />
            </Box>
        </div>
    );
}