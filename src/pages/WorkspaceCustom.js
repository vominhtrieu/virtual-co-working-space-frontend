import { useRef, useState } from "react";
import { Suspense } from "react/cjs/react.production.min";
import { OrbitControls } from "@react-three/drei";
import Box from "../components/Models/Box";
import { Canvas } from "@react-three/fiber";
import Button from "../components/Button";
import Office from "../components/Models/Office";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ObjectProperties from "../components/Models/ObjectProperties";

import {
    faList,
    faRotateRight,
    faRotateLeft,
    faTrash,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import CustomTransformControl from "../components/Controls/CustomTransformControl";

const WorkspaceCustom = () => {
    const orbitRef = useRef();
    const [objectList, setObjectList] = useState([{ key: 0, code: "Chair" }]);
    const [selectedObject, setSelectedObject] = useState(null);
    const [objectActionVisible, setObjectActionVisible] = useState(false);
    const [object3dClickPos, setObjectionClickPos] = useState({ x: 0, y: 0 });

    const handleButtonRotateLeftClick = (e) => {
        selectedObject.rotation.y += Math.PI / 2;
    };

    const handleButtonRotateRightClick = (e) => {
        selectedObject.rotation.y -= Math.PI / 2;
    };

    const handleButtonDeleteClick = (e) => {
        setObjectActionVisible(false);
    };

    const handleObject3dClick = (e) => {
        setSelectedObject(e.object);
        setObjectActionVisible(true);

        const x = e.clientX;
        const y = e.clientY;

        setObjectionClickPos({ x, y });
    };

    const handleObject3dPointerMissed = (e) => {
        setObjectActionVisible(false);
    };

    return (
        <>
            <Canvas
                shadows={{ enabled: true, autoUpdate: true }}
                camera={{ position: [0, 5, 5], rotation: [45, 0, 0] }}
                style={{
                    height: "100vh",
                    background: "#577BC1",
                    position: "fixed",
                }}
            >
                <OrbitControls
                    ref={orbitRef}
                    maxZoom={10}
                    maxDistance={15}
                    minDistance={8}
                    minZoom={1}
                    enablePan="false"
                    enableZoom="false"
                    maxPolarAngle={((90 - 10) / 180) * Math.PI}
                />
                <ambientLight />

                <Suspense fallback={<Box />}>
                    <Office />
                    {objectList.map((object) => (
                        <mesh
                            key={object.key}
                            position={[0, 0.5, 0]}
                            onClick={handleObject3dClick}
                            onPointerMissed={handleObject3dPointerMissed}
                        >
                            {ObjectProperties[object.code]}
                        </mesh>
                    ))}

                    {objectActionVisible ? <CustomTransformControl object={selectedObject} orbit={orbitRef} /> : null}
                </Suspense>
            </Canvas>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div
                    aria-label="topMenu"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "0.5rem 1rem",
                        alignItems: "center",
                    }}
                >
                    <Button>
                        <FontAwesomeIcon style={{ width: "1.5rem", height: "1.5rem" }} icon={faList} />
                    </Button>
                    <div>
                        <Button style={{ marginRight: "10px" }}>Cancel</Button>

                        <Button>Save</Button>
                    </div>
                </div>

                {objectActionVisible && (
                    <div aria-label="actionContainer">
                        <div
                            style={{
                                position: "absolute",
                                left: `${object3dClickPos.x}px`,
                                top: `${object3dClickPos.y - 10}px`,
                                marginLeft: "10rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <Button onClick={handleButtonDeleteClick}>
                                <FontAwesomeIcon style={{ width: "1.5rem", height: "1.5rem" }} icon={faTrash} />
                            </Button>
                            <Button onClick={handleButtonRotateLeftClick}>
                                <FontAwesomeIcon style={{ width: "1.5rem", height: "1.5rem" }} icon={faRotateLeft} />
                            </Button>
                            <Button onClick={handleButtonRotateRightClick}>
                                <FontAwesomeIcon style={{ width: "1.5rem", height: "1.5rem" }} icon={faRotateRight} />
                            </Button>
                        </div>
                    </div>
                )}

                <div aria-label="bottomMenu">
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <button style={{ backgroundColor: "transparent", border: "none" }}>
                            <FontAwesomeIcon style={{ width: "1.5rem", height: "1.5rem" }} icon={faArrowLeft} />
                        </button>

                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "0.5rem 0.75rem",
                            }}
                        >
                            Chair
                        </Button>

                        <button style={{ backgroundColor: "transparent", border: "none" }}>
                            <FontAwesomeIcon style={{ width: "1.5rem", height: "1.5rem" }} icon={faArrowRight} />
                        </button>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            justifyContent: "center",
                            margin: "0.5rem 0 1.5rem",
                        }}
                    >
                        <Button
                            style={{ padding: 0, width: "4rem", height: "4rem" }}
                            onClick={() =>
                                setObjectList([
                                    ...objectList,
                                    { key: objectList[objectList.length - 1].key + 1, code: "Chair" },
                                ])
                            }
                        >
                            ABC
                        </Button>
                        <Button style={{ padding: 0, width: "4rem", height: "4rem" }}>ABC</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkspaceCustom;
