// import ObjectProperties from "../Models/ObjectProperties";
import "./styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Button from "../UI/button";

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

export default function BottomMenu({ itemGroups, onItemClick }: any) {
  const [position, setPosition] = useState(0);

  const handleButtonLeft = () => {
    if (position <= 0) return;
    if (position >= 1) setPosition(position - 1);
  };

  const handleButtonRight = () => {
    if (position >= itemGroups.length - 1) return;
    if (position < itemGroups.length - 1) setPosition(position + 1);
  };

  return (
    <div style={{ position: "fixed", bottom: 50, width: "100vw" }}>
      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
        <Button onClick={handleButtonLeft}>
          <FaAngleLeft style={{ height: "1.5rem" }} />
        </Button>

        <Button>{itemGroups[position].groupName}</Button>

        <Button onClick={handleButtonRight}>
          <FaAngleRight style={{ height: "1.5rem" }} />
        </Button>
      </div>

      <div
        style={{
          gap: 10,
          justifyContent: "center",
          margin: "0.5rem 0 1.5rem",
        }}
      >
        <div className='sub-bottom-menu'>
          <Carousel responsive={responsive} arrows={false}>
            {itemGroups[position].items &&
              itemGroups[position].items.map((item: any) => (
                <Button onClick={() => onItemClick(item)} key={item.code}>
                  <img
                    alt='models'
                    src={item.url}
                    style={{
                      width: "6em",
                      height: "6em",
                      borderRadius: "10px",
                    }}
                  />
                </Button>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
