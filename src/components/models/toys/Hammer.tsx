import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils"
import * as THREE from "three"

const url = "https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/ToyHammer/ToyHammer.glb"

const Hammer = ({spawnPosition, spawnRotation, visible}) => {
    const obj = useGLTF(url);
    const clone = useMemo(() => SkeletonUtils.clone(obj.scene), [obj.scene])
    const [ref, api] = useBox(() => ({
        mass: 0,
        position: spawnPosition,
        args: [1, 2, 1],
    }));
    const isTrigger = useRef(true);

    useEffect(() => {
        ref.current.name = "Hammer";
        api.isTrigger.set(true);
    }, [])

    useEffect(() => {
        ref.current.visible = visible
    }, [visible]);

    useEffect(() => {
        const unsubPosition = api.isTrigger.subscribe((v) => {
            isTrigger.current = v;
        })

        return unsubPosition;
    }, [api.isTrigger])

    useEffect(() => {
        api.position.set(spawnPosition[0], spawnPosition[1], spawnPosition[2])
    }, [spawnPosition])

    useEffect(() => {
        api.rotation.set(spawnRotation[0], spawnRotation[1] + Math.PI / 2, spawnRotation[2])
    }, [spawnRotation])

    useFrame((state, delta) => {
        if (ref.current.visible) {
            const target = new THREE.Euler(spawnRotation[0], spawnRotation[1] + Math.PI / 2, Math.PI / 2);
            const quaternion = new THREE.Quaternion().setFromEuler(target);
            ref.current.quaternion.rotateTowards(
                quaternion,
                delta * 10
            )
            api.quaternion.copy(ref.current.quaternion);
        }
    });

    return (
        <>
            <mesh ref={ref}>
                <primitive object={clone} />
            </mesh>
        </>
    )
}

export default Hammer;