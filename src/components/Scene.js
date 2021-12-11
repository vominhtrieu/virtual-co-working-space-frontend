import { Suspense } from "react/cjs/react.production.min";
import { OrbitControls } from "@react-three/drei";
import Office from "./Models/Office";
import Box from "./Models/Box";
import Chair from "./Models/Chair";

export default function Scene() {
    return (
        <>
            <OrbitControls />
            <ambientLight />
            <Suspense fallback={<Box />}>
                <Office />
                <Chair castShadow={true} position={[0, 1, 0]} />
            </Suspense>
        </>
    );
}
