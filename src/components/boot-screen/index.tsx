import { useProgress } from "@react-three/drei";
import { useCallback, useEffect, useState } from "react";
import { Container, ErrorText, Screen, Text, WarningText } from "./styles";
import { useSoundContext } from "../../context/sound";
import { useCameraContext } from "../../context/camera";

const cursorsList = {
  arrow: "/vibefolio/cursor/Arrow1.cur",
  pointer: "/vibefolio/cursor/Hand2.cur",
  notAllowed: "/vibefolio/cursor/Win95Stop.cur",
  move: "/vibefolio/cursor/Win95Move.cur",
  loadingStart: "/vibefolio/cursor/Hourglass_Start.cur",
  loadingMid: "/vibefolio/cursor/Hourglass_Mid.cur",
  loadingEnd: "/vibefolio/cursor/Hourglass_End.cur",
};

function BootScreen({ onFinish }: { onFinish: () => void }) {
  const { progress } = useProgress();
  const { start } = useCameraContext();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [cursorsLoaded, setCursorsLoaded] = useState(false);
  const {
    playIntro,
    isLoaded: audioReady,
    loadProgress: audioProgress,
  } = useSoundContext();
  const allReady = progress === 100 && fontsLoaded && audioReady && cursorsLoaded;
  const [skanningDots, setScanningDots] = useState("");

  const preloadCursor = (url: string): Promise<void> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });

  const handleOnFinish = useCallback(() => {
    onFinish();
    playIntro();
    start();
  }, [onFinish, playIntro, start]);

  const onPressEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && allReady) {
        handleOnFinish();
      }
    },
    [allReady, handleOnFinish]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setScanningDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadCursors = async () => {
      const entries = Object.entries(cursorsList);
      await Promise.all(entries.map(([, url]) => preloadCursor(url)));
      setCursorsLoaded(true);
    };
    document.fonts.ready.then(() => setFontsLoaded(true));
    loadCursors();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onPressEnter);
    return () => window.removeEventListener("keydown", onPressEnter);
  }, [onPressEnter]);

  return (
    <Container>
      <Screen>
        <Text>
          {[
            "> Booting PortfolioOS v1.0",
            `> Loading 3D assets.... ${Math.round(progress)
              .toString()
              .padEnd(3, " ")}%`,
            `> Fonts system......... ${fontsLoaded ? "OK" : "LOADING"}`,
            `> Audio system......... ${
              audioReady ? "OK" : `${Math.round(audioProgress)}%`
            }`,
            "> CRT Display.......... ONLINE",
          ].join("\n")}
          {
            <>
              {"\n> Employment status.... "}
              <ErrorText>UNEMPLOYED</ErrorText>
            </>
          }
          {
            <>
              {"\n> Job seek subsystem... "}
              <WarningText>SCANNING NETWORK{skanningDots}</WarningText>
            </>
          }
          {
            <>
              {"\n> Floppy drive......... "}
              <WarningText>NOT FOUND — SKIPPING</WarningText>
            </>
          }
          {allReady && (
            <>
              {"\n> Boot sequence complete. Press "}
              <span
                onClick={handleOnFinish}
                className="cursor-pointer"
                style={{ textDecoration: "underline" }}
              >
                ENTER
              </span>
              {" to continue..."}
            </>
          )}
        </Text>
      </Screen>
    </Container>
  );
}

export default BootScreen;
