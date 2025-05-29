import { useTheme } from "styled-components";
import React from "react";

function Light(props: React.ComponentPropsWithoutRef<"directionalLight">) {
  const theme = useTheme();

  return (
    <group>
      <directionalLight
        intensity={0.5}
        color={theme.pallet.secondColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        {...props}
      />
    </group>
  );
}

export default Light;
