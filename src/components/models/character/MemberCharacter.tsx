/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { useGLTF, useAnimations } from "@react-three/drei";
import { CollideBeginEvent, useCylinder } from "@react-three/cannon";
import { useThree, useFrame, useGraph } from "@react-three/fiber";
import {
    GLTFActions,
    GLTFResult,
    useCustomGLTF,
} from "../../../helpers/utilities";
import { matchPath } from "react-router-dom";
import { ANIMATION_LIST, EMOJI_LIST } from "../../../helpers/constants";
import { socketSelector } from "../../../stores/socket-slice";
import { useAppSelector } from "../../../stores";
import { AppearanceGroups } from "../../../helpers/constants";
import { CharacterAppearance } from "../../../types/character";
import { alphaMap } from "./Character";
import Hammer from "../toys/Hammer";

const stepFoot = require("../../../assets/audios/foot-step.mp3");

type MemberCharacterProps = JSX.IntrinsicElements["group"] & {
    appearance: CharacterAppearance
    movable: boolean;
    startPosition: number[];
    startRotation: number[];
    orbitRef?: any;
    volume: number;
    memberId: number;
    visible: boolean;
    stream: any;
};

let audio = new Audio(stepFoot);
const MovingSpeed: number = 6;
const url =
    'https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/Character/Character.glb'

const defaultAppearance: CharacterAppearance = {
    hairColor: 0,
    hairStyle: 0,
    eyeStyle: 0,
    shirtColor: 0,
    pantColor: 0,
    shoeColor: 0,
    skinColor: 0
}

const itemTimer = 500;

export default function MemberCharacter(props: MemberCharacterProps) {
    audio.volume = props.volume / 100;
    const socket = useAppSelector(socketSelector.getSocket);

    const { scene, animations, materials } = useCustomGLTF(url) as GLTFResult
    // const { scene, animations, materials } = useCustomGLTF(
    //   "/models/Character.glb"
    // ) as GLTFResult;
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes } = useGraph(clone);

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

    const { actions, mixer } = useAnimations<GLTFActions>(animations, group);

    const [gesturePlaying, setGesturePlaying] = useState<boolean>(false);
    const [emojiPlaying, setEmojiPlaying] = useState<boolean>(false);
    const [currentEmoji, setCurrentEmoji] = useState({ idx: -1 });
    const [currentGesture, setCurrentGesture] = useState({ idx: -1 });
    const [hairStyle, setHairStyle] = useState("Hair_1");
    const [isUsingHammer, setIsUsingHammer] = useState(false);

    const position = useRef([0, 0, 0]);
    const updatedPosition = useRef(props.startPosition);
    const rotation = useRef<THREE.Euler>(new THREE.Euler());
    const updatedRotation = useRef<THREE.Euler>(new THREE.Euler());

    const loader = new THREE.TextureLoader();

    const match = matchPath({ path: "/office/:id" }, window.location.pathname);

    const timeoutId = useRef<NodeJS.Timeout>();
    const sitting = useRef<boolean>(false);
    const itemPosition = useRef([0, 0, 0])

    const getGesture = (gestureIdx: number) => {
        if (gestureIdx > 1) {
            return ANIMATION_LIST[gestureIdx];
        } else {
            return ANIMATION_LIST[0];
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

    useEffect(() => {
        const unsubPosition = api.position.subscribe((v) => {
            position.current = v;
        });

        return unsubPosition
    }, []);

    useEffect(() => {
        const unsubRotation = api.rotation.subscribe((v) => {
            rotation.current.fromArray(v);
        });

        return unsubRotation;
    }, [])

    useEffect(() => {
        if (isUsingHammer) {
            setTimeout(() => {
                setIsUsingHammer(false);
            }, itemTimer);
        }
    }, [isUsingHammer])

    const calculateItemPosition = () => {
        const direction = new THREE.Vector3(0, 0, 1);
        direction.applyQuaternion(new THREE.Quaternion().setFromEuler(rotation.current))

        let positionX = position.current[0]
        const positionY = position.current[1] + 1.5;
        let positionZ = position.current[2]

        if (Math.abs(direction.x) > 0.0005) {
            positionX += 2 * direction.x
        }

        if (Math.abs(direction.z) > 0.0005) {
            positionZ += 2 * direction.z
        }

        itemPosition.current = [positionX, positionY, positionZ];
    }

    const shouldUpdate = () => {
        return (
            Math.sqrt(
                Math.pow(position.current[0] - updatedPosition.current[0], 2) +
                Math.pow(position.current[2] - updatedPosition.current[2], 2)
            ) > 0.1
        );
    };

    useFrame((state, delta) => {
        if (!props.movable) {
            return;
        }

        let clip: THREE.AnimationClip = null;

        //update from remote position
        if (shouldUpdate()) {
            if (sitting.current) {
                api.position.set(updatedPosition.current[0], updatedPosition.current[1], updatedPosition.current[2])
                api.rotation.set(updatedRotation.current._x, updatedRotation.current._y, updatedRotation.current._z)
            } else {
                if (currentClip.current === actions["Sitting"]) {
                    api.isTrigger.set(false);
                    api.position.set(updatedPosition.current[0], updatedPosition.current[1], updatedPosition.current[2])
                }
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
            }
        } else {
            if (gesturePlaying) {
                clip = actions[getGesture(currentGesture.idx)];
            } else {
                clip = actions.Idle;
            }
            api.velocity.set(0, 0, 0);
        }
        if (sitting.current) {
            clip = actions["Sitting"];
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

    useSocketEvent(socket, props.memberId, updatedPosition, updatedRotation, setCurrentEmoji, setCurrentGesture, api, sitting, setIsUsingHammer, calculateItemPosition);

    useEffect(() => {
        let appearance;
        if (props.appearance) {
            appearance = props.appearance;
        } else {
            appearance = defaultAppearance;
        }

        const hairStyle = `Hair_${appearance.hairStyle + 1}`;
        // const hairMesh = (
        //   <skinnedMesh
        //     geometry={nodes[hairStyle]?.geometry}
        //     material={materials[hairStyle]}
        //     skeleton={nodes[hairStyle].skeleton}
        //   />
        // );
        materials[hairStyle].color.setStyle(AppearanceGroups[2].items[appearance.hairColor].hex);

        // if (hair && hairMesh.props.material) {
        //     hairMesh.props.material.color.setStyle(
        //     AppearanceGroups[2].items[appearance.hairColor].hex
        //   );
        // }

        setHairStyle(hairStyle);

        materials.Skin.color.setStyle(
            AppearanceGroups[0].items[appearance.skinColor].hex
        );
        materials.Head.color.setStyle(
            AppearanceGroups[0].items[appearance.skinColor].hex
        );
        materials.Eye.color.setStyle(
            AppearanceGroups[0].items[appearance.skinColor].hex
        );
        materials.Body.color.setStyle(
            AppearanceGroups[3].items[appearance.shirtColor].hex
        );
        materials.Pant.color.setStyle(
            AppearanceGroups[4].items[appearance.pantColor].hex
        );
        materials.Shoes.color.setStyle(
            AppearanceGroups[5].items[appearance.shoeColor].hex
        );
    }, [props.appearance]);

    const texture = useMemo(() => {
        if (!props.stream) {
            return null;
        }
        const selfVideo = document.createElement("video");
        selfVideo.srcObject = props.stream;
        selfVideo.addEventListener("loadedmetadata", () => {
            selfVideo.play();
        });
        return new THREE.VideoTexture(selfVideo);
    }, [props.stream]);

    const emojiTexture = useMemo(() => {
        if (currentEmoji && currentEmoji.idx >= 0) {
            return loader.load(
                require(`../../../assets/images/emojis/${EMOJI_LIST[currentEmoji.idx]
                    }.png`)
            );
        } else {
            return loader.load();
        }
    }, [currentEmoji, loader])

    const [isVideoOpening, setIsVideoOpening] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (props.stream) {
                const vidTrack = props.stream?.getVideoTracks();
                let enabled = false;
                for (const track of vidTrack) {
                    if (track.enabled) {
                        enabled = true;
                    }
                }
                if (enabled !== isVideoOpening) {
                    setIsVideoOpening(enabled);
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, [props.stream, isVideoOpening]);

    return (
        <>
            <Hammer spawnPosition={[itemPosition.current[0], itemPosition.current[1], itemPosition.current[2]]}
                                spawnRotation={rotation.current.toArray()}
                                visible={isUsingHammer} />
            <mesh ref={ref} {...props}>
                <group ref={group} position={[0, -1, 0]} dispose={null}>
                    <sprite position={[0, 2.6, 0]} visible={emojiPlaying}>
                        <spriteMaterial map={emojiTexture} />
                    </sprite>
                    {texture && isVideoOpening && (<sprite position={[0, 2.6, 0]} scale={[-1, 1, 1]} visible={!emojiPlaying}>
                        <spriteMaterial
                            alphaMap={alphaMap}
                            map={texture}
                        />
                    </sprite>
                    )}
                    <primitive object={nodes.mixamorigHips} />
                    <primitive object={nodes.Ctrl_ArmPole_IK_Left} />
                    <primitive object={nodes.Ctrl_Hand_IK_Left} />
                    <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
                    <primitive object={nodes.Ctrl_Hand_IK_Right} />
                    <primitive object={nodes.Ctrl_Foot_IK_Left} />
                    <primitive object={nodes.Ctrl_LegPole_IK_Left} />
                    <primitive object={nodes.Ctrl_Foot_IK_Right} />
                    <primitive object={nodes.Ctrl_LegPole_IK_Right} />
                    <primitive object={nodes.Ctrl_Master} />
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
                    <skinnedMesh
                        geometry={nodes[hairStyle]?.geometry}
                        material={materials[hairStyle]}
                        skeleton={nodes[hairStyle].skeleton}
                    />
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

const useSocketEvent = (socket, memberId, updatedPosition, updatedRotation, setEmoji, setGesture, api, sitting, setIsUsingHammer, calculateItemPosition) => {
    useEffect(() => {
        socket.on("office_member:moved", (message) => {
            if (message.memberId === memberId) {
                updatedPosition.current = [message.xPosition, message.yPosition, message.zPosition];
                updatedRotation.current = new THREE.Euler(message.xRotation, message.yRotation, message.zRotation);
                if (sitting.current) {
                    sitting.current = false;
                }
            }
        })

        socket.on("office_member:error", (message) => {
            console.log(message);
        })

        socket.on("emoji", (message) => {
            if (memberId === message.userId) {
                setEmoji({ idx: message.emojiId })
            }
        })

        socket.on("gesture", (message) => {
            if (memberId === message.userId) {
                setGesture({ idx: message.gestureId })
            }
        })

        socket.on("action", (message) => {
            if (message.userId === memberId) {
                switch (message.action) {
                    case "sit":
                        api.isTrigger.set(true);
                        sitting.current = true;
                        break;
                    case "bonk":
                        calculateItemPosition();
                        setIsUsingHammer(true);
                        break;
                    default:
                        console.log("Unknow action");
                }
            }
        })

        return () => {
            socket.removeListener("office_member:moved")
            socket.removeListener("office_member:error")
            socket.removeListener("emoji")
            socket.removeListener("gesture")
            socket.removeListener("action")
        }
        /* eslint-disable */
    }, [socket])
}

useGLTF.preload("/Character.glb");
