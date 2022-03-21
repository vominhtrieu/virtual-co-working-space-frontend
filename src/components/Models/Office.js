import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {useCustomGLTF} from "../../helpers/utilities";

export default function Office(props) {
  const group = useRef();
  const { nodes, materials } = useCustomGLTF("/models/Office.glb");
  return (
      <group ref={group} {...props} dispose={null}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials.Floor} />
        <mesh geometry={nodes.Cube_2.geometry} material={materials.Walll} />
      </group>
  );
}

useGLTF.preload("/Office.glb");