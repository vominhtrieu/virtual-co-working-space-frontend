import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Character from "../components/Models/Character";
import Box from "../components/Models/Box";
import Button from "../components/Button";
import BottomMenu from "../components/Controls/BottomMenu";

const itemGroups = [
  { groupName: "Hair", items: [{ code: "Hair1",url:"./images/SofaChair.png" }, {code: "Hair2",url:"./images/SofaChair.png"}] },
  { groupName: "Eyes", items: [{ code: "Eyes1",url:"./images/SofaChair.png" }, {code: "Eyes2",url:"./images/SofaChair.png"}] },
];

const CharacterCustom = () => {
  const [hairStyle, setHaiStyle] = useState(1);
  const [eyeStyle, setEyeStyle] = useState(1);

  const handleBottomMenuItemClick = ({code}) => {
    switch (code) {
      case "Hair1":
        setHaiStyle(1);
        break;
      case "Hair2":
        setHaiStyle(2);
        break;
      case "Eyes1":
        setEyeStyle(1);
        break;
      case "Eyes2":
        setEyeStyle(2);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Canvas
        shadows={{ enabled: true, autoUpdate: true }}
        camera={{ position: [0, 2, 5], zoom: 2.2 }}
        style={{
          height: "100vh",
          background: "#577BC1",
          position: "fixed",
        }}
      >
        <OrbitControls />
        <ambientLight />
        <Suspense fallback={<Box />}>
          <Character hair={hairStyle} eyes={eyeStyle} position={[0, -0.5, 0]} />
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
          <div />
          <Button>Save</Button>
        </div>
        <div style={{height: "100%"}}></div>
        <BottomMenu itemGroups={itemGroups} onItemClick={handleBottomMenuItemClick} />
      </div>
    </>
  );
};

export default CharacterCustom;
