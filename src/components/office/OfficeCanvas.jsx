import {OrbitControls} from "@react-three/drei";
import {Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import Box from "../models/Box";
import {Physics} from "@react-three/cannon";
import Office from "../models/Office";
import Character from "../models/character/Character";
import MemberCharacter from "../models/character/MemberCharacter";
import CustomTransformControl from "../controls/CustomTransformControl";
import {Canvas} from "@react-three/fiber";
import CharacterContext from "../../context/CharacterContext";
import {useAppSelector} from "../../stores";
import {volumeSelectors} from "../../stores/volume-slice";
import {Provider} from "react-redux";
import store from "../../stores";
import ItemModel from "../models/ItemModel";
import {userSelectors} from "../../stores/auth-slice";
import Peer from "peerjs";
import {v4} from "uuid";
import {socketSelector} from "../../stores/socket-slice";
import {useParams} from "react-router-dom";

export default function OfficeCanvas({
                                         setObjectionClickPos,
                                         characterGesture,
                                         characterEmoji,
                                         setSelectedObject,
                                         setSelectedKey,
                                         setObjectActionVisible,
                                         objectList,
                                         objectActionVisible,
                                         selectedObject,
                                         selectedKey,
                                         onlineMembers,
                                         handleObject3dDragged,
                                         action,
                                         memberAppearances
                                     }) {
    const orbitRef = useRef(null);
    const appearance = useContext(CharacterContext);
    const volume = useAppSelector(volumeSelectors.getVolume);
    const socket = useAppSelector(socketSelector.getSocket);
    const userInfo = useAppSelector(userSelectors.getUserInfo);
    const myPeer = useMemo(
            () => {
                if (!socket.connected) {
                    return null;
                }
                const p = new Peer(userInfo.id + "", {
                    host: process.env.REACT_APP_PEER_SERVER_HOST + "",
                    port: +(process.env.REACT_APP_PEER_SERVER_PORT + ""),
                    path: "/peer",
                })
                return p;
            }, [socket.connected, userInfo.id]
        )
    ;

    const params = useParams();
    const [myStream, setMyStream] = useState(null);
    const myVideo = useRef();
    const [otherStreams, setOtherStreams] = useState({});
    // console.log(otherStreams)
    if (myPeer) {
        myPeer.on("open", (id) => {
            console.log(socket.connected)
            socket.emit("calling:join", {
                officeId: params.id,
                peerId: id,
            });
        });
    }

    useEffect(() => {
        if (!socket.connected) {
            return;
        }
        myPeer.on("open", (id) => {
            socket.emit("calling:join", {
                officeId: params.id,
                peerId: id,
            });
        });

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                setMyStream(stream);
                const streamMap = {};
                myPeer.on("call", (call) => {
                    call.answer({...stream, userId: userInfo.id});
                    const video = document.createElement("video");
                    call.on("stream", (userVideoStream) => {
                        console.log("User ID:", userVideoStream.userId);
                        if (streamMap[userVideoStream.id]) {
                            return;
                        }
                        streamMap[userVideoStream.id] = true;
                    });
                });
                if (myVideo.current) {
                    myVideo.current.srcObject = stream;
                }
            });
    }, [socket, params.id]);

    useEffect(() => {
        if (!myStream || !myPeer) {
            return;
        }
        const streamMap = {};
        socket.on("calling:join", ({userId, peerId}) => {
            console.log("someone is joined")
            setTimeout(() => {
                console.log("hallo")
                const call = myPeer.call(peerId, {...myStream, userId: userInfo.id});

                call.on("stream", (userVideoStream) => {
                    console.log(myStream.userId);
                    if (streamMap[userVideoStream.id]) {
                        return;
                    }
                    streamMap[userVideoStream.id] = true;
                    setOtherStreams((otherStreams) => {
                        let temp = {...otherStreams};
                        temp[userId] = userVideoStream;
                        return temp;
                    });
                });
                call.on("close", () => {
                    console.log("close");
                });
            }, 1000);
        });
        return () => {
            socket.removeListener("calling:join");
        };
    }, [myPeer, myStream, socket, userInfo.id]);

    const handleObject3dClick = (e, key) => {
        let temp = e.object;
        while (temp.parent && temp.parent.type !== "Scene") {
            temp = temp.parent;
        }

        setSelectedObject(temp);
        setSelectedKey(key);
        setObjectActionVisible(true);

        const x = e.clientX;
        const y = e.clientY;

        setObjectionClickPos({x, y});
    };

    const handleObject3dPointerMissed = () => {
        setObjectActionVisible(false);
    };

    return (
        <Canvas
            shadows={{enabled: true, autoUpdate: true}}
            camera={{position: [0, 5, 5], rotation: [45, 0, 0]}}
            style={{
                height: "100vh",
                width: "100vw",
                background: "#577BC1",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <Provider store={store}>
                <OrbitControls
                    ref={orbitRef}
                    minDistance={action !== "config" ? 5 : 0}
                    maxDistance={action !== "config" ? 5 : 100}
                    enablePan={action === "config"}
                    enableZoom={action === "config"}
                />
                <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45}/>
                <ambientLight/>
                {/* <Stats /> */}
                <Suspense fallback={<Box/>}>
                    <Physics gravity={[0, 0, 0]}>
                        <Office castShadow={true}/>
                        {objectList.map((object) => (
                            <mesh
                                castShadow={true}
                                key={object.id}
                                position={[
                                    object.transform.xPosition,
                                    object.transform.yPosition,
                                    object.transform.zPosition,
                                ]}
                                rotation={[
                                    object.transform.xRotation,
                                    object.transform.yRotation,
                                    object.transform.zRotation,
                                ]}
                                onClick={(e) => handleObject3dClick(e, object.id)}
                                onPointerMissed={handleObject3dPointerMissed}
                            >
                                <Suspense fallback={null}>
                                    <ItemModel url={object.item.modelPath} itemId={object.id}/>
                                </Suspense>
                            </mesh>
                        ))}
                        {onlineMembers.map((member) =>
                            member.member.id === userInfo.id ? (
                                <Character
                                    key={member.id}
                                    appearance={appearance}
                                    startPosition={[
                                        member.transform.position.x,
                                        2.5,
                                        member.transform.position.z,
                                    ]}
                                    startRotation={[
                                        member.transform.rotation.x,
                                        member.transform.rotation.y,
                                        member.transform.rotation.z,
                                    ]}
                                    stream={myStream}
                                    scale={[2, 2, 2]}
                                    orbitRef={orbitRef}
                                    movable={action === "" || action === "action"}
                                    volume={volume}
                                    currentEmoji={characterEmoji}
                                    currentGesture={characterGesture}
                                    visible={action !== "config"}
                                />
                            ) : (
                                <MemberCharacter
                                    key={member.id}
                                    appearance={memberAppearances.find((memberAppearance) => memberAppearance.userId === member.member.id)?.appearance}
                                    startPosition={[
                                        member.transform.position.x,
                                        2.5,
                                        member.transform.position.z,
                                    ]}
                                    startRotation={[
                                        member.transform.rotation.x,
                                        member.transform.rotation.y,
                                        member.transform.rotation.z,
                                    ]}
                                    stream={otherStreams[member.member.id]}
                                    scale={[2, 2, 2]}
                                    orbitRef={orbitRef}
                                    movable
                                    volume={volume}
                                    currentEmoji={characterEmoji}
                                    currentGesture={characterGesture}
                                    memberId={member.member.id}
                                    visible={action !== "config"}
                                />
                            )
                        )}

                        {/* <Stats className="stats" /> */}

                        <CustomTransformControl
                            object={selectedObject}
                            objectKey={selectedKey}
                            orbit={orbitRef}
                            visible={objectActionVisible && action === "config"}
                            handleObject3dDragged={handleObject3dDragged}
                        />
                    </Physics>
                </Suspense>
            </Provider>
        </Canvas>
    );
}
