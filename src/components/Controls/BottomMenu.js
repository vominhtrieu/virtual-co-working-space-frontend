import { Suspense } from "react/cjs/react.production.min";
import { Canvas } from "@react-three/fiber";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ObjectProperties from "../Models/ObjectProperties";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import ObjectProperties from "../Models/ObjectProperties";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function BottomMenu({ itemGroups, onItemClick }) {
  const [position, setPosition] = useState(0);

  const handleButtonLeft = (e) => {
    if (position <= 0) return;
    if (position >= 1) setPosition(position - 1);
  };

  const handleButtonRight = (e) => {
    if (position >= itemGroups.length - 1) return;
    if (position < itemGroups.length - 1) setPosition(position + 1);
  };

  return (
    <>
      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
        <Button
          onClick={handleButtonLeft}
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          <FontAwesomeIcon style={{ height: "1.5rem" }} icon={faAngleLeft} />
        </Button>

        <Button
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "0.5rem 0.75rem",
          }}
        >
          {itemGroups[position].groupName}
        </Button>

        <Button
          onClick={handleButtonRight}
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          <FontAwesomeIcon style={{ height: "1.5rem" }} icon={faAngleRight} />
        </Button>
      </div>

      <div
        style={{
          gap: 10,
          justifyContent: "center",
          margin: "0.5rem 0 1.5rem",
        }}
      >
        <div style={{ width: "38em", margin: "0 auto" }}>
          <Carousel responsive={responsive} arrows={false}>
            {itemGroups[position].items &&
              itemGroups[position].items.map((item, index) => (
                <Button
                  onClick={(e) => onItemClick(item)}
                  style={{ padding: 0, width: "6rem", height: "6rem" }}
                  key={item.code}
                  className="edit-item"
                >
                  <Canvas>
                    <ambientLight intensity={1} />
                    <Suspense fallback={<>...</>}>
                      <mesh scale={[1, 1, 1]} position={[0, -1.6, 1]}>
                        {ObjectProperties[item.code]}
                      </mesh>
                    </Suspense>
                  </Canvas>
                </Button>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
