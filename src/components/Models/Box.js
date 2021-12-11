import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function LoadingBox(props) {
    const ref = useRef();
    useFrame((_, delta) => {
        ref.current.rotation.y += 5 * delta;
    });

    return (
        <mesh {...props} castShadow={true} ref={ref}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
        </mesh>
    );
}
