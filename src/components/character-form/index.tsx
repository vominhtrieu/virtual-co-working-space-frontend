import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "../../components/models/Box";
import DisplayCharacter from "../../components/models/character/DisplayCharacter";
import CharacterContext from "../../context/CharacterContext";
import Button from "../UI/button";
import Popup from "../UI/popup";
import RadioButton from "../UI/radio-button";
import { CharacterFormProps } from "./types";
import { AppearanceGroups } from "../../helpers/constants";

const itemGroups = AppearanceGroups;

const CharacterForm = (props: CharacterFormProps) => {
  const [position, setPosition] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>(Array<number>(itemGroups.length).fill(0, 0, itemGroups.length));

  const handleButtonLeft = () => {
    if (position <= 0) return
    if (position >= 1) setPosition(position - 1)
  }

  const handleButtonRight = () => {
    if (position >= itemGroups.length - 1) return;
    if (position < itemGroups.length - 1) setPosition(position + 1)
  }

  const onItemClick = (groupId, itemId) => {
    character.changeAppearance(groupId, itemId)
  }

  const { t } = useTranslation();

  const { onClose } = props;
  const character = useContext(CharacterContext);

  return (
    <Popup
      onClose={onClose}
      title={t("pages.office.editCharacter.title")}
      type="dark"
    >
      <div className="character-custom__container">
        <div className="character-custom__container-left">
          <Canvas
            shadows={{ enabled: true, autoUpdate: true }}
            camera={{ position: [0, 2, 5], zoom: 4 }}
            style={{
              height: "100%",
              background: "transparent",
              width: "100%",
            }}
          >
            <OrbitControls
              addEventListener={undefined}
              hasEventListener={undefined}
              removeEventListener={undefined}
              dispatchEvent={undefined}
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
            <directionalLight
              shadow={true}
              position={[0, 10, 10]}
              rotateX={45}
            />
            <ambientLight />
            <Suspense fallback={<Box />}>
              <DisplayCharacter
                appearance={character}
                startPosition={[0, -1, 0]}
                movable={false}
              />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="character-custom__container-right">
          <div className="character-custom__content">
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 5,
            }}>
              <button onClick={handleButtonLeft}
                style={{
                  padding: 0, background: "none", border: "none", margin: 0,
                  display: "flex", alignItems: "center",
                  justifyContent: "flex-end",
                  width: 100,
                  outline: "none"
                }}>
                {position > 0 &&
                  <h3 style={{
                    margin: 0,
                    textAlign: "right",
                    opacity: 0.8
                  }}>{itemGroups[position - 1].groupName}</h3>
                }
              </button>
              <h2 style={{ margin: 0, marginLeft: 5, marginRight: 5, width: 120, textAlign: "center" }}>
                {itemGroups[position].groupName}
              </h2>
              <button onClick={handleButtonRight}
                style={{
                  padding: 0, background: "none", border: "none", margin: 0,
                  display: "flex", alignItems: "center",
                  width: 100,
                  outline: "none"
                }}>
                {position < itemGroups.length - 1 &&
                  <h3 style={{ margin: 0, opacity: 0.8 }}>{itemGroups[position + 1].groupName}</h3>
                }
              </button>
            </div>

            <div className="character-custom__list">
              <div className="character-custom__item-list">
                {itemGroups[position].items &&
                  itemGroups[position].items.map((item: any, index: number) => {
                    return (
                      <Button key={item.code}
                        type="button"
                        variant="outlined"
                        className="menu-custom"
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: 5,
                          marginLeft: 5,
                          padding: 0,
                          background: item.type === "color" ? item.hex : "white",
                          borderColor: selectedIndexes[position] === index ? "#0777E8" : "#333333",
                          borderWidth: 4,
                          borderRadius: 25,
                          overflow: "hidden",
                          position: "relative",
                        }}
                        onClick={() => {
                          setSelectedIndexes((indexes: number[]) => {
                            let temp = [...indexes];
                            temp[position] = index;
                            return temp;
                          });
                          onItemClick(position, index);
                        }}
                      >
                        {item.type === "image" && <img
                          alt="models"
                          src={item.url}
                          className="character-custom__item-img"
                        />}
                      </Button>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default CharacterForm;
