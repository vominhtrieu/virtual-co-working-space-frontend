import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IconLanguages from "./components/icon-lang";
import CharacterContext from "./context/CharacterContext";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CharacterCustom from "./pages/CharacterCustom";
import Home from "./pages/home/Home";
import Workspace from "./pages/Workspace";
import "./scss/main.scss";
import { CharacterInterface } from "./types/character";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        changeCharacter: (character: CharacterInterface) =>
          setCharacter(character),
      }}
    >
      <ToastContainer />
      <IconLanguages />
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/character' element={<CharacterCustom />} />
            <Route path='/workspace' element={<Workspace />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
          </Routes>
        </Router>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
