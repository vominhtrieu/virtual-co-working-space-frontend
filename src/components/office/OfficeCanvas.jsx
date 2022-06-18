import { OrbitControls } from "@react-three/drei";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import Box from "../models/Box";
import { Debug, Physics } from "@react-three/cannon";
import Office from "../models/Office";
import Character from "../models/character/Character";
import MemberCharacter from "../models/character/MemberCharacter";
import CustomTransformControl from "../controls/CustomTransformControl";
import { Canvas } from "@react-three/fiber";
import CharacterContext from "../../context/CharacterContext";
import { useAppSelector } from "../../stores";
import { volumeSelectors } from "../../stores/volume-slice";
import { Provider } from "react-redux";
import store from "../../stores";
import ItemModel from "../models/ItemModel";
import { userSelectors } from "../../stores/auth-slice";
import CallingBar from "../../pages/office-detail/calling/CallingBar";
import { socketSelector } from "../../stores/socket-slice";
import Outline from "../models/Outline";

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
    memberAppearances,
    setMessage,
    mobile,
}) {
    const orbitRef = useRef(null);
    const appearance = useContext(CharacterContext);
    const volume = useAppSelector(volumeSelectors.getVolume);
    const userInfo = useAppSelector(userSelectors.getUserInfo);
    const [myStream, setMyStream] = useState(null);
    const [otherStreams, setOtherStreams] = useState({});
    const [showCallingBar, setShowCallingBar] = useState(false);

    const handleObject3dClick = (e, key) => {
        if (action !== "config") return;
        let temp = e.object;
        while (temp.parent && temp.parent.type !== "Scene") {
            temp = temp.parent;
        }


        setSelectedObject(temp);
        setSelectedKey(key);
        setObjectActionVisible(true);

        const x = e.clientX;
        const y = e.clientY;

        setObjectionClickPos({ x, y });
    };

    const handleObject3dPointerMissed = () => {
        // setObjectActionVisible(false);
    };
    const socket = useAppSelector(socketSelector.getSocket);

    const displayObjects = <>
        {/* <Outline> */}
        <Office castShadow={true} action={action} />
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
                    <ItemModel url={object.item.modelPath} item={{
                        name: object.item.name,
                        category: object.item.category,
                    }}
                        rotation={[
                            object.transform.xRotation,
                            object.transform.yRotation,
                            object.transform.zRotation,
                        ]} />
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
                    setMessage={setMessage}
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
                    scale={[2, 2, 2]}
                    orbitRef={orbitRef}
                    stream={otherStreams[member.member.id]}
                    movable
                    volume={volume}
                    currentEmoji={characterEmoji}
                    currentGesture={characterGesture}
                    memberId={member.member.id}
                    visible={action !== "config"}
                />
            )
        )}
        {/* </Outline> */}

        {/* <Stats className="stats" /> */}

        <CustomTransformControl
            object={selectedObject}
            objectKey={selectedKey}
            orbit={orbitRef}
            visible={action === "config"}
            handleObject3dDragged={handleObject3dDragged}
        />
    </>

    useEffect(()=>{
        socket.on("connect", () => {
            setShowCallingBar(true);
          });          
    }, [])

    return (
        <>
            {(socket.connected || showCallingBar) && <CallingBar userInfo={userInfo} myStream={myStream} setMyStream={setMyStream} setOtherStreams={setOtherStreams} mobile={mobile} />}
            <Canvas
                shadows={{ enabled: true, autoUpdate: true }}
                camera={{ position: [0, 5, 5], rotation: [45, 0, 0] }}
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
                    <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45} />
                    <ambientLight />
                    {/* <Stats /> */}
                    <Suspense fallback={<Box />}>
                        <Physics gravity={[0, 0, 0]}>
                            {process.env.REACT_APP_DEBUG === "1" ? <Debug>
                                {displayObjects}
                            </Debug> : displayObjects}
                        </Physics>
                    </Suspense>
                </Provider>
            </Canvas>
        </>
    );
}