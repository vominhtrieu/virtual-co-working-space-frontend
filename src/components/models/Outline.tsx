
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import * as THREE from "three";
extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass })

export default function Outline({ children }) {
    const { gl, scene, camera, size } = useThree()
    const composer = useRef<any>()
    const [hovered, set] = useState([])
    const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
    useEffect(() => composer.current && composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current && composer.current.render(), 1);
    console.log(scene);
    const outlinedObjects = scene.children.filter((child) => child.isMesh);
    // @ts-ignored
    const outlinePass = <outlinePass
        attachArray="passes"
        args={[aspect, scene, camera]}
        selectedObjects={scene.children}
        visibleEdgeColor="BLACK"
        edgeStrength={50}
        edgeThickness={0.2}
    />;
    return (
        <>
            {children}
            <effectComposer ref={composer} args={[gl]} >
                <renderPass attachArray="passes" args={[scene, camera]} />
                {outlinePass}
                <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
            </effectComposer>
        </>
    );
}