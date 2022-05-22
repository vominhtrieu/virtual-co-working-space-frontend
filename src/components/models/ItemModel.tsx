import {useGLTF} from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils"

interface ItemModelProps {
    url: string,
    itemId: number
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

    useEffect(() => {
        console.log("load model of id = ", itemId);
    }, [itemId])

    const clone = useMemo(() => SkeletonUtils.clone(obj.scene), [obj.scene])

    return <primitive object={clone}/>
}