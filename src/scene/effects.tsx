import {
  Bloom,
  // BrightnessContrast,
  ChromaticAberration,
  Noise,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";
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
      {/* <BrightnessContrast
        brightness={Math.sin(performance.now() * 0.001) * 0.05}
        contrast={0.1}
      /> */}
      <Bloom
        intensity={0.2}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.5} />
    </>
  );
}

export default CRTPostEffects;
