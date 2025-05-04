import { JSX, useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGlobalPointer } from "../../utils/global-pointer";

export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  const { size } = useThree();
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { nodes, materials } = useGLTF("models/retro_computer.glb") as any;

  const radius = 5;
  const smoothing = 0.05;

  const targetRotation = useRef({ azimuth: 0, polar: 0 });
  const currentRotation = useRef({ azimuth: 0, polar: 0 });

  useGlobalPointer((pos) => {
    const ndcX = (pos.x / size.width) * 2 - 1;
    const ndcY = -(pos.y / size.height) * 2 + 1;
    setMouse({ x: ndcX, y: ndcY });
  });

  useEffect(() => {
    if (pivot.current) {
      pivot.current.add(camera);
      camera.position.set(2, 2, -radius);
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);

  useFrame(() => {
    const azimuth = mouse.x * (Math.PI / 8);

    targetRotation.current.azimuth = azimuth;

    currentRotation.current.azimuth = THREE.MathUtils.lerp(
      currentRotation.current.azimuth,
      targetRotation.current.azimuth,
      smoothing
    );

    if (pivot.current) {
      pivot.current.rotation.y = currentRotation.current.azimuth;
    }
  });

  return (
    <>
      <group ref={pivot} />

      <group ref={group}>
        <group {...props} dispose={null}>
          <mesh
            castShadow
            geometry={nodes.Object_5.geometry}
            material={materials.material_0}
            position={[0.063, 0, 0.438]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_7.geometry}
            material={materials.material_0}
            position={[0.063, 0.375, 0.438]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_9.geometry}
            material={materials.material_0}
            position={[0.063, 0.5, 0.438]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_11.geometry}
            material={materials.material_0}
            position={[0.063, 0.563, 0.313]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_13.geometry}
            material={materials.material_0}
            position={[0.063, 1.5, 0.313]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_15.geometry}
            material={materials.material_0}
            position={[0.063, 1.313, 0.313]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_17.geometry}
            material={materials.material_0}
            position={[-1.031, 1.313, 0.313]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_19.geometry}
            material={materials.material_0}
            position={[-0.094, 1.313, 0.313]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_21.geometry}
            material={materials.material_0}
            position={[-0.094, 1.313, 0.5]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_23.geometry}
            material={materials.material_0}
            position={[-0.094, 1.188, 0.5]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_25.geometry}
            material={materials.material_0}
            position={[0.188, 0, -0.75]}
          />
          <mesh
            castShadow
            geometry={nodes.Object_27.geometry}
            material={materials.material_0}
            position={[-0.75, 0, -0.625]}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/retro_computer.glb");
