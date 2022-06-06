/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import {useEffect, useRef, useState, useMemo} from "react";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import {useGLTF, useAnimations} from "@react-three/drei";
import {useCylinder} from "@react-three/cannon";
import {useThree, useFrame, useGraph} from "@react-three/fiber";
import {
    GLTFActions,
    GLTFResult,
    useCustomGLTF,
} from "../../../helpers/utilities";
import {matchPath} from "react-router-dom";
import {ANIMATION_LIST, EMOJI_LIST} from "../../../helpers/constants";
import {socketSelector} from "../../../stores/socket-slice";
import {useAppSelector} from "../../../stores";

const stepFoot = require("../../../assets/audios/foot-step.mp3");

type MemberCharacterProps = JSX.IntrinsicElements["group"] & {
    hair: number;
    eyes: number;
    movable: boolean;
    startPosition: number[];
    startRotation: number[];
    orbitRef?: any;
    volume: number;
    memberId: number;
    visible: boolean
};

let audio = new Audio(stepFoot);
const MovingSpeed: number = 6;
const url =
    'https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/Character/Character.glb'

export default function MemberCharacter(props: MemberCharacterProps) {
    audio.volume = props.volume / 100;
    const socket = useAppSelector(socketSelector.getSocket);

    const {scene, animations, materials} = useCustomGLTF(url) as GLTFResult
    // const { scene, animations, materials } = useCustomGLTF(
    //   "/models/Character.glb"
    // ) as GLTFResult;
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
    const {nodes} = useGraph(clone);

    const group = useRef<THREE.Group>();
    const [ref, api] = useCylinder(() => ({
        args: [1, 1, 4, 8],
        type: "Dynamic",
        fixedRotation: true,
        mass: 1,
    }));

    const rotateQuaternion = useRef(new THREE.Quaternion());
    const walkDirection = useRef(new THREE.Vector3());
    const currentClip = useRef<THREE.AnimationClip>(null);

    const {actions, mixer} = useAnimations<GLTFActions>(animations, group);

    const [gesturePlaying, setGesturePlaying] = useState<boolean>(false);
    const [emojiPlaying, setEmojiPlaying] = useState<boolean>(false);
    const [currentEmoji, setCurrentEmoji] = useState({idx: -1});
    const [currentGesture, setCurrentGesture] = useState({idx: -1});

    const position = useRef([0, 0, 0]);
    const updatedPosition = useRef(props.startPosition);
    const rotation = useRef([0, 0, 0]);
    const updatedRotation = useRef<THREE.Euler>(new THREE.Euler());

    const loader = new THREE.TextureLoader();

    const match = matchPath({path: "/office/:id"}, window.location.pathname);

    const timeoutId = useRef<NodeJS.Timeout>();

    const getGesture = (gestureIdx: number) => {
        if (gestureIdx > 1) {
            return ANIMATION_LIST[gestureIdx];
        } else {
            return ANIMATION_LIST[0];
        }
    };

    const getEmoji = (emojiIndex: number) => {
        if (emojiIndex >= 0) {
            return loader.load(
                require(`../../../assets/images/emojis/${
                    EMOJI_LIST[emojiIndex]
                }.png`)
            );
        } else {
            return loader.load();
        }
    };

    useEffect(() => {
        if (currentGesture.idx > 1)
            setGesturePlaying(true);
    }, [currentGesture]);

    useEffect(() => {
        if (currentEmoji.idx >= 0)
            setEmojiPlaying(true);
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            setEmojiPlaying(false);
        }, 2000);
    }, [currentEmoji]);

    useThree(() => {
        api.position.subscribe((v) => {
            position.current = v;
        });
        api.rotation.subscribe((v) => {
            rotation.current = v;
        });
    });

    useEffect(() => {

    }, [emojiPlaying]);

    const shouldUpdate = () => {
        return (
            Math.sqrt(
                Math.pow(position.current[0] - updatedPosition.current[0], 2) +
                Math.pow(position.current[2] - updatedPosition.current[2], 2)
            ) > 0.05
        );
    };

    useFrame((state, delta) => {
        if (!props.movable) {
            return;
        }

        let clip: THREE.AnimationClip = null;

        //update from remote position
        if (shouldUpdate()) {
            if (gesturePlaying) {
                setGesturePlaying(false);
            }
            clip = actions.Walking;

            const newDirection = new THREE.Vector3(
                updatedPosition.current[0] - position.current[0],
                0,
                updatedPosition.current[2] - position.current[2]
            );

            rotateQuaternion.current.setFromEuler(updatedRotation.current);

            ref.current.quaternion.rotateTowards(
                rotateQuaternion.current,
                delta * 10
            );

            walkDirection.current = newDirection;
            walkDirection.current.y = 0;
            walkDirection.current.normalize();
            const moveX = walkDirection.current.x * MovingSpeed;
            const moveZ = walkDirection.current.z * MovingSpeed;

            api.velocity.set(moveX, 0, moveZ);
            api.quaternion.copy(ref.current.quaternion);
        } else {
            if (gesturePlaying) {
                clip = actions[getGesture(currentGesture.idx)];
            } else {
                clip = actions.Idle;
            }
            api.velocity.set(0, 0, 0);
        }

        if (clip && clip !== currentClip.current) {
            if (currentClip.current) {
                currentClip.current.fadeOut(0.2);
            }
            clip.reset().fadeIn(0.2).play();
            currentClip.current = clip;
        }
        currentClip.current = clip;
        mixer.update(delta * 0.2);
    });

    useEffect(() => {
        if (ref.current) {
            ref.current.position.set(
                props.startPosition[0],
                props.startPosition[1],
                props.startPosition[2]
            );
            ref.current.rotation.set(
                props.startRotation[0],
                props.startRotation[1],
                props.startRotation[2]
            );
            api.position.set(
                props.startPosition[0],
                props.startPosition[1],
                props.startPosition[2]
            );
            api.rotation.set(
                props.startRotation[0],
                props.startRotation[1],
                props.startRotation[2]
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match?.params.id]);

    useEffect(() => {
        ref.current.visible = props.visible
    }, [ref, props.visible])

    useSocketEvent(socket, props.memberId, updatedPosition, updatedRotation, setCurrentEmoji, setCurrentGesture);

    return (
        <>
            <mesh ref={ref} {...props}>
                <group ref={group} position={[0, -1, 0]} dispose={null}>
                    <sprite position={[0, 2.6, 0]} visible={emojiPlaying}>
                        <spriteMaterial map={getEmoji(currentEmoji.idx)}/>
                    </sprite>
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
                    <skinnedMesh
                        geometry={nodes.Character_1.geometry}
                        material={materials.Body}
                        skeleton={nodes.Character_1.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Character_2.geometry}
                        material={materials.Skin}
                        skeleton={nodes.Character_2.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Character_3.geometry}
                        material={materials.Head}
                        skeleton={nodes.Character_3.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Character_4.geometry}
                        material={materials.Eye}
                        skeleton={nodes.Character_4.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Character_5.geometry}
                        material={materials.Pant}
                        skeleton={nodes.Character_5.skeleton}
                    />
                    {/* <skinnedMesh
                        geometry={nodes.Cube001_2.geometry}
                        material={props.eyes === 1 ? materials["Eye 1"] : materials["Eye 2"]}
                        skeleton={nodes.Cube001_2.skeleton}
                    /> */}
                    {props.hair === 1 ? (
                        <skinnedMesh
                            geometry={nodes.Hair_1.geometry}
                            material={materials["Hair_1"]}
                            skeleton={nodes.Hair_1.skeleton}
                        />
                    ) : (
                        <skinnedMesh
                            geometry={nodes.Hair_2.geometry}
                            material={materials["Hair_2"]}
                            skeleton={nodes.Hair_2.skeleton}
                        />
                    )}
                    <skinnedMesh
                        geometry={nodes.Shoe.geometry}
                        material={materials.Shoes}
                        skeleton={nodes.Shoe.skeleton}
                    />
                </group>
            </mesh>
        </>
    );
}

const useSocketEvent = (socket, memberId, updatedPosition, updatedRotation, setEmoji, setGesture) => {
    useEffect(() => {
        socket.on("office_member:moved", (message) => {
            if (message.memberId === memberId) {
                updatedPosition.current = [message.xPosition, message.yPosition, message.zPosition];
                updatedRotation.current = new THREE.Euler(message.xRotation, message.yRotation, message.zRotation);
            }
        })

        socket.on("office_member:error", (message) => {
            console.log(message);
        })

        socket.on("emoji", (message) => {
            if (memberId === message.userId) {
                setEmoji({idx: message.emojiId})
            }
        })

        socket.on("gesture", (message) => {
            if (memberId === message.userId) {
                setGesture({idx: message.gestureId})
            }
        })
        return () => {
            socket.removeListener("office_member:moved")
            socket.removeListener("office_member:error")
            socket.removeListener("emoji")
            socket.removeListener("gesture")
        }
        /* eslint-disable */
    }, [socket])
}

useGLTF.preload("/Character.glb");
