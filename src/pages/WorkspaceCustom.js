import { Suspense } from "react/cjs/react.production.min";
import { OrbitControls } from "@react-three/drei";
import Box from "../components/Models/Box";
import Chair from "../components/Models/Chair";
import { Canvas } from "@react-three/fiber";
import Button from "../components/Button";
import * as THREE from "three";
import { useRef, useState } from "react";
import { RightArrow } from "../assets/icons/RightArrow";
import { LeftArrow } from "../assets/icons/LeftArrow";
import Office from "../components/Models/Office";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const WorkspaceCustom = (props) => {
  const objectRef = useRef();
  const canvasRef = useRef();

  const [object3dVisible, setObject3dVisible] = useState(true);
  const [objectActionVisible, setObjectActionVisible] = useState(false);
  const [object3dClickPos, setObjectionClickPos] = useState({ x: 0, y: 0 });

  const handleButtonRotateClick = (e) => {
    objectRef.current.rotation.y += Math.PI / 2;
  };

  const handleButtonDeleteClick = (e) => {
    setObject3dVisible(false);
    setObjectActionVisible(false);
  };

  const handleObject3dClick = (e) => {
    setObjectActionVisible(true);

    const x = e.clientX;
    const y = e.clientY;

    setObjectionClickPos({ x, y });
  };

  const handleObject3dPointerMissed = (e) => {
    setObjectActionVisible(false);
  };

  return (
    <>
      <Canvas
        ref={canvasRef}
        shadows={{ enabled: true, autoUpdate: true }}
        camera={{ position: [0, 5, 5], rotation: [45, 0, 0] }}
        style={{
          height: "100vh",
          background: "#577BC1",
          position: "fixed",
        }}
      >
        <OrbitControls
          maxZoom={10}
          maxDistance={15}
          minDistance={8}
          minZoom={1}
          enablePan="false"
          enableZoom="false"
          maxPolarAngle={((90 - 10) / 180) * Math.PI}
        />
        <ambientLight />

        <Suspense fallback={<Box />}>
          <Office />
          {object3dVisible && (
            <Chair
              onClick={handleObject3dClick}
              onPointerMissed={handleObject3dPointerMissed}
              ref={objectRef}
              castShadow={true}
              position={[0, 1, 0]}
              rotation={[0, 0, 0]}
            />
          )}
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
          <Button>
            <FontAwesomeIcon
              style={{ width: "1.5rem", height: "1.5rem" }}
              icon={faList}
            />
          </Button>
          <div>
            <Button style={{ marginRight: "5px" }}>Cancel</Button>

            <Button>Save</Button>
          </div>
        </div>

        {objectActionVisible && (
          <div>
            <div aria-label="actionContainer">
              <div
                style={{
                  position: "absolute",
                  left: `${object3dClickPos.x}px`,
                  top: `${object3dClickPos.y - 10}px`,
                  marginLeft: "10rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Button onClick={handleButtonDeleteClick}>
                  {" "}
                  <FontAwesomeIcon
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    icon={faTrash}
                  />
                </Button>

                <Button onClick={handleButtonRotateClick}>
                  <FontAwesomeIcon
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    icon={faRotateRight}
                  />
                </Button>
              </div>
            </div>

            <div aria-label="bottomMenu">
              <div
                style={{ display: "flex", gap: 8, justifyContent: "center" }}
              >
                <Button style={{ background: "transparent", padding: 0 }}>
                  <LeftArrow width="10" />
                </Button>

                <Button
                  style={{
                    backgroundColor: "#000957",
                    color: "#ffffff",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  Chair
                </Button>

                <Button style={{ background: "transparent", padding: 0 }}>
                  <RightArrow width="10" />
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  margin: "0.5rem 0 1.5rem",
                }}
              >
                <Button style={{ padding: 0, width: "4rem", height: "4rem" }}>
                  ABC
                </Button>
                <Button style={{ padding: 0, width: "4rem", height: "4rem" }}>
                  ABC
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkspaceCustom;
