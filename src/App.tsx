import { ThemeProvider } from "styled-components";
import { CRTOverlay, GlobalStyle } from "./GlobalStyle";
import Desktop from "./components/desktop";
import ModalManager from "./components/modals";
import { useEffect, useState } from "react";
import { useAppSelector } from "./store/hooks";
import Scene from "./scene";
import "./index.css";

const MIN_WIDTH = 1024;
const MIN_HEIGHT = 600;

function App() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const activeTheme = useAppSelector((state) => state.themes);

  useEffect(() => {
    const checkSize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      setIsSupported(w >= MIN_WIDTH && h >= MIN_HEIGHT);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (!isSupported) {
    // TODO
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>The screen is too small</h1>
        <span>Desktop only</span>
      </div>
    );
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <CRTOverlay />
      <GlobalStyle />
      <Scene />
      <Desktop />
      <ModalManager />
    </ThemeProvider>
  );
}

export default App;
