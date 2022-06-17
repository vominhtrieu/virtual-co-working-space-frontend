import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCustomGLTF } from "../../helpers/utilities";
import { useBox, usePlane } from "@react-three/cannon";
import ItemModel from "./ItemModel";
import TV from "./TV";

export default function Office(props) {
    const [ref, api] = useBox(index => ({
        args: [100, 1, 100],
    }));
    const { scene, nodes, materials } = useCustomGLTF("/models/Floor.glb");

    return (
        <>
            <TV scale={[-20,20,20]} rotation={[0,Math.PI,0]} position={[0, 5, 42]} action={props.action} />
            <primitive scale={[10, 1, 10]} object={scene} />
            <mesh position={[0, 0, -45]} scale={[2, 2, 1]}>
                <ItemModel url="/models/Wall.glb" />
            </mesh>
            <mesh position={[0, 0, 45]} scale={[2, 2, 1]}>
                <ItemModel url="/models/Wall.glb" />
            </mesh>
            <mesh position={[45, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[2, 2, 1]}>
                <ItemModel url="/models/Wall.glb" rotation={[0, Math.PI / 2, 0]} />
            </mesh>
            <mesh position={[-45, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 2, 1]}>
                <ItemModel url="/models/Wall.glb" rotation={[0, -Math.PI / 2, 0]} />
            </mesh>
        </>
    );
}

useGLTF.preload("/Office.glb");