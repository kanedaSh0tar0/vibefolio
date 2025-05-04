import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./GlobalStyle"
import { Canvas } from "@react-three/fiber"
import { Model as Computer } from "./scenes/first"
import Desktop from "./components/desktop"
import ModalManager from "./components/modals"
import './index.css'

function App() {
  const activeTheme = {
    mainColor: '#BFECFF',
    secondColor: '#CDC1FF',
    thirdColor: '#FFF6E3',
    forthColor: '#FFCCEA',
    textColor: '#4A4A4A',
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <GlobalStyle />

      <Canvas shadows>
        <color attach="background" args={[activeTheme.mainColor]} />

        <Computer />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial attach='material' opacity={0.3} color={activeTheme.mainColor} />
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
  )
}

export default App
