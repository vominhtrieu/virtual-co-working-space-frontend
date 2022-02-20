import Chair from "./Chair";
import CoffeeTable from "./CoffeeTable";
import Eye from "./Eye";
import Hair from "./Hair";
import IndoorTree from "./IndoorTree";
import Keyboard from "./Keyboard";
import ModernTable from "./ModernTable";
import SofaChair from "./SofaChair";
import YellowChair from "./YellowChair";

const ObjectProperties = {
  Chair: <Chair />,
  IndoorTree: <IndoorTree />,
  ModernTable: <ModernTable />,
  SofaChair: <SofaChair />,
  Hair1: <Hair hairStyle={1} />,
  Hair2: <Hair hairStyle={2} />,
  Eyes1: <Eye eyeStyle={1} />,
  Eye2: <Eye eyeStyle={2} />,
  Keyboard: <Keyboard />,
  YellowChair: <YellowChair />,
  CoffeeTable: <CoffeeTable />,
};

export default ObjectProperties;
