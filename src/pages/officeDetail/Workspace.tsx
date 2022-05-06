import { Debug, Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { AiFillSetting, AiOutlineInfoCircle } from "react-icons/ai";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { FaEdit, FaList, FaTrash, FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CustomTransformControl from "../../components/Controls/CustomTransformControl";
import EditOffice from "../../components/layouts/sidebar/offices/editOffice";
import Box from "../../components/Models/Box";
import Character from "../../components/Models/Character";
import ObjectProperties from "../../components/Models/ObjectProperties";
import Office from "../../components/Models/Office";
import OfficeDetailForm from "../../components/officeDetailForm";
import Button from "../../components/UI/button";
import CharacterContext from "../../context/CharacterContext";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import { userSelectors } from "../../stores/auth-slice";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import { useAppSelector } from "../../stores";
import { volumeSelectors } from "../../stores/volume-slice";
import InteractionMenu from '../../components/layouts/sidebar/offices/characterInteraction'

const itemGroups = [
  {
    groupName: "Chair",
    items: [
      { code: "SofaChair", url: "/images/SofaChair.png" },
      { code: "Chair", url: "/images/Chair.png" },
      { code: "YellowChair", url: "/images/YellowChair.png" },
    ],
  },
  {
    groupName: "Table",
    items: [
      { code: "ModernTable", url: "/images/ModernTable.png" },
      { code: "CoffeeTable", url: "/images/CoffeeTable.png" },
    ],
  },
  {
    groupName: "Indoor Tree",
    items: [{ code: "IndoorTree", url: "/images/IndoorTree.png" }],
  },
  {
    groupName: "Keyboard",
    items: [{ code: "Keyboard", url: "/images/Keyboard.png" }],
  },
];

export type positionType = {
  x: number;
  y: number;
};

const WorkspaceCustom = () => {
  const volume = useAppSelector(volumeSelectors.getVolume);
  const [isOwner, setIsOwner] = useState(false);
  const { open } = useSelector((state: any) => state.sidebar);
  const [isShowDetailForm, setIsShowDetailForm] = useState(false);
  const orbitRef = useRef(null);
  const [objectList, setObjectList] = useState<
    Array<{
      key: string;
      code: string;
    }>
  >([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [objectActionVisible, setObjectActionVisible] = useState(false);
  const [object3dClickPos, setObjectionClickPos] = useState<positionType>({
    x: 0,
    y: 0,
  });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showInteractMenu, setShowInteractMenu] = useState(false);
  const [characterGesture, setCharacterGesture] = useState({ idx: -1});
  const [characterEmoji, setCharacterEmoji] = useState({ idx: -1})
  const navigate = useNavigate();
  const character = useContext(CharacterContext);

  const location = useLocation();

  const locationState: any = location.state;
  const officeId = locationState["officeId"];

  const userInfo = useAppSelector(userSelectors.getUserInfo);

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
    navigate("/");
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

    console.log(temp);
    setSelectedObject(temp);
    setSelectedKey(key);
    setObjectActionVisible(true);

    const x = e.clientX;
    const y = e.clientY;

    setObjectionClickPos({ x, y });
    console.log("false");
  };

  const handleObject3dPointerMissed = () => {
    setObjectActionVisible(false);
    console.log("false");
  };

  const handleItemInBottomMenuClick = ({ code }: any) => {
    setObjectList((objectList) => [
      ...objectList,
      {
        key: uuidv4(),
        code,
      },
    ]);
  };

  useEffect(() => {
    OfficeDetailProxy({ id: officeId })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsOwner(res?.data?.office?.createdBy?.id === userInfo.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [officeId, userInfo.id]);

  return (
    <>
      <Canvas
        shadows={{ enabled: true, autoUpdate: true }}
        camera={{ position: [0, 5, 5], rotation: [45, 0, 0] }}
        style={{
          height: "100vh",
          background: "#577BC1",
          position: "fixed",
          top: 0,
          left: 0,
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
          <Physics gravity={[0, 0, 0]}>
            <Debug>
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
              {!isCustomizing && (
                <Character
                  hair={character.hairStyle}
                  eyes={character.eyeStyle}
                  startPosition={[0, 3, 2]}
                  scale={[2, 2, 2]}
                  orbitRef={orbitRef}
                  movable
                  volume={volume}
                  currentEmoji={characterEmoji}
                  currentGesture={characterGesture}
                />
              )}

              {/* <Stats className="stats" /> */}
              {objectActionVisible && isCustomizing ? (
                <CustomTransformControl
                  object={selectedObject}
                  orbit={orbitRef}
                />
              ) : null}
            </Debug>
          </Physics>
        </Suspense>
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: open !== "" ? "46rem" : "6rem",
          right: 0,
          width: "100%",
          height: "100%",
          textAlign: "left",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {!isCustomizing && (
                    <>
                        <div
                            aria-label="interactionMenu"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '0.5rem 1rem',
                                alignItems: 'flex-start',
                                position: 'absolute',
                                zIndex: '999999',
                                pointerEvents: 'auto',
                            }}
                        >
                            <Button
                                onClick={() => setShowInteractMenu((value) => !value)}
                                type="button"
                                variant="outlined"
                                className="menu-custom"
                            >
                                <FaList style={{width: '1.5rem', height: '1.5rem'}}/>
                            </Button>
                            {showInteractMenu && (
                                <InteractionMenu 
                                    onGestureClick={(value: number) => setCharacterGesture({ idx: value})}
                                    onEmojiClick={(value: number) => setCharacterEmoji({idx: value})} />
                            )}
                        </div>
                    </>
                )}
        {isCustomizing ? (
          <>
            {objectActionVisible && (
              <div
                aria-label="actionContainer"
                style={{ pointerEvents: "none" }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: `${object3dClickPos.x}px`,
                    top: `${object3dClickPos.y - 10}px`,
                    marginLeft: "10rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    pointerEvents: "auto",
                  }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    className="menu-custom"
                    onClick={handleButtonDeleteClick}
                  >
                    <FaTrash style={{ width: "1.5rem", height: "1.5rem" }} />
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    className="menu-custom"
                    onClick={handleButtonRotateLeftClick}
                  >
                    <BiRotateLeft
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    className="menu-custom"
                    onClick={handleButtonRotateRightClick}
                  >
                    <BiRotateRight
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </Button>
                </div>
              </div>
            )}

            <div aria-label="bottomMenu" style={{ pointerEvents: "auto" }}>

              <EditOffice
                itemGroups={itemGroups}
                onItemClick={handleItemInBottomMenuClick}
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="office-detail__group-btn">
        {isOwner ? (
          <div className="office-detail__view">
            <AiFillSetting
              className="office-detail__edit-icon"
              onClick={() => {
                setIsCustomizing(!isCustomizing);
              }}
            />
          </div>
        ) : null}
        <div className="office-detail__view">
          <AiOutlineInfoCircle
            className="office-detail__edit-icon"
            onClick={() => {
              setIsShowDetailForm(true);
            }}
          />
        </div>
      </div>

      {isShowDetailForm ? (
        <OfficeDetailForm
          onClose={() => {
            setIsShowDetailForm(false);
          }}
          id={officeId}
          isOwner={isOwner}
        />
      ) : null}
    </>
  );
};

export default WorkspaceCustom;
