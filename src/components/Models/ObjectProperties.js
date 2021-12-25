import React from "react";
import Chair from "./Chair";
import IndoorTree from "./IndoorTree";
import ModernTable from "./ModernTable";
import SofaChair from "./SofaChair";
import Hair from "./Hair";
import Eye from "./Eye";

const ObjectProperties = {
    Chair: <Chair />,
    IndoorTree: <IndoorTree />,
    ModernTable: <ModernTable />,
    SofaChair: <SofaChair />,
    Hair1: <Hair hairStyle={1} />,
    Hair2: <Hair hairStyle={2} />,
    Eyes1: <Eye eyeStyle={1} />,
    Eye2: <Eye eyeStyle={2} />,
};

export default ObjectProperties;
