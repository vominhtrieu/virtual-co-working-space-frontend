/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

const Chair = React.forwardRef(({ props, ref }) => {
  const { nodes, materials } = useGLTF("/models/Chair.glb");
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Chair.geometry} material={materials.Chair} />
    </group>
  );
});

export default Chair;

useGLTF.preload("/Chair.glb");
