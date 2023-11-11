import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioUrl, videoElement }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    // Create a new WaveSurfer instance
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
    });

    // Load the audio file
    wavesurfer.current.load(audioUrl);

    // Synchronize playback with the video element
    if (videoElement && wavesurfer.current) {
      videoElement.addEventListener('play', () => {
        wavesurfer.current.play();
      });

      videoElement.addEventListener('pause', () => {
        wavesurfer.current.pause();
      });

      videoElement.addEventListener('timeupdate', () => {
        const currentTime = videoElement.currentTime;
        wavesurfer.current.seekTo(currentTime / videoElement.duration);
      });
    }

    // Clean up the WaveSurfer instance on unmount
    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioUrl, videoElement]);

  return <div ref={waveformRef} />;
};

export default Waveform;