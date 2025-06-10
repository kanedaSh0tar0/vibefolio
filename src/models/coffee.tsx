/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, useEffect, useMemo, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

useGLTF.preload("models/coffee.glb");

function Coffee(props: JSX.IntrinsicElements["group"]) {
  const coffeRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("models/coffee.glb") as any;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as any;
  const { actions } = useAnimations(animations, coffeRef);

  useEffect(() => {
    const firstAnimation = Object.keys(actions)[0];
    if (firstAnimation) {
      actions[firstAnimation]?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <group ref={coffeRef} dispose={null} scale={0.1} {...props}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="c444e300743744b392e68be146aac0cdfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Camera"
                  position={[1474.095, 1039.759, -1350.41]}
                  rotation={[-Math.PI, -0.637, 2.68]}
                  scale={100}
                >
                  <group name="Object_5" />
                </group>
                <group
                  name="Empty"
                  position={[53.104, 23.279, -274.162]}
                  scale={115.93}
                />
                <group
                  name="Cylinder"
                  position={[-7.398, 183.359, -318.123]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={158.782}
                >
                  <mesh
                    castShadow
                    name="Cylinder_Material006_0"
                    geometry={nodes.Cylinder_Material006_0.geometry}
                    material={materials["Material.006"]}
                  />
                  <mesh
                    castShadow
                    name="Cylinder_Material006_0_1"
                    geometry={nodes.Cylinder_Material006_0_1.geometry}
                    material={materials["Material.006"]}
                  />
                </group>
                <group
                  name="Area"
                  position={[1236.323, 142.358, -110.352]}
                  rotation={[0, 0, -1.395]}
                  scale={100}
                >
                  <group name="Object_11" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_12" />
                  </group>
                </group>
                <group
                  name="Area001"
                  position={[76.334, 642.177, -275.205]}
                  rotation={[0, 0, -0.082]}
                  scale={100}
                >
                  <group name="Object_14" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_15" />
                  </group>
                </group>
                <group
                  name="Area002"
                  position={[-888.088, 321.865, -341.96]}
                  rotation={[0, 0, 1.672]}
                  scale={100}
                >
                  <group name="Object_17" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_18" />
                  </group>
                </group>
                <group
                  name="Light001"
                  position={[-212.659, 804.176, 610.725]}
                  rotation={[1.89, 0.881, -2.045]}
                  scale={100}
                >
                  <group name="Object_20" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_21" />
                  </group>
                </group>
                <group
                  name="Light002"
                  position={[-212.659, 1006.576, -775.857]}
                  rotation={[1.89, 0.881, -2.045]}
                  scale={100}
                >
                  <group name="Object_23" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_24" />
                  </group>
                </group>
                <group
                  name="Circle"
                  position={[-5.467, 22.872, -275.205]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[142.07, 144.705, 118.36]}
                >
                  <mesh
                    castShadow
                    name="Circle_Material005_0"
                    geometry={nodes.Circle_Material005_0.geometry}
                    material={materials["Material.005"]}
                  />
                </group>
                <group
                  name="Cylinder001"
                  position={[-8.338, 504.339, -316.572]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={150.49}
                />
                <group
                  name="Armature"
                  position={[-5.645, 381.247, -326.131]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_29">
                    <primitive object={nodes._rootJoint} />
                    <group
                      name="Object_31"
                      position={[-8.338, 504.339, -316.572]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={150.49}
                    />
                    <skinnedMesh
                      castShadow
                      name="Object_32"
                      geometry={nodes.Object_32.geometry}
                      material={Object.assign(materials.material_0, {
                        transparent: true,
                        opacity: 0.1,
                      })}
                      skeleton={nodes.Object_32.skeleton}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default Coffee;
