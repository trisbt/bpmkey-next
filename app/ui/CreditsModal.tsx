'use client'
import React from 'react';
import { styled } from "@mui/material/styles";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { Credits, ProcessedCredit } from '../types/dataTypes';

interface CreditsModalProps {
    open: boolean;
    handleClose: () => void;
    credits: Credits;
}

const CreditsModal: React.FC<CreditsModalProps> = ({ open, handleClose, credits }) => {


    return (
        <Modal
            disableScrollLock={true}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            // hideBackdrop
            BackdropProps={{
                style: { backgroundColor: 'transparent' },
                timeout: 500,
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Fade in={open}>
                <Box component='div'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                        width: '75%',
                        height: '75%',
                        backdropFilter: 'blur(25px)',
                        backgroundColor: '#f5f5f5',
                        padding: '2em',
                        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
                        "@media (max-width: 500px)": {
                            width: '80%',
                        },

                    }}
                >
                    {/* Close button */}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            color: theme => theme.palette.grey[500]
                        }}
                    >
                        <CloseOutlined />
                    </IconButton>

                    <Typography variant="h4" color='text.primary' >Credits</Typography>
                    <Typography variant="subtitle1" color='text.primary' sx={{
                        fontStyle: 'italic',
                        paddingBottom: '1em',
                    }}>via Discogs</Typography>

                    {credits && credits.length === 1 && typeof credits[0] === 'object' && 'role' in credits[0] && credits[0].role === "no credits available at this time" ? (
                        <Typography variant="subtitle2" color='text.primary' sx={{ textAlign: 'center' }}>
                            {credits[0].role}
                        </Typography>
                    ) : (
                        <Box component='div' sx={{
                            // maxHeight: 'calc(75% - 3em)',
                            overflowY: 'auto',
                        }}>
                            <ul style={{
                                columns: '2',
                                paddingInlineStart: '0',

                            }}>
                                {credits && credits.map((el) => (
                                    typeof el === 'object' && 'artist_name' in el ? (
                                        <li key={el.artist_name} className='credits-list'>
                                            <span className="even-credit">{el.artist_name}</span><span className="odd-credit"> - {el.role}</span>
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        </Box>
                    )}


                </Box>
            </Fade>
        </Modal>
    )
}

export default CreditsModal;
