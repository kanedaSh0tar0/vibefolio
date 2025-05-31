import { useProgress } from "@react-three/drei";
import { useCallback, useEffect, useState } from "react";
import { Container, Screen } from "./styles";

function BootScreen({ onFinish }: { onFinish: () => void }) {
  const { progress } = useProgress();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const allReady = progress === 100 && fontsLoaded;

  const onPressEnter = useCallback(
    (e: KeyboardEvent) => {
      console.log("ENTER PRESSED");

      if (e.key === "Enter" && allReady) {
        onFinish();
      }
    },
    [allReady, onFinish]
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
                onClick={onFinish}
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
