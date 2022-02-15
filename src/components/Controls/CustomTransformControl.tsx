import React, { useRef, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";

import { TransformControls } from "@react-three/drei";
import { AnyARecord } from "dns";
extend({ TransformControls });

export default function CustomTransformControl({ object, orbit }: any) {
  const transform = useRef(null);
  const { camera, gl } = useThree();

  useFrame(() => orbit.current.update());
  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      const callback = (event: AnyARecord) => (orbit.current.enabled = !event);
      // controls.addEventListener("dragging-changed", callback);
      // return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  return (
    <TransformControls
      ref={transform}
      args={[camera, gl.domElement]}
      onUpdate={(self) => {
        let temp = object;
        while (temp.parent && temp.parent.type !== "Scene") {
          temp = temp.parent;
        }

        self.attach(temp);
      }}
      type={undefined}
      isGroup={undefined}
      id={undefined}
      uuid={undefined}
      name={undefined}
      parent={undefined}
      modelViewMatrix={undefined}
      normalMatrix={undefined}
      matrixWorld={undefined}
      matrixAutoUpdate={undefined}
      matrixWorldNeedsUpdate={undefined}
      castShadow={undefined}
      receiveShadow={undefined}
      frustumCulled={undefined}
      renderOrder={undefined}
      animations={undefined}
      userData={undefined}
      customDepthMaterial={undefined}
      customDistanceMaterial={undefined}
      isObject3D={undefined}
      onBeforeRender={undefined}
      onAfterRender={undefined}
      applyMatrix4={undefined}
      applyQuaternion={undefined}
      setRotationFromAxisAngle={undefined}
      setRotationFromEuler={undefined}
      setRotationFromMatrix={undefined}
      setRotationFromQuaternion={undefined}
      rotateOnAxis={undefined}
      rotateOnWorldAxis={undefined}
      rotateX={undefined}
      rotateY={undefined}
      rotateZ={undefined}
      translateOnAxis={undefined}
      translateX={undefined}
      translateY={undefined}
      translateZ={undefined}
      localToWorld={undefined}
      worldToLocal={undefined}
      lookAt={undefined}
      add={undefined}
      remove={undefined}
      clear={undefined}
      getObjectById={undefined}
      getObjectByName={undefined}
      getObjectByProperty={undefined}
      getWorldPosition={undefined}
      getWorldQuaternion={undefined}
      getWorldScale={undefined}
      getWorldDirection={undefined}
      raycast={undefined}
      traverse={undefined}
      traverseVisible={undefined}
      traverseAncestors={undefined}
      updateMatrix={undefined}
      updateWorldMatrix={undefined}
      toJSON={undefined}
      clone={undefined}
      copy={undefined}
      addEventListener={undefined}
      hasEventListener={undefined}
      removeEventListener={undefined}
      dispatchEvent={undefined}
    />
  );
}
