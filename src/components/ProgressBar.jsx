import React from 'react';

export function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-container">
      <div 
        className="progress-bar" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
