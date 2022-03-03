import React from "react";
import { CharacterInterface } from "@/types/character";

export default React.createContext({
  hairStyle: 1,
  eyeStyle: 1,
  changeCharacter: (character: CharacterInterface) => {},
});
