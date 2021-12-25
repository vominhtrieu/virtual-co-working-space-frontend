import { useRef, useState, useContext } from "react";
import { Suspense } from "react/cjs/react.production.min";
import { OrbitControls } from "@react-three/drei";
import Box from "../components/Models/Box";
import { Canvas } from "@react-three/fiber";
import Button from "../components/Button";
import Office from "../components/Models/Office";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ObjectProperties from "../components/Models/ObjectProperties";
import { faList, faRotateRight, faRotateLeft, faTrash, faEdit, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import CustomTransformControl from "../components/Controls/CustomTransformControl";
import BottomMenu from "../components/Controls/BottomMenu";
import CharacterContext from "../context/CharacterContext";
import Character from "../components/Models/Character";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const itemGroups = [
    {
        groupName: "Chair",
        items: [
            { code: "Chair", url: "./images/SofaChair.png" },
            { code: "Chair", url: "./images/SofaChair.png" },
            { code: "Chair", url: "./images/SofaChair.png" },
            { code: "Chair", url: "./images/SofaChair.png" },
            { code: "Chair", url: "./images/SofaChair.png" },
            { code: "Chair", url: "./images/SofaChair.png" },
            { code: "Chair", url: "./images/SofaChair.png" },
        ],
    },
    { groupName: "Indoor Tree", items: [{ code: "IndoorTree", url: "./images/SofaChair.png" }] },
    { groupName: "Table", items: [{ code: "ModernTable", url: "./images/SofaChair.png" }] },
];

const WorkspaceCustom = () => {
    const orbitRef = useRef();
    const [objectList, setObjectList] = useState([{ key: uuid(), code: "Chair" }]);
    const [selectedKey, setSelectedKey] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [objectActionVisible, setObjectActionVisible] = useState(false);
    const [object3dClickPos, setObjectionClickPos] = useState({ x: 0, y: 0 });
    const [isCustoming, setIsCustoming] = useState(false);
    const [showMainMenu, setShowMainMenu] = useState(false);
    const navigate = useNavigate();
    const character = useContext(CharacterContext);

    const handleButtonRotateLeftClick = (e) => {
        selectedObject.rotation.y += Math.PI / 2;
    };

    const handleButtonRotateRightClick = (e) => {
        selectedObject.rotation.y -= Math.PI / 2;
    };

    const handleButtonDeleteClick = () => {
        const idx = objectList.findIndex((obj) => obj.key === selectedKey);
        const newObjectList = [...objectList];
        newObjectList.splice(idx, 1);
        setObjectList(newObjectList);
        setSelectedObject(null);
        setSelectedKey(null);
        setObjectActionVisible(false);
    };

    const handleObject3dClick = (e, key) => {
        setSelectedObject(e.object);
        setSelectedKey(key);
        setObjectActionVisible(true);

        const x = e.clientX;
        const y = e.clientY;

        setObjectionClickPos({ x, y });
    };

    const handleObject3dPointerMissed = (e) => {
        setObjectActionVisible(false);
    };

    const handleItemInBottomMenuClick = ({ code }) => {
        setObjectList([
            ...objectList,
            {
                key: uuid(),
                code,
            },
        ]);
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
                    enablePan={isCustoming}
                    enableZoom={isCustoming}
                    maxPolarAngle={((90 - 10) / 180) * Math.PI}
                />
                <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45} />
                <ambientLight />

                <Suspense fallback={<Box />}>
                    <Office castShadow={true} />
                    {objectList.map((object, idx) => (
                        <mesh
                            castShadow={true}
                            key={object.key}
                            position={[0, 0.5, 0]}
                            onClick={(e) => handleObject3dClick(e, object.key)}
                            onPointerMissed={handleObject3dPointerMissed}
                        >
                            {ObjectProperties[object.code]}
                        </mesh>
                    ))}
                    {!isCustoming && (
                        <Character
                            hair={character.hairStyle}
                            eyes={character.eyeStyle}
                            startPosition={[0, 0.5, 2]}
                            scale={[2, 2, 2]}
                            moveable={true}
                            orbitRef={orbitRef}
                        />
                    )}

                    {/* <Stats className="stats" /> */}
                    {objectActionVisible && isCustoming ? (
                        <CustomTransformControl object={selectedObject} orbit={orbitRef} />
                    ) : null}
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
                {!isCustoming && (
                    <div
                        aria-label="mainMenu"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0.5rem 1rem",
                            alignItems: "center",
                            position: "absolute",
                        }}
                    >
                        <Button onClick={() => setShowMainMenu((value) => !value)}>
                            <FontAwesomeIcon style={{ width: "1.5rem", height: "1.5rem" }} icon={faList} />
                        </Button>
                        {showMainMenu && (
                            <>
                                <div style={{ position: "absolute", top: 60, width: "auto" }}>
                                    <Button
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "left",
                                            width: "200px",
                                            textAlign: "left",
                                        }}
                                        onClick={() => {
                                            setIsCustoming((value) => !value);
                                            setShowMainMenu(false);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{ width: "1.5rem", height: "30px", marginRight: 5 }}
                                            icon={faEdit}
                                        />
                                        <span>Customize your office</span>
                                    </Button>
                                    <Button
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "left",
                                            textAlign: "left",
                                            marginTop: 10,
                                            width: "200px",
                                            overflow: "hidden",
                                        }}
                                        onClick={() => {
                                            navigate("/character");
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{ width: "1.5rem", height: "1.5rem", marginRight: 5 }}
                                            icon={faUserEdit}
                                        />
                                        <span>Change your character</span>
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {isCustoming ? (
                    <>
                        <div style={{ position: "fixed", right: 20, top: 10 }}>
                            <Button
                                style={{ marginRight: "10px" }}
                                onClick={() => {
                                    setIsCustoming(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={() => {
                                    setIsCustoming(false);
                                }}
                            >
                                Save
                            </Button>
                        </div>
                        {objectActionVisible && (
                            <div aria-label="actionContainer" style={{ pointerEvents: "none" }}>
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
                                        <FontAwesomeIcon
                                            style={{ width: "1.5rem", height: "1.5rem" }}
                                            icon={faRotateLeft}
                                        />
                                    </Button>
                                    <Button onClick={handleButtonRotateRightClick}>
                                        <FontAwesomeIcon
                                            style={{ width: "1.5rem", height: "1.5rem" }}
                                            icon={faRotateRight}
                                        />
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div aria-label="bottomMenu">
                            <BottomMenu
                                objectList={objectList}
                                setObjectList={setObjectList}
                                itemGroups={itemGroups}
                                onItemClick={handleItemInBottomMenuClick}
                            />
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
};

export default WorkspaceCustom;
