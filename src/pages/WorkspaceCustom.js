import { Suspense } from "react/cjs/react.production.min";
import { OrbitControls } from "@react-three/drei";
import Box from "../components/Models/Box";
import Chair from "../components/Models/Chair";
import { Canvas } from "@react-three/fiber";
import Button from "../components/Button";
import * as THREE from "three";
import { useRef} from "react";
import { RightArrow } from "../assets/icons/RightArrow";
import { LeftArrow } from "../assets/icons/LeftArrow";

import './styles.css'
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

const CustomButtonGroup = ({ next, previous, carouselState }) => {
  // const { totalItems, currentSlide } = carouselState;
  return (
    <div className="custom-button-group">
      <Button className="btn-prev-group" onClick={() => previous()}
        style={{ background: "transparent", padding: 0 }} >
        <LeftArrow width="10" />
      </Button>
      <Button className="btn-next-group" onClick={() => next()}
        style={{ background: "transparent", padding: 0 }}>
        <RightArrow width="10" />
      </Button>
    </div>
  );
};


const WorkspaceCustom = (props) => {
  const objectRef = useRef();
  const sceneRef = useRef();

  const handleButtonRotateClick = (e) => {
    objectRef.current.rotation.y += Math.PI / 2;
  };

  const handleButtonDeleteClick = (e) => {
    sceneRef.current.remove(objectRef);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const items = [Chair, Chair, Chair, Chair, Chair];

  return (
    <>
      <Canvas
        ref={sceneRef}
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
            <Button onClick={handleButtonDeleteClick}>Delete</Button>
            <Button onClick={handleButtonRotateClick}>
              Rotate by 90 degree
            </Button>
          </div>
        </div>

        <div aria-label="bottomMenu">
          <div style={{ display: "flex", gap: 7, justifyContent: "center" }}>
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
            <div className="edit">
            <Carousel
                  responsive={responsive}
                  arrows={false}
                  customButtonGroup={<CustomButtonGroup />}>
                  {items.map((Item, index) => (
                    <Button style={{ padding: 0, width: "6rem", height: "6rem" }} key={index} className="edit-item">
                      <Canvas>
                        <ambientLight intensity={0.5} />
                        <Suspense fallback={<>...</>}>
                          <Item position={[0, -1, 0]} />
                        </Suspense>
                      </Canvas>
                    </Button>
                  ))}
                </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspaceCustom;
