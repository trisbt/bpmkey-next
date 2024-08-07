import { MutableRefObject } from 'react';

export const playAudio = (
    event: React.MouseEvent,
    previewUrl: string | null,
    audioRef: MutableRefObject<HTMLAudioElement | null>,
    setCurrentlyPlayingUrl: (url: string | null) => void
) => {
    event.stopPropagation();
    event.preventDefault();
    if (audioRef.current && previewUrl) {
        audioRef.current.volume = 0.3;

        if (audioRef.current.src === previewUrl && !audioRef.current.paused) {
            audioRef.current.pause();
            setCurrentlyPlayingUrl(null);
        } else {
            if (!audioRef.current.paused) {
                // Stop currently playing audio if there is any
                audioRef.current.pause();
            }
            audioRef.current.src = previewUrl;
            audioRef.current.play();
            setCurrentlyPlayingUrl(previewUrl);
        }
    }
};
