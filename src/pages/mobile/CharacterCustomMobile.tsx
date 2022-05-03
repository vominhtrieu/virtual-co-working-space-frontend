import {OrbitControls, Stats} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Suspense, useContext, useEffect} from "react";
import BottomMenu from "../../components/Controls/BottomMenu";
import Box from "../../components/Models/Box";
import CharacterContext from "../../context/CharacterContext";
import DisplayCharacter from "../../components/Models/DisplayCharacter";

const itemGroups = [
    {
        groupName: "Skin Color",
        items: [
            {code: "Yellow", type: "color", hex: "#F2CCB7"},
            {code: "Black", type: "color", hex: "#D19477"},
            {code: "White", type: "color", hex: "#FEE3D4"},
        ],
    },
    {
        groupName: "Hair Style",
        items: [
            {code: "Hair1", type: "image", url: "./images/Hair1.png"},
            {code: "Hair2", type: "image", url: "./images/Hair2.png"},
        ],
    },
    {
        groupName: "Hair Color",
        items: [
            {code: "Orange", type: "color", hex: "#F5AA2E"},
            {code: "White", type: "color", hex: "#FFFFFF"},
            {code: "Black", type: "color", hex: "#000000"},
        ],
    },
    {
        groupName: "Eyes Style",
        items: [
            {code: "Eyes1", type: "image", url: "./images/Eyes1.png"},
            {code: "Eyes2", type: "image", url: "./images/Eyes2.png"},
        ],
    },
    {
        groupName: "Shirt Color",
        items: [
            {code: "Orange", type: "color", hex: "#F5AA2E"},
            {code: "White", type: "color", hex: "#FFFFFF"},
            {code: "Black", type: "color", hex: "#000000"},
        ],
    },
    {
        groupName: "Pant Color",
        items: [
            {code: "Orange", type: "color", hex: "#F5AA2E"},
            {code: "White", type: "color", hex: "#FFFFFF"},
            {code: "Black", type: "color", hex: "#000000"},
        ],
    },
    {
        groupName: "Shoe Color",
        items: [
            {code: "Orange", type: "color", hex: "#F5AA2E"},
            {code: "White", type: "color", hex: "#FFFFFF"},
            {code: "Black", type: "color", hex: "#000000"},
        ],
    },
];

const CharacterCustomMobile = () => {
    const character = useContext(CharacterContext);

    useEffect(() => {
        const webview = (window as any).ReactNativeWebView;
        if (webview && webview.postMessage)
            webview.postMessage("Alo");
    }, []);

    const handleBottomMenuItemClick = ({code}: any) => {
        switch (code) {
            case "Hair1":
                character.changeCharacter({...character, hairStyle: 1});
                break;
            case "Hair2":
                character.changeCharacter({...character, hairStyle: 2});
                break;
            case "Eyes1":
                character.changeCharacter({...character, eyeStyle: 1});
                break;
            case "Eyes2":
                character.changeCharacter({...character, eyeStyle: 2});
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Canvas
                shadows={{enabled: true, autoUpdate: true}}
                camera={{position: [0, 2, 5], zoom: 2.2}}
                style={{
                    height: "100vh",
                    background: "#577BC1",
                    position: "fixed",
                }}
            >
                <Stats />
                <OrbitControls
                    addEventListener={undefined}
                    hasEventListener={undefined}
                    removeEventListener={undefined}
                    dispatchEvent={undefined}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
                <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45}/>
                <ambientLight/>
                <Suspense fallback={<Box/>}>
                    <DisplayCharacter
                        hair={1}
                        eyes={1}
                        startPosition={[0, -1, 0]}
                        movable={false}
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
                <BottomMenu itemGroups={itemGroups} onItemClick={handleBottomMenuItemClick}/>
            </div>
        </>
    );
};

export default CharacterCustomMobile;
