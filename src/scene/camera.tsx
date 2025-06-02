import { useFrame, useThree } from "@react-three/fiber";
import { useOrbitalControl } from "./useOrbitalControl";
import { useCameraContext } from "../context/camera";
import { useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";

function Camera() {
  const { camera } = useThree();
  const { started } = useCameraContext();

  const [animationFinished, setAnimationFinished] = useState(false);
  const progress = useRef(0);

  const radius = 4;
  const start = new Vector3(-5, 3, 5);
  const end = new Vector3(radius * Math.sin(-1), 2, radius * Math.cos(-1));
  const initialAngle = Math.atan2(end.x, end.z);

  useFrame((_, delta) => {
    if (!started || animationFinished) return;

    progress.current += delta * 0.5;
    const t = MathUtils.clamp(progress.current, 0, 1);
    const eased = MathUtils.smoothstep(t, 0, 1);

    const position = start.clone().lerp(end, eased);

    camera.position.copy(position);
    camera.lookAt(0, 0, 0);

    if (t >= 1) {
      setAnimationFinished(true);
    }
  });

  useOrbitalControl(camera, {
    initialAngle,
    enabled: animationFinished,
  });

  return null;
}

export default Camera;
