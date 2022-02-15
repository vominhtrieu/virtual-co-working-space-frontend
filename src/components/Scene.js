
import { OrbitControls } from "@react-three/drei";
import Office from "./Models/Office";
import Box from "./Models/Box";
import Chair from "./Models/Chair";
import { Suspense } from "react";

export default function Scene() {
  return (
    <>
      <OrbitControls
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      />
      <ambientLight />
      <Suspense fallback={<Box />}>
        <Office />
        <Chair castShadow={true} position={[0, 1, 0]} />
      </Suspense>
    </>
  );
}
