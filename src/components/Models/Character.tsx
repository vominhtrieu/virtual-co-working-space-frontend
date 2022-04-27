/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import {useEffect, useRef, useState} from 'react'
import {useGLTF, useAnimations} from '@react-three/drei'
import {Triplet, useCylinder} from '@react-three/cannon'
import {useThree, useFrame, useLoader} from '@react-three/fiber'
import {GLTFActions, GLTFResult, useCustomGLTF} from "../../helpers/utilities";
import socket from "../../services/socket/socket"
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { matchPath } from "react-router-dom"

type CharacterProps = JSX.IntrinsicElements['group'] & {
    hair: number,
    eyes: number,
    movable: boolean,
    startPosition: number[],
    orbitRef?: any,
    currentGesture?: {
        idx: number
    },
    currentEmoji?: {
        idx: number
    }
}

type KeyProps = {
    ArrowUp?: boolean,
    ArrowDown?: boolean,
    ArrowLeft?: boolean,
    ArrowRight?: boolean,
    W?: boolean,
    S?: boolean,
    A?: boolean,
    D?: boolean
    w?: boolean,
    s?: boolean,
    a?: boolean,
    d?: boolean,
    g?: boolean,
    e?: boolean
}

const MovingSpeed: number = 6;
export default function Character(props: CharacterProps) {
    const group = useRef<THREE.Group>()
    const [ref, api] = useCylinder(() => ({
        args: [1, 1, 4, 8],
        type: "Dynamic",
        fixedRotation: true,
        mass: 1,
    }))

    const rotateAngle = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
    const rotateQuaternion = useRef(new THREE.Quaternion());
    const walkDirection = useRef(new THREE.Vector3());
    const currentClip = useRef<THREE.AnimationClip>(null);
    const {nodes, materials, animations} = useCustomGLTF('/models/Character.glb') as GLTFResult
    const {actions, mixer} = useAnimations<GLTFActions>(animations, group);

    const {orbitRef} = props;
    const [keyPressed, setKeyPressed] = useState<KeyProps>({});
    const [gesturePlaying, setGesturePlaying] = useState<boolean>(false);
    const [emojiPlaying, setEmojiPlaying] = useState<boolean>(false);

    const position = useRef([0, 0, 0]);
    const updatedPosition = useRef(props.startPosition);
    const rotation = useRef([0, 0, 0]);
    const updatedRotation = useRef<THREE.Euler>(new THREE.Euler());
    const count = useRef(0);

    // const colorMap = useLoader(TextureLoader, '/images/Hair1.png')
    const loader = new THREE.TextureLoader();
    let emojiMap;

    const match = matchPath({ path: "/office/:id"}, window.location.pathname);

    const getGesture = () => {
        switch (props.currentGesture?.idx) {
            case 0:
                return "Wave";
            case 1:
                return "Rumba";
        
            default:
                return "Idle"
        }
    }

    const getEmoji = () => {
        switch (props.currentEmoji?.idx) {
            case 0:
                return loader.load('/images/Hair1.png')
            case 1:
                return loader.load('/images/Hair2.png')
        
            default:
                return null
        }
    }

    useEffect(() => {
        setGesturePlaying(true);
    }, [props.currentGesture])

    useEffect(() => {
        setEmojiPlaying(true);
    }, [props.currentEmoji])

    useEffect(() => {       
        socket.emit("office_member:join", {
            officeId: match?.params.id
        })

        socket.on("office_member:online", (message) => {
            console.log(message)
        })

        socket.on("office_member:moved", (message) => {
            updatedPosition.current = [message.xPosition, message.yPosition, message.zPosition];
            updatedRotation.current = new THREE.Euler(message.xRotation, message.yRotation, message.zRotation);
        })
    
        socket.on("office_member:error", (message) => {
            console.log(message);
        })
    
        socket.on("connect_error", message => {
            console.log("connection error: ", message);
    
        })
    }, [match?.params.id])

    useEffect(() => {
        api.position.subscribe((v) => {
            position.current = v;
        })
        api.rotation.subscribe((v) => {
            rotation.current = v;
        })
    }, [api.position, api.rotation])

    useEffect(() => {
        if (keyPressed.g) {
            setGesturePlaying(true);
        }
    }, [keyPressed.g])

    useEffect(() => {
        if (keyPressed.e) {
            setEmojiPlaying(true);
        }
    }, [keyPressed.e])

    useEffect(() => {
        if (emojiPlaying) {
            setTimeout(() => {
                setEmojiPlaying(false)
            }, 2000)
        }
    }, [emojiPlaying])

    const getMovingVector = () => {
        const vector = new THREE.Vector3();
        if (!keyPressed) {
            return vector;
        }
        if (keyPressed.ArrowUp || keyPressed.W || keyPressed.w) {
            vector.z = 1;
        }
        if (keyPressed.ArrowDown || keyPressed.S || keyPressed.s) {
            if (keyPressed.ArrowUp || keyPressed.W || keyPressed.w) {
                vector.z = 0;
            } else {
                vector.z = -1;
            }
        }

        if (keyPressed.ArrowRight || keyPressed.D || keyPressed.d) {
            vector.x = 1;
        }
        if (keyPressed.ArrowLeft || keyPressed.A || keyPressed.a) {
            if (keyPressed.ArrowRight || keyPressed.D || keyPressed.d) {
                vector.x = 0;
            } else {
                vector.x = -1;
            }
        }
        return vector;
    };

    const isMoving = () => {
        const moveVector = getMovingVector();
        return Math.abs(moveVector.x) > 0.1 || Math.abs(moveVector.z) > 0.1;
    };

    const getDirectionOffset = () => {
        const vector = getMovingVector();
        var directionOffset = 0;
        if (vector.z === 1) {
            if (vector.x === -1) {
                directionOffset = Math.PI + Math.PI / 4;
            } else if (vector.x === 1) {
                directionOffset = Math.PI - Math.PI / 4;
            } else {
                directionOffset = Math.PI;
            }
        } else if (vector.z === -1) {
            if (vector.x === -1) {
                directionOffset = 2 * Math.PI - Math.PI / 4;
            } else if (vector.x === 1) {
                directionOffset = 2 * Math.PI + Math.PI / 4;
            } else {
                directionOffset = 2 * Math.PI;
            }
        } else {
            directionOffset = -(-vector.x * Math.PI) / 2;
        }
        return directionOffset;
    };

    const shouldUpdate = () => {
        return Math.sqrt(Math.pow(position.current[0] - updatedPosition.current[0], 2) + Math.pow(position.current[2] - updatedPosition.current[2], 2)) > 0.1
    }

    useThree(({camera}) => {
        if (!props.moveable) {
            camera.position.set(0, 0, 5);
            camera.rotation.set(0, 0, 0);
        }
    });

    useEffect(() => {
        if (!props.movable) {
            return;
        }
        api.position.subscribe((_position: Triplet) => {
            position.current = _position;
        })
    })


    useFrame((state, delta) => {
        if (!props.movable) {
            return;
        }
        const {camera} = state;
        let clip: THREE.AnimationClip = null;

        if (props.movable && isMoving()) {
            if (gesturePlaying) {
                setGesturePlaying(false);
            }
            count.current++;
            clip = actions.Walking;

            const yCameraDirection = Math.atan2(
                camera.position.x - ref.current.position.x,
                camera.position.z - ref.current.position.z
            );
            const directionOffset = getDirectionOffset();
            rotateQuaternion.current.setFromAxisAngle(rotateAngle.current, yCameraDirection + directionOffset);
            ref.current.quaternion.rotateTowards(rotateQuaternion.current, delta * 10);
            camera.getWorldDirection(walkDirection.current);
            walkDirection.current.y = 0;
            walkDirection.current.normalize();
            walkDirection.current.applyAxisAngle(rotateAngle.current, directionOffset + Math.PI);


            const moveX = walkDirection.current.x * MovingSpeed;
            const moveZ = walkDirection.current.z * MovingSpeed;

            api.velocity.set(moveX, 0, moveZ);

            // camera.position.copy(api.position);
            api.quaternion.copy(ref.current.quaternion)

            if (orbitRef.current) {
                orbitRef.current.target = ref.current.position;
            }

            updatedPosition.current = position.current;

            if (count.current >= 10) {
                socket.emit("office_member:move", {
                    xRotation: rotation.current[0],
                    yRotation: rotation.current[1],
                    zRotation: rotation.current[2],
                    xPosition: position.current[0],
                    yPosition: position.current[1],
                    zPosition: position.current[2]
                })
                count.current = 0;
            }
        } else {
            if (gesturePlaying) {
                clip = actions[getGesture()];
            } else {
                clip = actions.Idle;
            }
            api.velocity.set(0, 0, 0);
        }

        //update from remote position
        if (shouldUpdate()) {
            clip = actions.Walking;

            const newDirection = new THREE.Vector3(updatedPosition.current[0] - position.current[0], 0, updatedPosition.current[2] - position.current[2]);

            rotateQuaternion.current.setFromEuler(updatedRotation.current);

            ref.current.quaternion.rotateTowards(rotateQuaternion.current, delta * 10);

            walkDirection.current = newDirection;
            walkDirection.current.y = 0;
            walkDirection.current.normalize();
            const moveX = walkDirection.current.x * MovingSpeed;
            const moveZ = walkDirection.current.z * MovingSpeed;

            api.velocity.set(moveX, 0, moveZ);
            api.quaternion.copy(ref.current.quaternion);
        }

        if (orbitRef.current) {
            orbitRef.current.target = new THREE.Vector3(position[0], position[1], position[2]);
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
        if (!props.movable) {
            return;
        }

        document.addEventListener("keydown", (event) => {
            setKeyPressed((keyPressed) => ({...keyPressed, [event.key]: true}));
        });
        document.addEventListener("keyup", (event) => {
            setKeyPressed((keyPressed) => ({...keyPressed, [event.key]: false}));
        });

        orbitRef.current.target = ref.current?.position;
    }, [orbitRef, ref, props.movable]);

    useEffect(() => {
        if (ref.current) {
            ref.current.position.set(props.startPosition[0], props.startPosition[1], props.startPosition[2]);
            api.position.set(props.startPosition[0], props.startPosition[1], props.startPosition[2]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current, props.startPosition]);

    return (
        <>
            <mesh ref={ref} {...props}>
                <group ref={group} position={[0, -1, 0]} dispose={null}>
                    <sprite position={[0, 2.6, 0]} visible={emojiPlaying} >
                        <spriteMaterial map={getEmoji()} />
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
                    {/* <skinnedMesh geometry={nodes.Cube001.geometry} material={materials.Body}
                                 skeleton={nodes.Cube001.skeleton}/>
                    <skinnedMesh geometry={nodes.Cube001_1.geometry} material={materials.Head}
                                 skeleton={nodes.Cube001_1.skeleton}/> */}
                    <skinnedMesh geometry={nodes.Cube006.geometry} material={materials.Body}
                                 skeleton={nodes.Cube006.skeleton}/>
                    <skinnedMesh geometry={nodes.Cube006_1.geometry} material={materials.Head}
                                 skeleton={nodes.Cube006_1.skeleton}/>
                    <skinnedMesh geometry={nodes.Cube006_2.geometry} material={materials.Eye}
                                 skeleton={nodes.Cube006_2.skeleton}/>
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
                    <skinnedMesh geometry={nodes.Shoe.geometry} material={materials.Shoes}
                                 skeleton={nodes.Shoe.skeleton}/>
                </group>
            </mesh>
        </>
    )
}

useGLTF.preload('/Character.glb')
