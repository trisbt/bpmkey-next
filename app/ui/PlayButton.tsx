'use client';
import React from 'react';
import { useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import { styled } from "@mui/material/styles";
import { grey } from '@mui/material/colors';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { PlayButtonProps } from '../types/dataTypes';

const StyledPlayButton = styled(Button)(() => ({
	'&&': {
		color: '#fff',
		backgroundColor: 'black',
		'&:hover': {
			color: 'white',
			backgroundColor: '#00e676'
		},
		fontSize: '15px',
		width: '200px',
		height: '50px',
		lineHeight: '0',
		boxShadow: 3,
		borderRadius: '50px',
	}
}));

const StyledPlayButtonSmall = styled(Button)(() => ({
	'&&': {
		color: '#fff',
		backgroundColor: 'black',
		'&:hover': {
			color: 'white',
			backgroundColor: '#00e676'
		},
		fontSize: '15px',
		minWidth: '55px',
		height: '55px',
		borderRadius: '50%',
	}

}));

const PlayButton: React.FC<PlayButtonProps> = ({ previewUrl }) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const togglePlayback = (event:React.MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();

		if (audioRef.current && previewUrl) {
			audioRef.current.volume = 0.3;

			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				if (audioRef.current.src !== previewUrl) {
					audioRef.current.src = previewUrl;
				}
				audioRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	return (
		<div>
			<Hidden mdUp>
				<StyledPlayButtonSmall
					onClick={togglePlayback}
					className="play-button-small text-white bg-black hover:text-white hover:bg-green-500 text-sm"
				>
					{isPlaying ? <StopIcon aria-label="stop"
						sx={{
							height: 36,
							width: 36,
						}}
					/>
						:
						<PlayArrowIcon aria-label="play/pause"
							sx={{
								height: 35,
								width: 35,
							}}
						/>}
				</StyledPlayButtonSmall>
			</Hidden>

			<Hidden mdDown>
				<StyledPlayButton
					onClick={togglePlayback}
					className="play-button-lg text-white bg-black hover:text-white hover:bg-green-500 text-sm w-10 h-10"
				>
					{isPlaying
						? <>
							<StopIcon />
							Stop Track
						</>
						: <>
							<PlayArrowIcon />
							Preview Track
						</>}
				</StyledPlayButton>
			</Hidden>
			<audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
		</div>
	);
};

export default PlayButton;
