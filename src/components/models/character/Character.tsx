/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useCylinder } from "@react-three/cannon";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { matchPath } from "react-router-dom";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import {
    ANIMATION_LIST,
    AppearanceGroups,
    EMOJI_LIST,
} from "../../../helpers/constants";
import {
    GLTFActions,
    GLTFResult,
    useCustomGLTF,
} from "../../../helpers/utilities";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { socketSelector } from "../../../stores/socket-slice";
import { CharacterAppearance } from "../../../types/character";
import VideoAlphaMap from "../../../VideoAlphaMap.png";

const loader = new THREE.TextureLoader();
export const alphaMap = loader.load(VideoAlphaMap);

const stepFoot = require("../../../assets/audios/foot-step.mp3");

type CharacterProps = JSX.IntrinsicElements["group"] & {
    appearance: CharacterAppearance;
    movable: boolean;
    startPosition: number[];
    startRotation: number[];
    orbitRef?: any;
    volume: number;
    stream: any;
    currentGesture?: {
        idx: number;
    };
    currentEmoji?: {
        idx: number;
    };
    visible: boolean;
};

type KeyProps = {
    ArrowUp?: boolean;
    ArrowDown?: boolean;
    ArrowLeft?: boolean;
    ArrowRight?: boolean;
    W?: boolean;
    S?: boolean;
    A?: boolean;
    D?: boolean;
    w?: boolean;
    s?: boolean;
    a?: boolean;
    d?: boolean;
    g?: boolean;
    e?: boolean;
};

let audio = new Audio(stepFoot);
const url =
    "https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/Character/Character.glb";
const MovingSpeed: number = 6;

export default function Character(props: CharacterProps) {
    const movable = useRef(true);
    movable.current = props.movable;
    audio.volume = props.volume / 100;
    const socket = useAppSelector(socketSelector.getSocket);

    const { scene, animations, materials } = useCustomGLTF(url) as GLTFResult;
    // const { scene, animations, materials } = useCustomGLTF(
    //   "/models/Character.glb"
    // ) as GLTFResult;
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);

    const group = useRef<THREE.Group>();
    const [ref, api] = useCylinder(() => ({
        args: [1, 1, 4, 8],
        type: "Dynamic",
        fixedRotation: true,
        mass: 1,
    }));

    const rotateAngle = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
    const rotateQuaternion = useRef(new THREE.Quaternion());
    const walkDirection = useRef(new THREE.Vector3());
    const currentClip = useRef<THREE.AnimationClip>(null);
    const { actions, mixer } = useAnimations<GLTFActions>(animations, group);

    const { orbitRef } = props;
    const [keyPressed, setKeyPressed] = useState<KeyProps>({});
    const [gesturePlaying, setGesturePlaying] = useState<boolean>(false);
    const [emojiPlaying, setEmojiPlaying] = useState<boolean>(false);

    const position = useRef([0, 0, 0]);
    const rotation = useRef([0, 0, 0]);
    const count = useRef(0);

    const match = matchPath({ path: "/office/:id" }, window.location.pathname);

    const timeoutId = useRef<NodeJS.Timeout>();

    const getGesture = () => {
        if (props.currentGesture && props.currentGesture.idx > 1) {
            return ANIMATION_LIST[props.currentGesture?.idx!];
        } else {
            return ANIMATION_LIST[0];
        }
    };

    useEffect(() => {
        if (props.currentGesture && props.currentGesture.idx >= 0) {
            setGesturePlaying(true);
        }
    }, [props.currentGesture]);

    useEffect(() => {
        if (props.currentEmoji && props.currentEmoji.idx >= 0) {
            setEmojiPlaying(true);
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
                setEmojiPlaying(false);
            }, 2000);
        }
    }, [props.currentEmoji]);
    const visibleRef = useRef<boolean>(true);
    visibleRef.current = props.visible;
    useThree(({ camera }) => {
        api.position.subscribe((v) => {
            const x = camera.position.x + v[0] - position.current[0];
            const y = camera.position.y + v[1] - position.current[1];
            const z = camera.position.z + v[2] - position.current[2];
            position.current = v;

            if (visibleRef.current) {
                orbitRef.current.target = new THREE.Vector3(v[0], v[1], v[2]);
                camera.position.set(x, y, z);
                orbitRef.current.update();
            }
        });
        api.rotation.subscribe((v) => {
            rotation.current = v;
        });
    });

    useEffect(() => {
        if (emojiPlaying) {
            setTimeout(() => {
                setEmojiPlaying(false);
            }, 2000);
        }
    }, [emojiPlaying]);

    const isMoving = () => {
        if (!movable.current) return false;
        const moveVector = getMovingVector(keyPressed);
        return Math.abs(moveVector.x) > 0.1 || Math.abs(moveVector.z) > 0.1;
    };

    const getDirectionOffset = () => {
        const vector = getMovingVector(keyPressed);
        let angle = new THREE.Vector3(1, 0, 0).angleTo(vector.normalize());
        if (vector.z < 0) {
            angle = 2 * Math.PI - angle;
        }
        let result = angle + Math.PI / 2;
        if (result >= 2 * Math.PI + Math.PI / 2) {
            result -= 2 * Math.PI + Math.PI / 2;
        }
        return result;
    };

    useFrame((state, delta) => {
        if (!movable.current) {
            return;
        }
        const { camera } = state;
        let clip: THREE.AnimationClip = null;

        if (isMoving()) {
            if (gesturePlaying) {
                setGesturePlaying(false);
            }

            const directionOffset = getDirectionOffset();

            api.quaternion.copy(ref.current.quaternion);

            camera.getWorldDirection(walkDirection.current);
            walkDirection.current.y = 0;
            walkDirection.current.normalize();
            walkDirection.current.applyAxisAngle(
                rotateAngle.current,
                directionOffset + Math.PI
            );

            const moveX = walkDirection.current.x * MovingSpeed;
            const moveZ = walkDirection.current.z * MovingSpeed;

            rotateQuaternion.current.setFromUnitVectors(
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(moveX, 0, moveZ).normalize()
            );

            ref.current.quaternion.rotateTowards(
                rotateQuaternion.current,
                delta * 10
            );

            api.velocity.set(moveX, 0, moveZ);

            // api.quaternion.copy(ref.current.quaternion);
            if (count.current > 20) {
                console.log("alo")
                socket.emit("office_member:move", {
                    xRotation: rotation.current[0],
                    yRotation: rotation.current[1],
                    zRotation: rotation.current[2],
                    xPosition: position.current[0],
                    yPosition: position.current[1],
                    zPosition: position.current[2],
                });
                count.current = 0;
            }
            count.current++;
            clip = actions.Walking;
        } else {
            if (gesturePlaying) {
                clip = actions[getGesture()];
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
        actions.Idle?.play();
        if (!movable.current) {
            return;
        }

        document.addEventListener("keydown", (event) => {
            // audio.play();
            setKeyPressed((keyPressed) => ({ ...keyPressed, [event.key]: true }));
        });
        document.addEventListener("keyup", (event) => {
            // audio.play();
            setKeyPressed((keyPressed) => ({ ...keyPressed, [event.key]: false }));
        });
    }, [orbitRef, ref, actions.Idle]);

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

    const appearance = props.appearance;

    const hairStyle = `Hair_${appearance.hairStyle + 1}`;
    materials[hairStyle].color.setStyle(
        AppearanceGroups[2].items[appearance.hairColor].hex
    );
    const hair = (
        <skinnedMesh
            geometry={nodes[hairStyle]?.geometry}
            material={materials[hairStyle]}
            skeleton={nodes[hairStyle].skeleton}
        />
    );

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

    const texture = useMemo(() => {
        if (!props.stream) {
            return null;
        }
        const selfVideo = document.createElement("video");
        selfVideo.muted = true;
        selfVideo.srcObject = props.stream;
        selfVideo.addEventListener("loadedmetadata", () => {
            selfVideo.play();
        });
        return new THREE.VideoTexture(selfVideo);
    }, [props.stream]);

    const emojiTexture = useMemo(() => {
        if (props.currentEmoji && props.currentEmoji.idx >= 0) {
            return loader.load(
                require(`../../../assets/images/emojis/${EMOJI_LIST[props.currentEmoji?.idx!]
                    }.png`)
            );
        } else {
            return loader.load();
        }
    }, [props.currentEmoji])

    const [isVideoOpening, setIsVideoOpening] = useState(false);
    const userInfo = useAppSelector(userSelectors.getUserInfo);

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
                    <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
                    <primitive object={nodes.Ctrl_Hand_IK_Left} />
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
                    {hair}
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

const getMovingVector = (keyPressed) => {
    const w = window as any;
    if (w.moveVector) {
        return new THREE.Vector3(w.moveVector[0], w.moveVector[1], w.moveVector[2]);
    }
    const vector = new THREE.Vector3();
    if (!keyPressed) {
        return vector;
    }
    if (keyPressed.ArrowUp || keyPressed.W || keyPressed.w) {
        vector.z = 1;
        audio.play();
    }
    if (keyPressed.ArrowDown || keyPressed.S || keyPressed.s) {
        if (keyPressed.ArrowUp || keyPressed.W || keyPressed.w) {
            vector.z = 0;
            audio.play();
        } else {
            vector.z = -1;
            audio.play();
        }
    }

    if (keyPressed.ArrowRight || keyPressed.D || keyPressed.d) {
        vector.x = 1;
        audio.play();
    }
    if (keyPressed.ArrowLeft || keyPressed.A || keyPressed.a) {
        if (keyPressed.ArrowRight || keyPressed.D || keyPressed.d) {
            vector.x = 0;
            audio.play();
        } else {
            vector.x = -1;
            audio.play();
        }
    }

    return vector;
};

useGLTF.preload("/Character.glb");
