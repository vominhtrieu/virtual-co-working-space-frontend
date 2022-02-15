import { CharacterInterface } from "./../types/character";
import React from "react";

export default React.createContext({
  hairStyle: 1,
  eyeStyle: 1,
  changeCharacter: (character: CharacterInterface) => {},
});
