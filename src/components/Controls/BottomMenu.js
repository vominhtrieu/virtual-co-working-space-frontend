import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ObjectProperties from "../Models/ObjectProperties";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 10,
    },
    desktop: {
        breakpoint: { max: 3000, min: 992 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 992, min: 576 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 576, min: 0 },
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
                        width: 100,
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
                    textAlign: "none",
                }}
            >
                <div className="sub-bottom-menu">
                    <Carousel responsive={responsive} arrows={false}>
                        {itemGroups[position].items &&
                            itemGroups[position].items.map((item, index) => (
                                <Button
                                    onClick={(e) => onItemClick(item)}
                                    style={{ padding: 0, width: "6em", height: "6em" }}
                                    key={item.code}
                                    className="edit-item"
                                >
                                    {/* <Canvas camera={{ position: [5, 30, 5]}}>
                    <ambientLight intensity={1} />
                    <Suspense fallback={<>...</>}>
                      <mesh scale={[10, 10, 10]} position={[0, -1.6, 1]}>
                        {ObjectProperties[item.code]}
                      </mesh>
                    </Suspense>
                  </Canvas> */}
                                    <img alt="timer" src={item.url} style={{ width: "6em", height: "6em" }} />
                                </Button>
                            ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
}
