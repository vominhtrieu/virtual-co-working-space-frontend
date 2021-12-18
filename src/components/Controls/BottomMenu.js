import { Suspense } from "react/cjs/react.production.min";
import { Canvas } from "@react-three/fiber";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ObjectProperties from "../Models/ObjectProperties";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import './styles.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";

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

export default function BottomMenu({objectList,setObjectList,itemList}) {

    const [position,setPosition]=useState(0);

    const handleButtonLeft = (e) => {
        if (position<1){
            setPosition(0);
        }
        else {
            setPosition(position-1);
        }
      };
    
      const handleButtonRight = (e) => {
        if (position==itemList.length-1){
            setPosition(itemList.length-1)
        }
        else {
            setPosition(position+1);
        }
      };

    return (
        <>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                <Button onClick={handleButtonLeft} style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
                    <FontAwesomeIcon style={{ height: "1.5rem" }} icon={faAngleLeft} />
                </Button>

                <Button
                    style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "0.5rem 0.75rem",
                    }}
                >
                    {itemList[position].name}
                </Button>

                <Button onClick={handleButtonRight} style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
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
                        {itemList[position].items && itemList[position].items.map((Item, index) => (
                            <Button
                                onClick={(e) =>
                                    setObjectList([
                                        ...objectList,
                                        {
                                            key: objectList[objectList.length - 1]
                                                ? objectList[objectList.length - 1].key + 1
                                                : 0,
                                            code: "Chair",
                                        },
                                    ])
                                }
                                style={{ padding: 0, width: "6rem", height: "6rem" }}
                                key={index}
                                className="edit-item"
                            >
                                <Canvas>
                                    <ambientLight intensity={0.5} />
                                    <Suspense fallback={<>...</>}>
                                        <Item scale={[1.2, 1.3, 1.3]} position={[0, -1.6, 1]} />
                                    </Suspense>
                                </Canvas>
                            </Button>
                        ))}
                    </Carousel>
                </div>
            </div></>
    );

}