import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
import Box from "../components/models/Box";
import CharacterContext from "../context/CharacterContext";
import DisplayCharacter from "../components/models/DisplayCharacter";
import CharacterCustomForm from "../components/character-custom-form";

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
                    position: "fixed",
                    top: 0,
                    left: 0,
                }}
            >
                <OrbitControls
                    addEventListener={undefined}
                    hasEventListener={undefined}
                    removeEventListener={undefined}
                    dispatchEvent={undefined}
                    enablePan={false}
                    minPolarAngle={Math.PI/2}
                    maxPolarAngle={Math.PI/2}
                />
                <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45} />
                <ambientLight />
                <Suspense fallback={<Box />}>
                    <DisplayCharacter
                        appearance={character}
                        startPosition={[0, -0.5, 0]}
                        movable={false}
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
                        marginTop:"1rem",
                        marginRight:"3rem",
                        alignItems: "center",
                        pointerEvents: "auto",

                    }}
                >
                    <CharacterCustomForm itemGroups={itemGroups} onItemClick={handleBottomMenuItemClick} />
                </div>
            </div>
        </>
    );
};

export default CharacterCustom;
