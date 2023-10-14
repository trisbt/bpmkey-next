'use client'
import React, { useState } from 'react';
import { Modal, Fade } from '@mui/material';

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
            <img
                className='modal-img'
                src={songDetails.images}
                alt={songDetails.name}
                onClick={handleOpen}
                style={{
                    cursor: 'pointer',
                    boxShadow: 2,
                }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Fade in={open}>
                    <img
                        src={songDetails.images}
                        alt={songDetails.name}
                        style={{ width: '50%', height: 'auto', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)' }}
                    />
                </Fade>
            </Modal>
        </>
    )
}

export default ImageModal;
