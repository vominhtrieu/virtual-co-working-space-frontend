import {useGLTF} from "@react-three/drei";
import {useEffect, useMemo} from "react";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils"
import {useBox} from "@react-three/cannon";
import {useFrame} from "@react-three/fiber";

interface ItemModelProps {
    url: string,
    itemId: number
}

function vectorToArray(v) {
    return [v.x, v.y, v.z];
}

export default function ItemModel({url, itemId}: ItemModelProps) {
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
            min: {x: Infinity, y: Infinity, z: Infinity},
            max: {x: -Infinity, y: -Infinity, z: -Infinity},
        }

        for (let key in obj.nodes) {
            let node = obj.nodes[key];

            if (node.type !== "Mesh") {
                continue;
            }
            boundingBox.min.x = Math.min(boundingBox.min.x, node.geometry.boundingBox.min.x);
            boundingBox.min.y = Math.min(boundingBox.min.y, node.geometry.boundingBox.min.y);
            boundingBox.min.z = Math.min(boundingBox.min.z, node.geometry.boundingBox.min.z);
            boundingBox.max.x = Math.max(boundingBox.max.x, node.geometry.boundingBox.max.x);
            boundingBox.max.y = Math.max(boundingBox.max.y, node.geometry.boundingBox.max.y);
            boundingBox.max.z = Math.max(boundingBox.max.z, node.geometry.boundingBox.max.z);
        }
        const diff = 0 - boundingBox.min.y;
        boundingBox.min.y += diff + 1;
        boundingBox.max.y += diff + 1;

        const divisor = 25; //Just my guess. It may be wrong hihi
        boundingBox.max.x /= divisor;
        boundingBox.min.x /= divisor;
        boundingBox.max.y /= divisor;
        boundingBox.min.y /= divisor;
        boundingBox.max.z /= divisor;
        boundingBox.min.z /= divisor;

        return boundingBox;
    }, [obj]);

    const [ref, api]: any = useBox(() => ({
        mass: 0,
        position: (ref.current && vectorToArray(ref.current.parent.position)) || [0, 0, 0],
        args: (boundingBox && [boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z])||[0,0,0],
    }))

    useFrame(()=>{
        if (ref.current && ref.current.parent) {
            const vectorArr = vectorToArray(ref.current.parent.position);
            api.position.set(vectorArr[0], vectorArr[1], vectorArr[2]);
        }
    })

    return <>
        <primitive object={clone}/>
        <mesh ref={ref} />
    </>
}