import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"

const url = "https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/ToyHammer/ToyHammer.glb"

const Hammer = ({spawnPosition, spawnRotation, userMoveSpeed}) => {
    const obj = useGLTF(url);
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: spawnPosition,
        args: [1, 2, 1]
    }));
    const position = useRef([0, 0, 0]);

    useEffect(() => {
        const unsubPosition = api.position.subscribe((v) => {
            position.current = v;
        })

        return unsubPosition;
    }, [api.position])

    useFrame(() => {
        api.rotation.set(spawnRotation[0], spawnRotation[1] + Math.PI / 2, spawnRotation[2])
    });

    return (
        <>
            <mesh ref={ref}>
                <primitive object={obj.scene} />
            </mesh>
        </>
    )
}

export default Hammer;