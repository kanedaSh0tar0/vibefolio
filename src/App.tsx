import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { Canvas } from "@react-three/fiber";
import { Model as Computer } from "./scenes/first";
import Desktop from "./components/desktop";
import ModalManager from "./components/modals";
import "./index.css";
import { useEffect, useState } from "react";

const MIN_WIDTH = 1024;
const MIN_HEIGHT = 600;

const activeTheme = {
  mainColor: "#BFECFF",
  secondColor: "#CDC1FF",
  thirdColor: "#FFF6E3",
  forthColor: "#FFCCEA",
  textColor: "#4A4A4A",
  whiteColor: "#F8F8FF",
};

function App() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      setIsSupported(w >= MIN_WIDTH && h >= MIN_HEIGHT);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // if (!isSupported) {
  //   // TODO
  //   return (
  //     <div style={{ padding: "2rem", textAlign: "center" }}>
  //       <h1>The screen is too small</h1>
  //       <span>Desktop only</span>
  //     </div>
  //   );
  // }

  return (
    <ThemeProvider theme={activeTheme}>
      <GlobalStyle />

      <Canvas shadows>
        <color attach="background" args={[activeTheme.mainColor]} />

        <Computer />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial
            attach="material"
            opacity={0.3}
            color={activeTheme.mainColor}
          />
        </mesh>

        <directionalLight
          position={[-1, 2, -1.5]}
          intensity={1}
          color={activeTheme.secondColor}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      </Canvas>

      <Desktop />
      <ModalManager />
    </ThemeProvider>
  );
}

export default App;
