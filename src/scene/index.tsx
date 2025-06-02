import { Canvas } from "@react-three/fiber";
import Computer from "../models/computer";
import Camera from "./camera";
import { EffectComposer } from "@react-three/postprocessing";
import Light from "./light";
import { Suspense } from "react";
import CRTPostEffects from "./effects";

function Scene() {
  return (
    <Canvas shadows>
      <EffectComposer enabled>
        <CRTPostEffects />

        <Camera />
        <Light position={[1, 2, 1]} />
        <Suspense fallback={null}>
          <Computer rotation={[0, 3, 0]} position={[0, 0, 1]} />
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
