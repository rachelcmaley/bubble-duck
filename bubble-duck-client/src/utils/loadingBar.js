import React, { useState, useEffect } from "react";

export function LoadingBar({ loading }) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
      let timer;
      if (loading && progress < 100) {
        // Only simulate progress if loading is true and progress is less than 100%
        timer = setTimeout(() => setProgress(progress + 1), 200);
      } else if (!loading) {
        // When loading is complete, immediately set progress to 100%
        setProgress(100);
        // Reset the progress bar after a short delay
        setTimeout(() => setProgress(0), 500);
      }
      return () => clearTimeout(timer);
    }, [loading, progress]);
  
    return (
      <div style={{ width: '350px', backgroundColor: '#CFDAA9', borderRadius: '10px'}}>
        <div
          style={{
            width: `${progress}%`,
            height: '10px',
            backgroundColor: '#6B72C3',
            transition: 'width 0.2s ease-in-out',
            borderRadius: '10px'
          }}
        ></div>
      </div>
    );
  }