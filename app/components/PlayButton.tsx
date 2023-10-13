'use client'
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';


const PlayButton = ({ previewUrl, currentlyPlaying, setCurrentlyPlaying }) => {
	const audioRef = useRef(null);

	const togglePlayback = (event) => {
		event.stopPropagation();
		event.preventDefault();

		if (audioRef.current && previewUrl) {
			audioRef.current.volume = 0.3;

			if (currentlyPlaying && currentlyPlaying !== audioRef.current) {
				currentlyPlaying.pause();  // Pause any other playing audio
			}

			if (audioRef.current.paused) {
				audioRef.current.src = previewUrl;
				audioRef.current.play();
				setCurrentlyPlaying(audioRef.current);  // Save this audio's reference
			} else {
				audioRef.current.pause();
				setCurrentlyPlaying(null);  // Set no audio as currently playing
			}
		}
	};

	return (
		<div>
			<IconButton
				onClick={togglePlayback}
				className="play-button text-white bg-black hover:text-white hover:bg-green-500 text-sm w-10 h-10"
			>
				{currentlyPlaying === audioRef.current ? <StopIcon /> : <PlayArrowIcon />}
			</IconButton>

			<audio ref={audioRef} src={previewUrl} onEnded={() => setCurrentlyPlaying(false)} />
		</div>
	);
}

export default PlayButton;