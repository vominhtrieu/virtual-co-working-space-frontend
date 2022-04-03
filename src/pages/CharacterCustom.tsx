import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BottomMenu from "../components/Controls/BottomMenu";
import Box from "../components/Models/Box";
import Character from "../components/Models/Character";
import Button from "../components/UI/button";
import CharacterContext from "../context/CharacterContext";
import { useSelector } from "react-redux";

const itemGroups = [
  {
    groupName: "Hair",
    items: [
      { code: "Hair1", url: "./images/Hair1.png" },
      { code: "Hair2", url: "./images/Hair2.png" },
    ],
  },
  {
    groupName: "Eyes",
    items: [
      { code: "Eyes1", url: "./images/Eyes1.png" },
      { code: "Eyes2", url: "./images/Eyes2.png" },
    ],
  },
];

const CharacterCustom = () => {
  const { open } = useSelector((state: any) => state.sidebar);
  const character = useContext(CharacterContext);
  const navigate = useNavigate();

  const handleBottomMenuItemClick = ({ code }: any) => {
    switch (code) {
      case "Hair1":
        character.changeCharacter({ ...character, hairStyle: 1 });
        break;
      case "Hair2":
        character.changeCharacter({ ...character, hairStyle: 2 });
        break;
      case "Eyes1":
        character.changeCharacter({ ...character, eyeStyle: 1 });
        break;
      case "Eyes2":
        character.changeCharacter({ ...character, eyeStyle: 2 });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Canvas
        shadows={{ enabled: true, autoUpdate: true }}
        camera={{ position: [0, 2, 5], zoom: 2.2 }}
        style={{
          height: "100vh",
          background: "#577BC1",
          position: "absolute",
          top: 0,
          left: open !== "" ? "46rem" : "6rem",
        }}
      >
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}/>
        <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45} />
        <ambientLight />
        <Suspense fallback={<Box />}>
          <Character
            hair={character.hairStyle}
            eyes={character.eyeStyle}
            startPosition={[0, -0.5, 0]}
            moveable={false}
          />
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
        <div
          aria-label='topMenu'
          style={{
            position: "fixed", 
              right: "1.5rem", 
              top: "1rem", 
              pointerEvents:"auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
          }}
        >
          <Button type="button" variant="outlined" className="menu-custom" onClick={() => navigate("/workspace")}>Save</Button>

          <div />
        </div>
        <div style={{ height: "100%", pointerEvents: "auto" }}>
          <BottomMenu
            itemGroups={itemGroups}
            onItemClick={handleBottomMenuItemClick}
          />
        </div>

      </div>
    </>
  );
};

export default CharacterCustom;
