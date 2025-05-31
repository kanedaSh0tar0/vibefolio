import { useProgress } from "@react-three/drei";
import { useCallback, useEffect, useState } from "react";
import { Container, ErrorText, Screen, Text, WarningText } from "./styles";
import { useSoundContext } from "../../context/SoundContext";

function BootScreen({ onFinish }: { onFinish: () => void }) {
  const { progress } = useProgress();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const {
    playIntro,
    isLoaded: audioReady,
    loadProgress: audioProgress,
  } = useSoundContext();
  const allReady = progress === 100 && fontsLoaded;
  const [skanningDots, setScanningDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setScanningDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleOnFinish = useCallback(() => {
    onFinish();
    playIntro();
  }, [onFinish, playIntro]);

  const onPressEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && allReady) {
        handleOnFinish();
      }
    },
    [allReady, handleOnFinish]
  );

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
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
