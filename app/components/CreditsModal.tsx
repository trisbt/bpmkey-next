'use client'
import React from 'react';
import { styled } from "@mui/material/styles";
import { Modal, Fade, Box, Typography, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

interface CreditsModalProps {
    open: boolean;
    handleClose: () => void;
    credits: {
        artist_name: string;
        role: string;
    }[];
}

const CreditsModal: React.FC<CreditsModalProps> = ({ open, handleClose, credits }) => {


    return (
        <Modal
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '75%',
                        height: '75%',
                        backdropFilter: 'blur(25px)',
                        backgroundColor: '#f5f5f5',
                        padding: '3em',
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
                    <Typography variant="h4" color='text.primary' sx={{
                        paddingBottom: '1em',
                    }}>Credits</Typography>

                    <ul style={{
                        columns: '2',
                        paddingInlineStart: '0',
                    }}>
                        {credits.map((el) => (
                            <li key={el.artist_name}>
                                <span className="even-credit">{el.artist_name}</span><span className="odd-credit"> - {el.role}</span>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CreditsModal;
