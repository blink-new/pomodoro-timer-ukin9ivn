import { useCallback } from 'react';

const sounds = {
  complete: new Audio('/sounds/complete.mp3'),
  click: new Audio('/sounds/click.mp3'),
};

export const useSound = (enabled: boolean) => {
  const playSound = useCallback((sound: keyof typeof sounds) => {
    if (enabled && sounds[sound]) {
      sounds[sound].currentTime = 0;
      sounds[sound].play().catch(() => {});
    }
  }, [enabled]);

  return { playSound };
};