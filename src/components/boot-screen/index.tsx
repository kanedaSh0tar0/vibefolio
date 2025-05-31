import { useProgress } from "@react-three/drei";
import { useCallback, useEffect, useState } from "react";
import { Container, Screen } from "./styles";
import { useSoundContext } from "../../context/SoundContext";

function BootScreen({ onFinish }: { onFinish: () => void }) {
  const { progress } = useProgress();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { playIntro } = useSoundContext();
  const allReady = progress === 100 && fontsLoaded;

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
        <pre style={{ fontFamily: "monospace" }}>
          {[
            "> Initializing virtual BIOS...",
            `> Loading 3D assets.... ${Math.round(progress)
              .toString()
              .padEnd(3, " ")}%`,
            `> Fonts system......... ${fontsLoaded ? "OK" : "LOADING"}`,
            "> CRT Display.......... ONLINE",
            "> Audio system......... ONLINE",
          ].join("\n")}
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
        </pre>
      </Screen>
    </Container>
  );
}

export default BootScreen;
