import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Camera, MathUtils } from "three";
import { useGlobalPointer } from "../utils/global-pointer";

export function useOrbitalControl(
  target: Camera | null,
  options: {
    initialAngle?: number;
    enabled?: boolean;
  }
) {
  const { size } = useThree();
  const { enabled = true, initialAngle = 0 } = options;
  const radius = 4;
  const angleOffset = Math.PI / 24;
  const angleRef = useRef(initialAngle);
  const targetAngle = useRef(-angleOffset);

  useGlobalPointer((pos) => {
    const ndcX = (pos.x / size.width) * 1 - 1;
    targetAngle.current = ndcX - angleOffset;
  });

  useFrame((_, delta) => {
    if (!enabled) return;

    angleRef.current = MathUtils.damp(
      angleRef.current,
      targetAngle.current,
      1,
      delta
    );

    const x = radius * Math.sin(angleRef.current);
    const z = radius * Math.cos(angleRef.current);

    if (target) {
      target.position.set(x, 2, z);
      target.lookAt(0, 0, 0);
    }
  });
}
