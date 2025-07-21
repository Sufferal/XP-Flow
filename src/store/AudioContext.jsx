import { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const playSound = src => {
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0; // Set the time to the beggining
    }

    const sound = new Audio(src);
    sound.play();

    setCurrentlyPlaying(sound);
  };

  return (
    <AudioContext.Provider value={{ playSound }}>
      {children}
    </AudioContext.Provider>
  );
};
