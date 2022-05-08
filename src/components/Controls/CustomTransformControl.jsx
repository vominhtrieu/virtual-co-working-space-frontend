import React, {useRef, useEffect} from "react";
import {useFrame, useThree, extend} from "@react-three/fiber";
import {TransformControls} from "@react-three/drei";

export default function CustomTransformControl({object, orbit, visible}) {
    const transform = useRef();
    const {camera, gl} = useThree();

    useFrame(() => orbit.current.update());
    useEffect(() => {
        if (transform.current) {
            const controls = transform.current;
            const callback = (event) => {
                orbit.current.enabled = !event.value
            };
            controls.addEventListener("dragging-changed", callback);
            return () => {
                controls.removeEventListener("dragging-changed", callback);
            }
        }
    }, [orbit]);

    return (
        <TransformControls ref={transform}
                           showX={visible}
                           showY={visible}
                           showZ={visible}
                           enabled={visible}
                           args={[camera, gl.domElement]}
                           onUpdate={(self) => {
                               if (!transform.current) {
                                   return;
                               }

                               if (object && self.uuid !== object.uuid
                                   && (!transform.current.object || transform.current.object.uuid !== object.uuid)) {
                                   if (transform.current.object) {
                                       transform.current.detach();
                                   }
                                   transform.current.attach(object)
                               } else {
                                   transform.current.detach();
                               }
                           }}/>
    );
}
