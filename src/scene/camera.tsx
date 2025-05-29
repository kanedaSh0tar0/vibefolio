import { useThree } from "@react-three/fiber";
import { useOrbitalControl } from "./useOrbitalControl";

function Camera() {
  const { camera } = useThree();

  useOrbitalControl(camera, {
    startY: 2,
  });

  return null;
}

export default Camera;
