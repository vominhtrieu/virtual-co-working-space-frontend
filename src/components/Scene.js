
import { OrbitControls } from "@react-three/drei";
import Office from "./models/Office";
import Box from "./models/Box";
import Chair from "./models/Chair";
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
