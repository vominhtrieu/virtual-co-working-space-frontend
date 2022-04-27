import React, { useRef, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";

import { TransformControls } from "@react-three/drei";
extend({ TransformControls });

export default function CustomTransformControl({ object, orbit }) {
  const transform = useRef();
  const { camera, gl } = useThree();

  useFrame(() => orbit.current.update());
  useEffect(() => {
      if (transform.current) {
          const controls = transform.current;
          const callback = (event) => (orbit.current.enabled = !event.value);
          controls.addEventListener("dragging-changed", callback);
          return () => controls.removeEventListener("dragging-changed", callback);
      }
  });

  return (
    <transformControls ref={transform} args={[camera, gl.domElement]} onUpdate={(self) => self.attach(object)} />
  );
}
