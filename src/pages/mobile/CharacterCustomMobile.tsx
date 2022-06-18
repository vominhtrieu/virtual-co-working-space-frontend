import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useEffect } from "react";
import CharacterCustomMobileMenu from "../../components/controls/CharacterCustomMobileMenu";
import Box from "../../components/models/Box";
import CharacterContext from "../../context/CharacterContext";
import DisplayCharacter from "../../components/models/character/DisplayCharacter";
import { AppearanceGroups } from "../../helpers/constants";

const CharacterCustomMobile = () => {
  const character = useContext(CharacterContext);

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
        {process.env.REACT_APP_DEBUG === "1" && <Stats />}
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45} />
        <ambientLight />
        <Suspense fallback={<Box />}>
          <DisplayCharacter startPosition={[0, -1, 0]} appearance={character} />
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
        <CharacterCustomMobileMenu
          itemGroups={AppearanceGroups}
          onItemClick={character.changeAppearance}
        />
      </div>
    </>
  );
};

export default CharacterCustomMobile;
