'use client'
import React from 'react'
import { useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';


const PlayButton = ({ previewUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlayback = () => {
        audioRef.current.volume = 0.3;
        if (isPlaying) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div>
            <IconButton onClick={togglePlayback}
                className="text-white bg-black hover:text-white hover:bg-green-500 text-sm w-10 h-10"
            > 
                {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
            </IconButton> 
            <audio ref={audioRef} src={previewUrl} onEnded={() => setIsPlaying(false)} />
        </div>
    );
}

export default PlayButton