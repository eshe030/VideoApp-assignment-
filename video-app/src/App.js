// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState(null);

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
      </div>
    </div>
  );
}

export default App;
