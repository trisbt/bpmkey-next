'use client'
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Image from 'next/image';

interface ImageModalProps {
    songDetails: {
        images: string;
        name: string;
    };
}

const ImageModal: React.FC<ImageModalProps> = ({ songDetails }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Image
                unoptimized
                width={500}
                height={500}
                src={songDetails.images}
                alt={songDetails.name}
                onClick={handleOpen}
                style={{
                    cursor: 'pointer',
                }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropProps={{
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
                        component="img"
                        src={songDetails.images}
                        alt={songDetails.name}
                        sx={{
                            width: '50%',
                            height: 'auto',
                            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
                            "@media (max-width: 500px)": {
                                width: '80%',
                            }
                        }}
                    >
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ImageModal;
