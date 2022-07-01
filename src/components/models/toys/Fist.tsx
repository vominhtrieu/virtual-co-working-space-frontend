import { useGLTF } from "@react-three/drei";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils"
import * as THREE from "three"
import { useMemo, useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { normalize } from "path";

const url = "https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/BoxingFist/BoxingGlove.glb"

const Fist = ({spawnPosition, spawnRotation, visible}) => {
    const obj = useGLTF(url);
    const clone = useMemo(() => SkeletonUtils.clone(obj.scene), [obj.scene])
    const [ref, api] = useBox(() => ({
        mass: 0.1,
        position: spawnPosition,
        args: [0.5, 1, 0.5],
    }));

    const rotation = useRef(new THREE.Euler());
    const punchDirection = useRef([0, 0, 0]);
    const frameCount = useRef(0);

    useEffect(() => {
        ref.current.name = "Fist";
        api.isTrigger.set(true);

        const unsubRotation = api.rotation.subscribe((v) => {
            rotation.current = v;
        })

        return unsubRotation;
    }, [])

    useEffect(() => {
        api.isTrigger.set(!visible);
    }, [visible])

    useEffect(() => {
        ref.current.visible = visible;
        api.position.set(spawnPosition[0], spawnPosition[1] - 1.5, spawnPosition[2]);
        api.rotation.set(spawnRotation[0], spawnRotation[1], spawnRotation[2]);
    }, [visible]);

    useEffect(() => {
        const direction = new THREE.Vector3(0, 0, 1);
        direction.applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler().fromArray(spawnRotation)))
        direction.normalize();

        punchDirection.current = direction;
    }, [spawnRotation])

    useFrame((state, delta) => {
        if (ref.current.visible) {
            const direction = new THREE.Vector3(0, 0, 1);
            direction.applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler().fromArray(rotation.current)))
            direction.normalize();
    
            const moveX = calculateVelocity(frameCount.current, direction.x);
            const moveZ = calculateVelocity(frameCount.current, direction.z);
            api.velocity.set(moveX, 0, moveZ);
            frameCount.current++;
        } else {
            frameCount.current = 0;
            api.velocity.set(0, 0, 0);
        }
    })

    return (
        <>
            <mesh ref={ref} punchDirection={punchDirection.current}>
                <primitive object={clone} />
            </mesh>
        </>
    )
}

const calculateVelocity = (frameCount, value) => {
    return value * (frameCount) * 2; 
}

export default Fist;