/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Character(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Models/Character.glb");
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.mixamorigHips} />
      <primitive object={nodes.Ctrl_ArmPole_IK_Left} />
      <primitive object={nodes.Ctrl_Hand_IK_Left} />
      <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
      <primitive object={nodes.Ctrl_Hand_IK_Right} />
      <primitive object={nodes.Ctrl_Foot_IK_Left} />
      <primitive object={nodes.Ctrl_LegPole_IK_Left} />
      <primitive object={nodes.Ctrl_Foot_IK_Right} />
      <primitive object={nodes.Ctrl_LegPole_IK_Right} />
      <primitive object={nodes.Ctrl_Master} />
      <skinnedMesh
        geometry={nodes.Cube001.geometry}
        material={materials.Body}
        skeleton={nodes.Cube001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Cube001_1.geometry}
        material={materials.Head}
        skeleton={nodes.Cube001_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Cube001_2.geometry}
        material={props.eyes === 1 ? materials["Eye 1"] : materials["Eye 2"]}
        skeleton={nodes.Cube001_2.skeleton}
      />
      {props.hair == 1 ? (
        <skinnedMesh
          geometry={nodes.Hair_1.geometry}
          material={materials["Hair 1"]}
          skeleton={nodes.Hair_1.skeleton}
        />
      ) : (
        <skinnedMesh
          geometry={nodes.Hair_2.geometry}
          material={materials["Hair 2"]}
          skeleton={nodes.Hair_2.skeleton}
        />
      )}
      <skinnedMesh
        geometry={nodes.Shoe.geometry}
        material={materials.Shoes}
        skeleton={nodes.Shoe.skeleton}
      />
      <mesh onClick={(e) => console.log("click")} />
    </group>
  );
}

useGLTF.preload("/Character.glb");
