import * as THREE from 'three'
import {useGLTF} from "@react-three/drei";
import {GLTF} from "three-stdlib/loaders/GLTFLoader";
import { ANIMATION_LIST } from './constants';

export const formatDate = (date: Date) => {
}

// type ActionName = 'Idle' | 'Rumba' | 'Walking' | 'Wave'
type ActionName = typeof ANIMATION_LIST[number]

//type GLTFActions = Record<ActionName, THREE.AnimationAction>
export interface GLTFActions extends THREE.AnimationClip {
    name: ActionName
}

export type GLTFResult = GLTF & {
    nodes: any,
    materials: any,
    animations: GLTFActions[],
    boundingBox: THREE.Box3,
    meshPosition: number[],
}

export function useCustomGLTF(path: string): GLTFResult {
    const result = useGLTF(path) as GLTFResult;
    const colors = new Uint8Array(2);

    for (let c = 0; c <= colors.length; c++) {
        colors[c] = (c / colors.length) * 256;
    }

    const gradientMap = new THREE.DataTexture(colors, colors.length, 1, THREE.RedFormat);
    gradientMap.needsUpdate = true;

    if (result.materials) {
        for (let key in result.materials) {
            const currentMaterial = result.materials[key];

            const material = new THREE.MeshToonMaterial({
                color: currentMaterial.color,
                gradientMap: gradientMap,
                map: currentMaterial.map,
            });

            result.materials[key] = material;
        }
    }
    return result;
}

export const groupBy = <T>(
	array: T[],
	keyValueGetter: (element: T) => string
): { [key: string]: T[] } => {
	type GroupedObject = { [key: string]: T[] };

	return array.reduce((acc, curr) => {
		const key = keyValueGetter(curr);

		if (!acc[key]) {
			acc[key] = [];
		}

		acc[key].push(curr);

		return acc;
	}, {} as GroupedObject);
};