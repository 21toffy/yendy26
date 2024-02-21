// contexts/AudioContext.js
import { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (src) => {
    setAudioSrc(src);
    setIsPlaying(true);
  };

  const stopAudio = () => {
    setAudioSrc(null);
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ audioSrc, isPlaying, playAudio, stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
