import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Camera, MathUtils } from "three";
import { useGlobalPointer } from "../utils/global-pointer";

export function useOrbitalControl(
  target: Camera | null,
  options?: {
    startX?: number;
    startY?: number;
    startZ?: number;
    radius?: number;
  }
) {
  const { size } = useThree();
  const { startX = 0, startY = 2, startZ = 0, radius = 5 } = options || {};

  const angleRef = useRef(0);
  const targetAngle = useRef(0);

  useGlobalPointer((pos) => {
    const ndcX = (pos.x / size.width) * 1 - 1;
    targetAngle.current = ndcX;
  });

  useFrame((_, delta) => {
    angleRef.current = MathUtils.damp(
      angleRef.current,
      targetAngle.current,
      2,
      delta
    );

    const x = radius * Math.sin(angleRef.current);
    const z = radius * Math.cos(angleRef.current);

    if (target) {
      target.position.set(startX + x, startY, startZ + z);
      target.lookAt(0, 0, 0);
    }
  });
}
