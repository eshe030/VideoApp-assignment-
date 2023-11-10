// src/Waveform.js

import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioUrl }) => {
  const waveformRef = useRef(null);

  useEffect(() => {
    // Create a new WaveSurfer instance
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
    });

    // Load the audio file
    wavesurfer.load(audioUrl);

    // Clean up the WaveSurfer instance on unmount
    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  return <div ref={waveformRef} />;
};

export default Waveform;
