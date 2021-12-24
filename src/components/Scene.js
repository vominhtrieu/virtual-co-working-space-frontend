import { Suspense } from "react/cjs/react.production.min";
import { OrbitControls } from "@react-three/drei";
import Office from "./Models/Office";
import Box from "./Models/Box";
import Chair from "./Models/Chair";
import Character from "./Models/Character";

export default function Scene() {

  return (
    <>
      <OrbitControls />
      <ambientLight />
      <Suspense fallback={<Box />}>
        <Office />
        <Character castShadow={true} position={[0, 1, 0]} />
      </Suspense>
    </>
  );
}
