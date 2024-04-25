import React, { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const setPlayingAudio = (audioElement) => {
    if (currentAudio && currentAudio !== audioElement) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset to the start
    }
    setCurrentAudio(audioElement);
  };

  return (
    <AudioContext.Provider value={{ setPlayingAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
