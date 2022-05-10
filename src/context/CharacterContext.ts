import React from "react";
import {CharacterInterface} from "../types/character";

export default React.createContext({
    skinColor: 0,
    hairColor: 0,
    hairStyle: 0,
    eyeStyle: 0,
    changeCharacter: (character: CharacterInterface) => {
    },
});
