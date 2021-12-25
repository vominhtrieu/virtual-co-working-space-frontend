import { useContext } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Character from "../components/Models/Character";
import Box from "../components/Models/Box";
import Button from "../components/Button";
import BottomMenu from "../components/Controls/BottomMenu";
import CharacterContext from "../context/CharacterContext";

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
    const character = useContext(CharacterContext);
    const navigate = useNavigate();

    const handleBottomMenuItemClick = ({ code }) => {
      console.log("bruh");
        switch (code) {
            case "Hair1":
                character.changeCharacter((character) => ({ ...character, hairStyle: 1 }));
                break;
            case "Hair2":
                character.changeCharacter((character) => ({ ...character, hairStyle: 2 }));
                break;
            case "Eyes1":
                character.changeCharacter((character) => ({ ...character, eyeStyle: 1 }));
                break;
            case "Eyes2":
                character.changeCharacter((character) => ({ ...character, eyeStyle: 2 }));
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
                    position: "fixed",
                }}
            >
                <OrbitControls />
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
                    <Button onClick={() => navigate("/workspace")}>Save</Button>
                </div>
                <div style={{ height: "100%" }}></div>
                <BottomMenu itemGroups={itemGroups} onItemClick={handleBottomMenuItemClick} />
            </div>
        </>
    );
};

export default CharacterCustom;
