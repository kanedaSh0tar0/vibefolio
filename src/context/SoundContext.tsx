import { createContext, useContext, ReactNode } from "react";
import { useSound } from "../hooks/useSound";

interface SoundContextType {
  playClickDown: () => void;
  playClickUp: () => void;
  playIntro: () => void;
  mute: () => void;
  unmute: () => void;
  isMuted: boolean;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSounds must be used within SoundProvider");
  return context;
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  let muted = false;

  const { play: rawClickDown } = useSound("/sounds/click-down.mp3", 1);
  const { play: rawClickUp } = useSound("/sounds/click-up.mp3", 1);
  const { play: rawIntro } = useSound("/sounds/intro-sound.mp3", 1);

  const play = (fn: () => void) => {
    if (!muted) fn();
  };

  const value: SoundContextType = {
    playClickDown: () => play(rawClickDown),
    playClickUp: () => play(rawClickUp),
    playIntro: () => play(rawIntro),
    mute: () => (muted = true),
    unmute: () => (muted = false),
    get isMuted() {
      return muted;
    },
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};
