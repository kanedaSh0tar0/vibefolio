import { ThemeProvider } from "styled-components";
import { CRTOverlay, GlobalStyle, StartOpacity } from "./GlobalStyle";
import { useEffect, useState } from "react";
import { useAppSelector } from "./store/hooks";
import Scene from "./scene";
import Desktop from "./components/desktop";
import ModalManager from "./components/modals";
import BootScreen from "./components/boot-screen";
import { useSoundContext } from "./context/sound";
import SnackbarManager from "./components/popups";

const MIN_WIDTH = 1024;
const MIN_HEIGHT = 600;

function App() {
  const [isSupported, setIsSupported] = useState(true);
  const [bootDone, setBootDone] = useState(false);
  const activeTheme = useAppSelector((state) => state.themes);
  const { playClickDown, playClickUp } = useSoundContext();

  useEffect(() => {
    if (!bootDone) return;

    window.addEventListener("pointerdown", playClickDown);
    window.addEventListener("pointerup", playClickUp);

    return () => {
      window.removeEventListener("pointerdown", playClickDown);
      window.removeEventListener("pointerup", playClickUp);
    };
  }, [bootDone]);

  useEffect(() => {
    const checkSize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      setIsSupported(w >= MIN_WIDTH && h >= MIN_HEIGHT);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // TODO: Better styling for unsupported screen sizes
  if (!isSupported) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>The screen is too small</h1>
        <span>Desktop only</span>
        <br />
        <a href="pdf/cv_antonov_mykyta.pdf">PDF</a>
      </div>
    );
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <CRTOverlay />
      <GlobalStyle />

      {!bootDone && <BootScreen onFinish={() => setBootDone(true)} />}

      <StartOpacity $bootDone={bootDone}>
        <Scene />
        <Desktop />
        <ModalManager />
        <SnackbarManager />
      </StartOpacity>
    </ThemeProvider>
  );
}

export default App;
