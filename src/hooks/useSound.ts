import { useRef, useCallback } from "react";

export const useSound = (url: string, volume = 1, loop = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.loop = loop;
    audioRef.current = audio;
  }

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current!.currentTime = 0;
  }, []);

  return { play, stop };
};
