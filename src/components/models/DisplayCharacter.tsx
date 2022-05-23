/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import {useEffect, useRef} from 'react'
import {useGLTF, useAnimations} from '@react-three/drei'
import {GLTFActions, GLTFResult, useCustomGLTF} from "../../helpers/utilities";
import {AppearanceGroups} from "../../helpers/constants";
import {CharacterAppearance} from "../../types/character";

type CharacterProps = JSX.IntrinsicElements['group'] & {
    startPosition: number[],
    appearance: CharacterAppearance,
}

const url = "https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/Character/Character.gltf";

export default function DisplayCharacter({startPosition, appearance}: CharacterProps) {
    const group = useRef<THREE.Group>()
    const {nodes, materials, animations} = useCustomGLTF(url) as GLTFResult
    const {actions} = useAnimations<GLTFActions>(animations, group);
    useEffect(() => {
        actions.Idle?.play();
    }, [actions.Idle]);

    let hair: any = null;
    switch (appearance.hairStyle) {
        case 0:
            hair = (<skinnedMesh
                geometry={nodes.Hair_1.geometry}
                material={materials["Hair_1"]}
                skeleton={nodes.Hair_1.skeleton}
            />);
            break;
        case 1:
            hair = (<skinnedMesh
                geometry={nodes.Hair_2.geometry}
                material={materials["Hair_2"]}
                skeleton={nodes.Hair_2.skeleton}
            />);
            break;
        case 2:
            hair = (<skinnedMesh
                geometry={nodes.Hair_3.geometry}
                material={materials["Hair_3"]}
                skeleton={nodes.Hair_3.skeleton}
            />);
            break;
    }

    if (hair && hair.props.material) {
        hair.props.material.color.setStyle(AppearanceGroups[2].items[appearance.hairColor].hex);
    }

    materials.Skin.color.setStyle(AppearanceGroups[0].items[appearance.skinColor].hex);
    materials.Head.color.setStyle(AppearanceGroups[0].items[appearance.skinColor].hex);
    materials.Eye.color.setStyle(AppearanceGroups[0].items[appearance.skinColor].hex);
    materials.Body.color.setStyle(AppearanceGroups[4].items[appearance.shirtColor].hex);
    materials.Pant.color.setStyle(AppearanceGroups[5].items[appearance.pantColor].hex);
    materials.Shoes.color.setStyle(AppearanceGroups[6].items[appearance.shoeColor].hex);

    return (
        <>
            <mesh>
                <group ref={group} position={startPosition} dispose={null}>
                    <primitive object={nodes.mixamorigHips}/>
                    <primitive object={nodes.Ctrl_ArmPole_IK_Left}/>
                    <primitive object={nodes.Ctrl_Hand_IK_Left}/>
                    <primitive object={nodes.Ctrl_ArmPole_IK_Right}/>
                    <primitive object={nodes.Ctrl_Hand_IK_Right}/>
                    <primitive object={nodes.Ctrl_Foot_IK_Left}/>
                    <primitive object={nodes.Ctrl_LegPole_IK_Left}/>
                    <primitive object={nodes.Ctrl_Foot_IK_Right}/>
                    <primitive object={nodes.Ctrl_LegPole_IK_Right}/>
                    <primitive object={nodes.Ctrl_Master}/>
                    <skinnedMesh geometry={nodes.Character_1.geometry} material={materials.Body}
                                 skeleton={nodes.Character_1.skeleton}/>
                    <skinnedMesh geometry={nodes.Character_2.geometry} material={materials.Skin}
                                 skeleton={nodes.Character_2.skeleton}/>
                    <skinnedMesh geometry={nodes.Character_3.geometry} material={materials.Head}
                                 skeleton={nodes.Character_3.skeleton}/>
                    <skinnedMesh geometry={nodes.Character_4.geometry} material={materials.Eye}
                                 skeleton={nodes.Character_4.skeleton}/>
                    <skinnedMesh geometry={nodes.Character_5.geometry} material={materials.Pant}
                                 skeleton={nodes.Character_5.skeleton}/>
                    <skinnedMesh geometry={nodes.Shoe.geometry} material={materials.Shoes}
                                 skeleton={nodes.Shoe.skeleton}/>
                    {hair}
                </group>
            </mesh>
        </>
    )
}

useGLTF.preload('/Character.glb')
