import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

const audioList = {
  clickDown: "sounds/click-down.mp3",
  clickUp: "sounds/click-up.mp3",
  intro: "sounds/intro-sound.mp3",
  notification: "sounds/pop.wav",
};

interface SoundContextInterface {
  playClickDown: () => void;
  playClickUp: () => void;
  playIntro: () => void;
  playNotification: () => void;
  mute: () => void;
  unmute: () => void;
  isLoaded: boolean;
  loadProgress: number;
  isMuted: boolean;
}

const SoundContext = createContext<SoundContextInterface | null>(null);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSounds must be used within SoundProvider");
  return context;
};

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferMap = useRef<Map<string, AudioBuffer>>(new Map());
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext();

    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    gainNodeRef.current.gain.value = 1;

    const loadAudio = async (name: string, url: string) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioContextRef.current!.decodeAudioData(
        arrayBuffer
      );
      bufferMap.current.set(name, buffer);
      setLoadProgress((prev) => prev + 1);
    };

    const loadAll = async () => {
      const entries = Object.entries(audioList);
      await Promise.all(entries.map(([name, url]) => loadAudio(name, url)));
      setIsLoaded(true);
    };

    loadAll();
  }, []);

  const playSound = useCallback(
    (name: keyof typeof audioList) => {
      if (!isLoaded) return;

      const ctx = audioContextRef.current;
      const buffer = bufferMap.current.get(name);
      const gainNode = gainNodeRef.current;

      if (!ctx || !buffer || !gainNode) return;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(gainNode);
      source.start(0);
    },
    [isLoaded]
  );

  const playClickDown = useCallback(() => playSound("clickDown"), [playSound]);
  const playClickUp = useCallback(() => playSound("clickUp"), [playSound]);
  const playIntro = useCallback(() => playSound("intro"), [playSound]);
  const playNotification = useCallback(
    () => playSound("notification"),
    [playSound]
  );
  const setVolume = (volume: number) => {
    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current;

    if (!ctx || !gain) return;

    const now = ctx.currentTime;

    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.1);

    setIsMuted(volume === 0);
  };

  const value = useMemo(
    () => ({
      playClickDown,
      playClickUp,
      playIntro,
      playNotification,
      mute: () => setVolume(0),
      unmute: () => setVolume(1),
      isLoaded,
      loadProgress,
      isMuted,
    }),
    [
      playClickDown,
      playClickUp,
      playIntro,
      playNotification,
      isLoaded,
      loadProgress,
      isMuted,
    ]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
