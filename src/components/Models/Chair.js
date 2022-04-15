import React from "react";
import {useGLTF} from "@react-three/drei";
import {useBox} from "@react-three/cannon";
import {useCustomGLTF} from "../../helpers/utilities";

const Chair = (props) => {
    const {nodes, materials} = useCustomGLTF("/models/Chair.glb");
    const [box, api] = useBox(() => ({
        args: [2, 4, 2],
    }));
    return (
        <mesh ref={box} {...props} geometry={nodes.Chair.geometry} material={materials.Chair}/>
    );
}

export default Chair;

useGLTF.preload("/Chair.glb");