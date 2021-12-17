import { Suspense } from "react/cjs/react.production.min";
import { OrbitControls } from "@react-three/drei";
import Box from "../components/Models/Box";
import Chair from "../components/Models/Chair";
import { Canvas } from "@react-three/fiber";
import Button from "../components/Button";
import * as THREE from "three";
import { useRef } from "react";
import { RightArrow } from "../assets/icons/RightArrow";
import { LeftArrow } from "../assets/icons/LeftArrow";

const WorkspaceCustom = (props) => {
  const objectRef = useRef();

  const handleRotate = (e) => {
    objectRef.current.rotation.y += Math.PI / 2;
  };

  return (
    <>
      <Canvas
        shadows={{ enabled: true, autoUpdate: true }}
        camera={{ position: [0, 20, 0], rotation: [90, 100, 0.5] }}
        style={{
          height: "100vh",
          background: "#577BC1",
          position: "fixed",
        }}
      >
        <OrbitControls
          maxZoom={10}
          maxDistance={10}
          minDistance={7}
          minZoom={1}
          enablePan="false"
          enableZoom="false"
        />
        <ambientLight />

        <primitive object={new THREE.AxesHelper(10)} />

        <Suspense fallback={<Box />}>
          <Chair
            ref={objectRef}
            castShadow={true}
            position={[0, -2, 0]}
            rotation={[0, 0, 0]}
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
          }}
        >
          <Button>Menu</Button>
          <div>
            <Button style={{ marginRight: "5px" }}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>

        <div aria-label="actionContainer">
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "30%",
              marginLeft: "10rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Button>Delete</Button>
            <Button onClick={handleRotate}>Rotate by 90 degree</Button>
          </div>
        </div>

        <div aria-label="bottomMenu">
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
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
              margin: "0.5rem 0 2rem",
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
    </>
  );
};

export default WorkspaceCustom;
