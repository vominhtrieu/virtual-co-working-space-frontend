import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useRef, useState } from "react";
import { FaEdit, FaList, FaTrash, FaUserEdit } from "react-icons/fa";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import BottomMenu from "../components/Controls/BottomMenu";
import CustomTransformControl from "../components/Controls/CustomTransformControl";
import Box from "../components/Models/Box";
import Character from "../components/Models/Character";
import ObjectProperties from "../components/Models/ObjectProperties";
import Office from "../components/Models/Office";
import CharacterContext from "../context/CharacterContext";

const itemGroups = [
  {
    groupName: "Chair",
    items: [
      { code: "SofaChair", url: "./images/SofaChair.png" },
      { code: "Chair", url: "./images/Chair.png" },
      { code: "YellowChair", url: "/images/YellowChair.png" },
    ],
  },
  {
    groupName: "Table",
    items: [
      { code: "ModernTable", url: "./images/ModernTable.png" },
      { code: "CoffeeTable", url: "./images/CoffeeTable.png" },
    ],
  },
  {
    groupName: "Indoor Tree",
    items: [{ code: "IndoorTree", url: "./images/IndoorTree.png" }],
  },
  {
    groupName: "Keyboard",
    items: [{ code: "Keyboard", url: "./images/Keyboard.png" }],
  },
];

const WorkspaceCustom = () => {
  const orbitRef = useRef(null);
  const [objectList, setObjectList] = useState([{ key: uuidv4(), code: "Chair" }]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [objectActionVisible, setObjectActionVisible] = useState(false);
  const [object3dClickPos, setObjectionClickPos] = useState({ x: 0, y: 0 });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const navigate = useNavigate();
  const character = useContext(CharacterContext);

  const handleButtonRotateLeftClick = () => {
    selectedObject.rotation.y += Math.PI / 2;
  };

  const handleButtonRotateRightClick = () => {
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

  const handleObject3dClick = (e: any, key: any) => {
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
    setObjectActionVisible(false);
  };

  const handleItemInBottomMenuClick = ({ code }: any) => {
    setObjectList([
      ...objectList,
      {
        key: uuidv4(),
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
          enablePan={isCustomizing}
          enableZoom={isCustomizing}
          maxPolarAngle={((90 - 10) / 180) * Math.PI}
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
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
              {ObjectProperties["Chair"]}
            </mesh>
          ))}
          {!isCustomizing && (
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
          {objectActionVisible && isCustomizing ? (
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
        {!isCustomizing && (
          <div
            aria-label='mainMenu'
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0.5rem 1rem",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Button onClick={() => setShowMainMenu((value) => !value)}>
              <FaList style={{ width: "1.5rem", height: "1.5rem" }} />
            </Button>
            {showMainMenu && (
              <>
                <div style={{ position: "absolute", top: 60, width: "auto" }}>
                  <Button
                    onClick={() => {
                      setIsCustomizing((value) => !value);
                      setShowMainMenu(false);
                    }}
                  >
                    <FaEdit
                      style={{
                        width: "1.5rem",
                        height: "30px",
                        marginRight: 5,
                      }}
                    />
                    <span>Customize your office</span>
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/character");
                    }}
                  >
                    <FaUserEdit
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        marginRight: 5,
                      }}
                    />
                    <span>Change your character</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {isCustomizing ? (
          <>
            <div style={{ position: "fixed", right: 20, top: 10 }}>
              <Button
                onClick={() => {
                  setIsCustomizing(false);
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  setIsCustomizing(false);
                }}
              >
                Save
              </Button>
            </div>
            {objectActionVisible && (
              <div aria-label='actionContainer' style={{ pointerEvents: "none" }}>
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
                    <FaTrash style={{ width: "1.5rem", height: "1.5rem" }} />
                  </Button>
                  <Button onClick={handleButtonRotateLeftClick}>
                    <BiRotateLeft style={{ width: "1.5rem", height: "1.5rem" }} />
                  </Button>
                  <Button onClick={handleButtonRotateRightClick}>
                    <BiRotateRight style={{ width: "1.5rem", height: "1.5rem" }} />
                  </Button>
                </div>
              </div>
            )}

            <div aria-label='bottomMenu'>
              <BottomMenu
                // objectList={objectList}
                // setObjectList={setObjectList}
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
