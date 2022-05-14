import React from "react";
import {CharacterInterface} from "../types/character";

export default React.createContext({
    skinColor: 0,
    hairColor: 0,
    hairStyle: 0,
    eyeStyle: 0,
    shirtColor: 0,
    pantColor: 0,
    shoeColor: 0,
    moveVector: [0, 0, 0],

    changeCharacter: (character: CharacterInterface) => {
    },
});
