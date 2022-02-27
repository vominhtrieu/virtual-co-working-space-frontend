import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterContext from "./context/CharacterContext";
import CharacterCustom from "./pages/CharacterCustom";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import { CharacterInterface } from "./types/character";
import "./App.less";

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
          <Route path='/login' element={<Login/>}></Route>
            <Route path='/' element={<Home />} />
            <Route path='/character' element={<CharacterCustom />}></Route>
            <Route path='/workspace' element={<Workspace />}></Route>
          </Routes>
        </Router>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
