import { PropsInterface } from "./types";
import NotyItem from "./noty-item";
import { Affix } from "antd";
import { useState } from "react";

const NotyList = (props: PropsInterface) => {
  const { isOpen, onToggled, onClose } = props;
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div className="scrollable-container" ref={setContainer}>
      <div className="background">
        <Affix target={() => container}>
          <NotyItem />
          <NotyItem />      
          <NotyItem />
          <NotyItem />
        </Affix>
      </div>
    </div>
  );
};

export default NotyList;
