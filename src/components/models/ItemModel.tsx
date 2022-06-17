import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils"
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

interface ItemModelProps {
    url: string,
    itemId: number,
    rotation: any,
}

function vectorToArray(v) {
    return [v.x, v.y, v.z];
}

export default function ItemModel({ url, itemId, rotation }: ItemModelProps) {
    const obj: any = useGLTF(url);

    const colors = new Uint8Array(2);

    for (let c = 0; c <= colors.length; c++) {
        colors[c] = (c / colors.length) * 256;
    }

    const gradientMap = new THREE.DataTexture(colors, colors.length, 1, THREE.RedFormat);
    gradientMap.needsUpdate = true;

    if (obj.materials) {
        for (let key in obj.materials) {
            const currentMaterial = obj.materials[key];

            const material = new THREE.MeshToonMaterial({
                color: currentMaterial.color,
                gradientMap: gradientMap,
                map: currentMaterial.map,
            });

            obj.materials[key] = material;
        }
    }

    const clone = useMemo(() => SkeletonUtils.clone(obj.scene), [obj.scene])
    const boundingBox = useMemo(() => {
        let boundingBox = {
            min: { x: Infinity, y: Infinity, z: Infinity },
            max: { x: -Infinity, y: -Infinity, z: -Infinity },
        }

        const calculateBoundingBox = (node: any, position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }) => {
            for (let n of node.children) {
                calculateBoundingBox(n, {
                    x: node.position.x + position.x,
                    y: node.position.y + position.y,
                    z: node.position.z + position.z,
                }, {
                    x: node.scale.x * scale.x,
                    y: node.scale.y * scale.y,
                    z: node.scale.z * scale.z,
                });
            }
            if (node.geometry) {
                const nodeBoundingBox = new THREE.Box3();
                nodeBoundingBox.copy(node.geometry.boundingBox);
                node.updateMatrixWorld(true);
                nodeBoundingBox.applyMatrix4(node.matrixWorld);

                boundingBox.min.x = Math.min(boundingBox.min.x, (nodeBoundingBox.min.x + node.position.x + position.x) * (scale.x * node.scale.x));
                boundingBox.min.y = Math.min(boundingBox.min.y, (nodeBoundingBox.min.y + node.position.y + position.y) * (scale.y * node.scale.y));
                boundingBox.min.z = Math.min(boundingBox.min.z, (nodeBoundingBox.min.z + node.position.z + position.z) * (scale.z * node.scale.z));
                boundingBox.max.x = Math.max(boundingBox.max.x, (nodeBoundingBox.max.x + node.position.x + position.x) * (scale.x * node.scale.x));
                boundingBox.max.y = Math.max(boundingBox.max.y, (nodeBoundingBox.max.y + node.position.y + position.y) * (scale.y * node.scale.y));
                boundingBox.max.z = Math.max(boundingBox.max.z, (nodeBoundingBox.max.z + node.position.z + position.z) * (scale.z * node.scale.z));
            }
        }

        calculateBoundingBox(obj.scene, undefined, obj.scene.scale);

        const diff = 0 - boundingBox.min.y;
        boundingBox.min.y += diff + 1;
        boundingBox.max.y += diff + 1;

        return boundingBox;
    }, [obj]);

    const [ref, api]: any = useBox(() => ({
        mass: 0,
        position: (ref.current && vectorToArray(ref.current.parent.position)) || [0, 0, 0],
        rotation: rotation,
        args: (boundingBox && [boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z]) || [0, 0, 0],
    }))

    useFrame(() => {
        if (ref.current && ref.current.parent) {
            const vectorArr = vectorToArray(ref.current.parent.position);
            api.position.set(vectorArr[0], vectorArr[1] + (boundingBox.max.y - boundingBox.min.y) / 2, vectorArr[2]);
        }
    })

    return <>
        <primitive object={clone} />
        <mesh ref={ref} />
    </>
}