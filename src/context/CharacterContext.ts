import React from "react";
import { CharacterInterface } from "../types/character";

export const DefaultAppearance = {
  skinColor: 0,
  hairColor: 0,
  hairStyle: 0,
  eyeStyle: 0,
  shirtColor: 0,
  pantColor: 0,
  shoeColor: 0,

  changeCharacter: (character: CharacterInterface) => {},
  changeAppearance: (groupId: number, itemIdx: number) => {},
};

export default React.createContext({
  ...DefaultAppearance,
});
