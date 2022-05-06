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

// export type GLTFResult = GLTF & {
//     nodes: {
//         Cube001: THREE.SkinnedMesh
//         Cube001_1: THREE.SkinnedMesh
//         Cube001_2: THREE.SkinnedMesh
//         Hair_1: THREE.SkinnedMesh
//         Hair_2: THREE.SkinnedMesh
//         Shoe: THREE.SkinnedMesh
//         Plane: THREE.Mesh
//         mixamorigHips: THREE.Bone
//         Ctrl_ArmPole_IK_Left: THREE.Bone
//         Ctrl_Hand_IK_Left: THREE.Bone
//         Ctrl_ArmPole_IK_Right: THREE.Bone
//         Ctrl_Hand_IK_Right: THREE.Bone
//         Ctrl_Foot_IK_Left: THREE.Bone
//         Ctrl_LegPole_IK_Left: THREE.Bone
//         Ctrl_Foot_IK_Right: THREE.Bone
//         Ctrl_LegPole_IK_Right: THREE.Bone
//         Ctrl_Master: THREE.Bone
//     }
//     materials: {
//         Body: THREE.MeshStandardMaterial
//         Head: THREE.MeshStandardMaterial
//         ['Eye 2']: THREE.MeshStandardMaterial
//         ['Hair 1']: THREE.MeshStandardMaterial
//         ['Hair 2']: THREE.MeshStandardMaterial
//         Shoes: THREE.MeshStandardMaterial
//         ['Eye 1']: THREE.MeshStandardMaterial
//     }
//     animations: GLTFActions[],
//     boxCollider: number[],
// }

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

    let boundingBox = {
        min: {x: Infinity, y:Infinity, z:Infinity},
        max: {x: -Infinity, y:-Infinity, z:-Infinity},
    }

    for (let key in result.nodes) {
        let node = result.nodes[key];

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
    boundingBox.min.y += diff;
    boundingBox.max.y += diff;

    result.boundingBox = boundingBox;

    result.meshPosition = [
        -boundingBox.max.x + boundingBox.min.x,
        (-boundingBox.max.y + boundingBox.min.y) / 2,
        -boundingBox.max.z + boundingBox.min.z
    ];
    return result;
}