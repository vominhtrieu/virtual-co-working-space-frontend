import React, {useState} from "react";
import {useSelector} from "react-redux";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes, useLocation,
} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconLanguages from "./components/icon-lang";
import Sidebar from "./components/layouts/sidebar";
import CharacterContext from "./context/CharacterContext";
import Active from "./pages/auth/active";
import ForgotPassword from "./pages/auth/forgot-password";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ResetPassword from "./pages/auth/reset-password";
import CharacterCustom from "./pages/CharacterCustom";
import CharacterCustomMobile from "./pages/mobile/CharacterCustomMobile";
import NotFound from "./pages/not-found";
import PrivateInvitation from "./pages/office-invitation/get-private-invitation";
import PublicInvitation from "./pages/office-invitation/get-public-invitation";
import Workspace from "./pages/office-detail/Workspace";
import "./scss/main.scss";
import {CharacterInterface} from "./types/character";
import WorkspaceMobile from "./pages/mobile/WorkspaceMobile";

function AuthenticatedDesktopRoutes() {
    const location = useLocation();

    return (
        <>
            {!location.pathname.includes("/webgl") && <Sidebar/>}
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/character" replace/>}
                />
                <Route path="/character" element={<CharacterCustom/>}/>
                <Route path="/office/:id" element={<Workspace/>}/>
                <Route path="invites/:token" element={<PublicInvitation/>}/>
                <Route
                    path="invites/token/:token"
                    element={<PrivateInvitation/>}
                />
                <Route path="/auth/activate/:token" element={<Active/>}/>
            </Routes>
        </>
    )
}

function AuthenticatedMobileRoutes() {
    return <Routes>
        <Route path="/webgl" element={<CharacterCustomMobile/>}/>
        <Route path="/webgl/office/:officeId" element={<WorkspaceMobile/>}/>
    </Routes>
}

function UnauthenticatedRoutes() {
    return <Routes>
        <Route path="/auth/forgot" element={<ForgotPassword/>}/>
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/reset/:token" element={<ResetPassword/>}/>
        <Route path="/webgl" element={<CharacterCustomMobile/>}/>
        <Route path="*" element={<NotFound/>}/>

        {/* redirect */}
        <Route
            path="/"
            element={<Navigate to="/auth/login" replace/>}
        />
        <Route
            path="/character"
            element={<Navigate to="/auth/login" replace/>}
        />
        <Route
            path="invites/:token"
            element={<Navigate to="/auth/login" replace/>}
        />
        <Route
            path="invites/token/:token"
            element={<Navigate to="/auth/login" replace/>}
        />
        <Route
            path="/office/:id"
            element={<Navigate to="/auth/login" replace/>}
        />
    </Routes>
}

function CommonRoutes() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

function App() {
    const [character, setCharacter] = useState<CharacterInterface>({
        hairStyle: 0,
        eyeStyle: 0,
        hairColor: 0,
        skinColor: 0,
        shirtColor: 0,
        pantColor: 0,
        shoeColor: 0,
    });

    const {isAuthenticated} = useSelector((state: any) => state.auth);
    return (
        <CharacterContext.Provider
            value={{
                hairStyle: character.hairStyle,
                eyeStyle: character.eyeStyle,
                hairColor: character.hairColor,
                skinColor: character.skinColor,
                shirtColor: character.shirtColor,
                pantColor: character.pantColor,
                shoeColor: character.shoeColor,
                changeCharacter: (character: CharacterInterface) =>
                    setCharacter(character),
            }}
        >
            <ToastContainer/>
            <IconLanguages/>
            <div className="App">
                <Router>
                    {isAuthenticated ? (
                        <>
                            <AuthenticatedDesktopRoutes/>
                            <AuthenticatedMobileRoutes/>
                        </>
                    ) : (
                        <UnauthenticatedRoutes/>
                    )}
                    <CommonRoutes/>
                </Router>
            </div>
        </CharacterContext.Provider>
    )
        ;
}

export default App;
