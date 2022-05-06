import React from "react";
import {useGLTF} from "@react-three/drei";
import {useBox} from "@react-three/cannon";
import { useCustomGLTF } from "../../helpers/utilities";

const Chair = (props) => {
    const {nodes, materials, boundingBox, meshPosition} = useCustomGLTF("/models/Chair.glb");
    const [box, api] = useBox(() => ({
        args: [boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z],
        position: [0, 0, 0],
    }));
    return (
        <group ref={box} {...props}>
            <mesh position={meshPosition} geometry={nodes.Chair.geometry} material={materials.Chair}/>
        </group>
    );
}

export default Chair;

useGLTF.preload("/Chair.glb");