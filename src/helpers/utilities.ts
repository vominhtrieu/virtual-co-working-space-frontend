import * as THREE from 'three'
import {useGLTF} from "@react-three/drei";
import {GLTF} from "three-stdlib/loaders/GLTFLoader";

export const formatDate = (date: Date) => {
}

type ActionName = 'Idle' | 'Walking'

//type GLTFActions = Record<ActionName, THREE.AnimationAction>
export interface GLTFActions extends THREE.AnimationClip {
    name: ActionName
}

export type GLTFResult = GLTF & {
    nodes: {
        Cube001: THREE.SkinnedMesh
        Cube001_1: THREE.SkinnedMesh
        Cube001_2: THREE.SkinnedMesh
        Hair_1: THREE.SkinnedMesh
        Hair_2: THREE.SkinnedMesh
        Shoe: THREE.SkinnedMesh
        Plane: THREE.Mesh
        mixamorigHips: THREE.Bone
        Ctrl_ArmPole_IK_Left: THREE.Bone
        Ctrl_Hand_IK_Left: THREE.Bone
        Ctrl_ArmPole_IK_Right: THREE.Bone
        Ctrl_Hand_IK_Right: THREE.Bone
        Ctrl_Foot_IK_Left: THREE.Bone
        Ctrl_LegPole_IK_Left: THREE.Bone
        Ctrl_Foot_IK_Right: THREE.Bone
        Ctrl_LegPole_IK_Right: THREE.Bone
        Ctrl_Master: THREE.Bone
    }
    materials: {
        Body: THREE.MeshStandardMaterial
        Head: THREE.MeshStandardMaterial
        ['Eye 2']: THREE.MeshStandardMaterial
        ['Hair 1']: THREE.MeshStandardMaterial
        ['Hair 2']: THREE.MeshStandardMaterial
        Shoes: THREE.MeshStandardMaterial
        ['Eye 1']: THREE.MeshStandardMaterial
    }
    animations: GLTFActions[],
    boxCollider: number[],
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