import {OrbitControls, Stats} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Suspense, useContext, useEffect} from "react";
import CharacterCustomMobileMenu from "../../components/Controls/CharacterCustomMobileMenu";
import Box from "../../components/Models/Box";
import CharacterContext from "../../context/CharacterContext";
import DisplayCharacter from "../../components/Models/DisplayCharacter";
import {AppearanceGroups} from "../../helpers/constants";

const CharacterCustomMobile = () => {
    const character = useContext(CharacterContext);

    useEffect(() => {
        const webview = (window as any).ReactNativeWebView;
        if (webview && webview.postMessage)
            webview.postMessage("Alo");
    }, []);

    const handleBottomMenuItemClick = ({groupId, itemIdx}: any) => {
        switch (groupId) {
            case 0:
                character.changeCharacter({...character, skinColor: itemIdx});
                break;
            case 1:
                character.changeCharacter({...character, hairStyle: itemIdx});
                break;
            case 2:
                character.changeCharacter({...character, hairColor: itemIdx});
                break;
            case 3:
                character.changeCharacter({...character, eyeStyle: itemIdx});
                break;
            case 4:
                character.changeCharacter({...character, shirtColor: itemIdx});
                break;
            case 5:
                character.changeCharacter({...character, pantColor: itemIdx});
                break;
            case 6:
                character.changeCharacter({...character, shoeColor: itemIdx});
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
                <Stats/>
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
                        startPosition={[0, -1, 0]}
                        appearance={character}
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
                <CharacterCustomMobileMenu itemGroups={AppearanceGroups} onItemClick={handleBottomMenuItemClick}/>
            </div>
        </>
    );
};

export default CharacterCustomMobile;
