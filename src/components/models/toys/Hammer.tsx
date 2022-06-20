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
    const speed = useRef(1);
    const direction = useRef<THREE.Vector3>([0, 1, 0]);

    useEffect(() => {
        ref.current.name = "Hammer";
        api.isTrigger.set(true);
    }, [])

    useEffect(() => {
        ref.current.visible = visible;
        api.position.set(spawnPosition[0], spawnPosition[1], spawnPosition[2]);
        api.rotation.set(0, spawnRotation[1], 0);
    }, [visible]);

    useEffect(() => {
        const d = new THREE.Vector3(0, 0, 1);
        d.applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler().fromArray(spawnRotation)))
        d.normalize();

        direction.current = d.cross(new THREE.Vector3(0, 1, 0)).normalize();
    }, [spawnRotation])

    const myRotation = useRef(spawnRotation);
    myRotation.current = spawnRotation;

    useFrame((state, delta) => {
        if (ref.current.visible) {
            let angle = Math.PI/2

            // const target = new THREE.Euler(0 + angle, myRotation.current[1], 0);
            // const quaternion = new THREE.Quaternion().setFromEuler(target);
            const quaternion = new THREE.Quaternion().setFromAxisAngle(direction.current, -angle);
            ref.current.quaternion.rotateTowards(
                quaternion,
                delta * 10 * speed.current,
            )
            api.quaternion.copy(ref.current.quaternion);
            speed.current *= 1.01;
        } else {
            speed.current = 1;
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