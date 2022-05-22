import { OrbitControls, Stats } from "@react-three/drei";
import { Suspense, useContext, useRef } from "react";
import Box from "../models/Box";
import { Debug, Physics } from "@react-three/cannon";
import Office from "../models/Office";
import Character from "../models/Character";
import CustomTransformControl from "../controls/CustomTransformControl";
import { Canvas } from "@react-three/fiber";
import CharacterContext from "../../context/CharacterContext";
import { useAppSelector } from "../../stores";
import { volumeSelectors } from "../../stores/volume-slice";
import { Provider } from "react-redux";
import store from "../../stores";
import ItemModel from "../models/ItemModel";

export default function OfficeCanvas({
  setObjectionClickPos,
  characterGesture,
  characterEmoji,
  setSelectedObject,
  setSelectedKey,
  setObjectActionVisible,
  isCustomizing,
  objectList,
  objectActionVisible,
  selectedObject,
}) {
  const orbitRef = useRef(null);
  const character = useContext(CharacterContext);
  const volume = useAppSelector(volumeSelectors.getVolume);

  const handleObject3dClick = (e, key) => {
    let temp = e.object;
    console.log(temp);
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

  return (
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
          maxZoom={10}
          maxDistance={16}
          minDistance={16}
          minZoom={1}
          enablePan={isCustomizing}
          enableZoom={isCustomizing}
          maxPolarAngle={((90 - 10) / 180) * Math.PI}
        />
        <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45} />
        <ambientLight />
        <Stats />
        <Suspense fallback={<Box />}>
          <Physics gravity={[0, 0, 0]}>
            <Debug>
              <Office castShadow={true} />
              {objectList.map((object) => (
                <mesh
                  castShadow={true}
                  key={object.id}
                  position={[0, 0.5, 0]}
                  onClick={(e) => handleObject3dClick(e, object.key)}
                  onPointerMissed={handleObject3dPointerMissed}
                >
                  <Suspense fallback={null}>
                    <ItemModel url={object.modelPath} />
                  </Suspense>
                </mesh>
              ))}
              {!isCustomizing && (
                <Character
                  hair={character.hairStyle}
                  eyes={character.eyeStyle}
                  startPosition={[-5, 3, 2]}
                  scale={[2, 2, 2]}
                  orbitRef={orbitRef}
                  movable
                  volume={volume}
                  currentEmoji={characterEmoji}
                  currentGesture={characterGesture}
                />
              )}

              {/* <Stats className="stats" /> */}

              <CustomTransformControl
                object={selectedObject}
                orbit={orbitRef}
                visible={objectActionVisible && isCustomizing}
              />
            </Debug>
          </Physics>
        </Suspense>
      </Provider>
    </Canvas>
  );
}
