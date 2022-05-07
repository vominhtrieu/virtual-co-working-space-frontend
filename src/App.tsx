import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconLanguages from "./components/icon-lang";
import Sidebar from "./components/layouts/sidebar";
import CharacterContext from "./context/CharacterContext";
import Active from "./pages/auth/active";
import ForgotPassword from "./pages/auth/forgotPassword";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ResetPassword from "./pages/auth/resetPassword";
import CharacterCustom from "./pages/CharacterCustom";
import CharacterCustomMobile from "./pages/mobile/CharacterCustomMobile";
import NotFound from "./pages/notFound";
import Workspace from "./pages/officeDetail/Workspace";
import "./scss/main.scss";
import { CharacterInterface } from "./types/character";

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
      <div className="App">
        <Router>
          {isAuthenticated ? <Sidebar /> : null}
          <Routes>
            <Route path="/webgl" element={<CharacterCustomMobile />} />
            {isAuthenticated ? (
              <>
                <Route
                  path="/"
                  element={<Navigate to="/character" replace />}
                />
                <Route path="/character" element={<CharacterCustom />} />
                <Route path="/office/:id" element={<Workspace />} />
                <Route path="/auth/activate/:token" element={<Active />} />
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route path="/auth/forgot" element={<ForgotPassword />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/reset/:token" element={<ResetPassword />} />
                <Route path="/webgl" element={<CharacterCustomMobile />} />
                <Route path="*" element={<NotFound />} />

                {/* redirect */}
                <Route
                  path="/"
                  element={<Navigate to="/auth/login" replace />}
                />
                <Route
                  path="/character"
                  element={<Navigate to="/auth/login" replace />}
                />
                <Route
                  path="/office/:id"
                  element={<Navigate to="/auth/login" replace />}
                />
              </>
            )}
          </Routes>
        </Router>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
