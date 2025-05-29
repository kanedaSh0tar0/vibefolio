import { useGLTF } from "@react-three/drei";
import { JSX, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/retro_computer.glb");

function Computer(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF("models/retro_computer.glb") as any;

  return (
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
  );
}

export default Computer;
