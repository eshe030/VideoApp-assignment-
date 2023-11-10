// src/App.js

import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Waveform from './Waveform';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    // Retrieve and set video metadata
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const video = document.createElement('video');
        video.src = e.target.result;
        video.addEventListener('loadedmetadata', () => {
          setVideoMetadata({
            duration: video.duration,
            width: video.videoWidth,
            height: video.videoHeight,
          });
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Draw the first frame on the canvas
    if (videoFile && canvasRef.current) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);

      video.addEventListener('loadeddata', () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      });
    }
  }, [videoFile]);

  return (
    <div className="app-container">
      <h1 className="mainheading">Video App</h1>

      <div className="content-container">
        {/* Video file input */}
        <div className="upload-container">
          <label className="upload">Upload File:</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
          />
        </div>

        {/* Display video based on input type */}
        {videoFile && (
          <div className="video-container">
            <video controls width="600" height="400">
              <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Display video metadata on the right */}
        {videoMetadata && (
          <div className="metadata-container">
            <h2>Video Metadata</h2>
            <p>Duration: {videoMetadata.duration.toFixed(2)} seconds</p>
            <p>Width: {videoMetadata.width}px</p>
            <p>Height: {videoMetadata.height}px</p>
          </div>
        )}

        {/* Display audio waveform */}
        {videoMetadata && (
          <div className="waveform-container">
            <h2>Audio Waveform</h2>
            <Waveform audioUrl={URL.createObjectURL(videoFile)} />
          </div>
        )}

        {/* Canvas to display the first frame of the video */}
        {videoFile && (
          <div className="canvas-container">
            <canvas ref={canvasRef} width="300" height="200" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
