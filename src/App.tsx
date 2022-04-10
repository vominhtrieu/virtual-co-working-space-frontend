import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconLanguages from "./components/icon-lang";
import Sidebar from "./components/layouts/sidebar";
import CharacterContext from "./context/CharacterContext";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CharacterCustom from "./pages/CharacterCustom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound";
import Workspace from "./pages/officeDetail/Workspace";
import Active from "./pages/auth/active";
import "./scss/main.scss";
import { CharacterInterface } from "./types/character";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";

function App() {
  const [character, setCharacter] = useState<CharacterInterface>({
    hairStyle: 1,
    eyeStyle: 1,
  });

  const { isAuthenticated } = useSelector((state: any) => state.auth);

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
          {isAuthenticated ? <Sidebar /> : null}
          {isAuthenticated ? (
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/character' element={<CharacterCustom />} />
              <Route path='/office/:id' element={<Workspace />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/auth/activate/:token' element={<Active />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/auth/login' element={<Login />} />
              <Route path='/auth/register' element={<Register />} />
              <Route path='/auth/forgot' element={<ForgotPassword />} />
              <Route path='/auth/reset/:token' element={<ResetPassword />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          )}
        </Router>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
