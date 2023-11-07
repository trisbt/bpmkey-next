import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
    return (
        <div className='song-page-main background-gradient min-h-[150em] min-w-[100vw]'>
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
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
