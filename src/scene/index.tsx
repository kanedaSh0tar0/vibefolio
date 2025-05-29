import { Canvas } from "@react-three/fiber";
import Computer from "../models/computer";
import Camera from "./camera";
import {
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";
import Light from "./light";
import { Suspense } from "react";
import { BlendFunction } from "postprocessing";

function CRTPostEffects() {
  return (
    <>
      <Noise opacity={0.03} />
      <Pixelation granularity={2} />
      <ChromaticAberration
        offset={[0.0015, 0.0012]}
        blendFunction={BlendFunction.ADD}
      />
      <BrightnessContrast
        brightness={Math.sin(performance.now() * 0.001) * 0.05}
        contrast={0.1}
      />
      <Bloom
        intensity={0.2}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.5} />
    </>
  );
}

function Scene() {
  return (
    <Canvas shadows>
      <EffectComposer enabled>
        <CRTPostEffects />

        <Camera />
        <Light position={[1, 2, 1]} />
        <Suspense fallback={null}>
          <Computer rotation={[0, 3, 0]} position={[-0.5, 0, 1.5]} />
        </Suspense>

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial attach="material" opacity={0.3} />
        </mesh>
      </EffectComposer>
    </Canvas>
  );
}

export default Scene;
