import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import CharacterCustom from "./pages/CharacterCustom";
import Workspace from "./pages/Workspace";
import CharacterContext from "./context/CharacterContext";
import { CharacterInterface } from "./types/character";

function App() {
  const [character, setCharacter] = useState<CharacterInterface>({
    hairStyle: 1,
    eyeStyle: 1,
  });

  return (
    <CharacterContext.Provider
      value={{
        hairStyle: character.hairStyle,
        eyeStyle: character.eyeStyle,
        changeCharacter: (character: CharacterInterface) => setCharacter(character),
      }}
    >
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/character' />} />
            <Route path='/character' element={<CharacterCustom />}></Route>
            <Route path='/workspace' element={<Workspace />}></Route>
          </Routes>
        </Router>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
