import React, {useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {useCustomGLTF} from "../../helpers/utilities";
import {useBox, usePlane} from "@react-three/cannon";

export default function Office(props) {
    const [ref, api] = useBox(index => ({
        args: [50, 1, 50],
    }));
    const {nodes, materials} = useCustomGLTF("/models/Office.glb");
    return (
        <group ref={ref} {...props} dispose={null}>
                <mesh geometry={nodes.Cube_1.geometry} material={materials.Floor}/>
                <mesh geometry={nodes.Cube_2.geometry} material={materials.Walll}/>
        </group>
    );
}

useGLTF.preload("/Office.glb");