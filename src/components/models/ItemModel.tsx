import {useGLTF} from "@react-three/drei";
import * as THREE from "three";

interface ItemModelProps {
    url: string
}

export default function ItemModel({url}: ItemModelProps) {
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

    return <primitive object={obj.scene}/>
}