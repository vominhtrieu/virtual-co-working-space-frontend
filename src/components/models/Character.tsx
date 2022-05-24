/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import {
  GLTFActions,
  GLTFResult,
  useCustomGLTF,
} from "../../helpers/utilities";
import { matchPath } from "react-router-dom";
import { ANIMATION_LIST, EMOJI_LIST } from "../../helpers/constants";
import { socketSelector } from "../../stores/socket-slice";
import { useAppSelector } from "../../stores";
import { match } from "assert";
import CharacterContext from "../../context/CharacterContext";

const stepFoot = require("../../assets/audios/foot-step.mp3");

type CharacterProps = JSX.IntrinsicElements["group"] & {
  hair: number;
  eyes: number;
  movable: boolean;
  startPosition: number[];
  orbitRef?: any;
  volume: number;
  currentGesture?: {
    idx: number;
  };
  currentEmoji?: {
    idx: number;
  };
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

const MovingSpeed: number = 6;
export default function Character(props: CharacterProps) {
  audio.volume = props.volume / 100;
  const characterCtx = useContext(CharacterContext);
  const socket = useAppSelector(socketSelector.getSocket);

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
  const { nodes, materials, animations } = useCustomGLTF(
    "/models/Character.glb"
  ) as GLTFResult;
  const { actions, mixer } = useAnimations<GLTFActions>(animations, group);

  const { orbitRef } = props;
  const [keyPressed, setKeyPressed] = useState<KeyProps>({});
  const [gesturePlaying, setGesturePlaying] = useState<boolean>(false);
  const [emojiPlaying, setEmojiPlaying] = useState<boolean>(false);

  const position = useRef([0, 0, 0]);
  const updatedPosition = useRef(props.startPosition);
  const rotation = useRef([0, 0, 0]);
  const updatedRotation = useRef<THREE.Euler>(new THREE.Euler());
  const count = useRef(0);

  const loader = new THREE.TextureLoader();

  const match = matchPath({ path: "/office/:id" }, window.location.pathname);

  const getGesture = () => {
    if (props.currentGesture && props.currentGesture.idx > 1) {
      return ANIMATION_LIST[props.currentGesture?.idx!];
    } else {
      return ANIMATION_LIST[0];
    }
  };

  const getEmoji = () => {
    if (props.currentEmoji && props.currentEmoji.idx >= 0) {
      return loader.load(
        require(`../../assets/images/emojis/${
          EMOJI_LIST[props.currentEmoji?.idx!]
        }.png`)
      );
    } else {
      return loader.load();
    }
  };

  useEffect(() => {
    if (props.currentGesture && props.currentGesture.idx >= 0)
      setGesturePlaying(true);
  }, [props.currentGesture]);

  useEffect(() => {
    if (props.currentEmoji && props.currentEmoji.idx >= 0)
      setEmojiPlaying(true);
  }, [props.currentEmoji]);

  useThree(({ camera }) => {
    api.position.subscribe((v) => {
      const x = camera.position.x + v[0] - position.current[0];
      const y = camera.position.y + v[1] - position.current[1];
      const z = camera.position.z + v[2] - position.current[2];
      position.current = v;

      orbitRef.current.target = new THREE.Vector3(v[0], v[1], v[2]);
      camera.position.set(x, y, z);
      orbitRef.current.update();
    });
    api.rotation.subscribe((v) => {
      rotation.current = v;
    });
  });

  useEffect(() => {
    if (keyPressed.g) {
      setGesturePlaying(true);
    }
  }, [keyPressed.g]);

  useEffect(() => {
    if (keyPressed.e) {
      setEmojiPlaying(true);
    }
  }, [keyPressed.e]);

  useEffect(() => {
    if (emojiPlaying) {
      setTimeout(() => {
        setEmojiPlaying(false);
      }, 2000);
    }
  }, [emojiPlaying]);

  const isMoving = () => {
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
    const { camera } = state;
    let clip: THREE.AnimationClip = null;

    if (props.movable && isMoving()) {
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

      updatedPosition.current = position.current;

      if (count.current > 20) {
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
      } else if (!shouldUpdate()) {
        clip = actions.Idle;
      }
      api.velocity.set(0, 0, 0);
    }

    //update from remote position
    if (shouldUpdate()) {
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
      // audio.play();
      setKeyPressed((keyPressed) => ({ ...keyPressed, [event.key]: true }));
    });
    document.addEventListener("keyup", (event) => {
      // audio.play();
      setKeyPressed((keyPressed) => ({ ...keyPressed, [event.key]: false }));
    });
  }, [orbitRef, ref, props.movable]);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(
        props.startPosition[0],
        props.startPosition[1],
        props.startPosition[2]
      );
      ref.current.rotation.set(0, 0, 0);
      api.position.set(
        props.startPosition[0],
        props.startPosition[1],
        props.startPosition[2]
      );
      api.rotation.set(0, 0, 0);
      updatedPosition.current = ref.current.position;
      updatedRotation.current = ref.current.rotation;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.params.id]);

  useSocketEvent(socket, match, updatedPosition, updatedRotation);

  return (
    <>
      <mesh ref={ref} {...props}>
        <group ref={group} position={[0, -1, 0]} dispose={null}>
          <sprite position={[0, 2.6, 0]} visible={emojiPlaying}>
            <spriteMaterial map={getEmoji()} />
          </sprite>
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
          {/* <skinnedMesh geometry={nodes.Cube001.geometry} material={materials.Body}
                                 skeleton={nodes.Cube001.skeleton}/>
                    <skinnedMesh geometry={nodes.Cube001_1.geometry} material={materials.Head}
                                 skeleton={nodes.Cube001_1.skeleton}/> */}
          <skinnedMesh
            geometry={nodes.Cube006.geometry}
            material={materials.Body}
            skeleton={nodes.Cube006.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Cube006_1.geometry}
            material={materials.Head}
            skeleton={nodes.Cube006_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Cube006_2.geometry}
            material={materials.Eye}
            skeleton={nodes.Cube006_2.skeleton}
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

const useSocketEvent = (socket, match, updatedPosition, updatedRotation) => {
  useEffect(() => {
    // if (!socket) {
    //     dispatch(connect());
    //     return;
    // }

    socket.emit("office_member:join", {
      officeId: match?.params.id,
    });

    socket.on("office_member:online", (message) => {
      console.log(message);
    });

    socket.on("office_member:moved", (message) => {
      updatedPosition.current = [
        message.xPosition,
        message.yPosition,
        message.zPosition,
      ];
      updatedRotation.current = new THREE.Euler(
        message.xRotation,
        message.yRotation,
        message.zRotation
      );
    });

    socket.on("office_member:error", (message) => {
      console.log(message);
    });

    // socket.on("connect_error", message => {
    //     console.log("connection error: ", message);

    // })
    return () => {
      socket.removeListener("office_member:online");
      socket.removeListener("office_member:moved");
      socket.removeListener("office_member:error");
    };
  }, [socket, match?.params.id]);
};

useGLTF.preload("/Character.glb");
