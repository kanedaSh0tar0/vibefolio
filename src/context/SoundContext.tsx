import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

const audioList = {
  clickDown: "/sounds/click-down.mp3",
  clickUp: "/sounds/click-up.mp3",
  intro: "/sounds/intro-sound.mp3",
};

interface SoundContextType {
  playClickDown: () => void;
  playClickUp: () => void;
  playIntro: () => void;
  mute: () => void;
  unmute: () => void;
  isLoaded: boolean;
  loadProgress: number;
  isMuted: boolean;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSounds must be used within SoundProvider");
  return context;
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [sounds, setSounds] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const total = Object.keys(audioList).length;

  useEffect(() => {
    const loadAudio = (
      name: string,
      src: string
    ): Promise<[string, HTMLAudioElement]> =>
      new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = src;
        audio.preload = "auto";
        audio.addEventListener(
          "canplaythrough",
          () => {
            resolve([name, audio]);
          },
          { once: true }
        );
        audio.addEventListener("error", reject, { once: true });
      });

    const loadAll = async () => {
      console.log(Object.entries(audioList), "Object.entries(audioList)");

      const entries = await Promise.all(
        Object.entries(audioList).map(([name, src]) =>
          loadAudio(name, src).finally(() => {
            setIsLoaded(true);
          })
        )
      );

      setSounds(Object.fromEntries(entries));
    };

    loadAll();
  }, []);

  const rawClickDown = () => sounds.clickDown?.play();
  const rawClickUp = () => sounds.clickUp?.play();
  const rawIntro = () => sounds.intro?.play();

  const loadProgress = (Object.keys(sounds).length / total) * 100;

  const play = (fn: () => void) => {
    if (!isMuted) fn();
  };

  const value: SoundContextType = {
    playClickDown: () => play(rawClickDown),
    playClickUp: () => play(rawClickUp),
    playIntro: () => play(rawIntro),
    mute: () => setIsMuted(true),
    unmute: () => setIsMuted(false),
    isLoaded,
    loadProgress,
    isMuted,
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};
