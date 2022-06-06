import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CharacterContext from "./context/CharacterContext";
import { saveData } from "./helpers/cookies";
import { saveDataLocal } from "./helpers/localStorage";
import Active from "./pages/auth/active";
import ForgotPassword from "./pages/auth/forgot-password";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ResetPassword from "./pages/auth/reset-password";
import CharacterCustom from "./pages/CharacterCustom";
import Lobby from "./pages/lobby";
import CharacterCustomMobile from "./pages/mobile/CharacterCustomMobile";
import WorkspaceMobile from "./pages/mobile/WorkspaceMobile";
import NotFound from "./pages/not-found";
import Workspace from "./pages/office-detail/Workspace";
import PrivateInvitation from "./pages/office-invitation/get-private-invitation";
import PublicInvitation from "./pages/office-invitation/get-public-invitation";
import Profile from "./pages/profile";
import "./scss/main.scss";
import { updateAppearance } from "./services/api/users/update-appearance";
import ProfileProxy from "./services/proxy/users/get-profile";
import { useAppDispatch } from "./stores";
import { setAuthenticated, setUserInfo } from "./stores/auth-slice";
import { CharacterAppearance } from "./types/character";
import { ProxyStatusEnum } from "./types/http/proxy/ProxyStatus";

function AuthenticatedDesktopRoutes() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    ProfileProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          dispatch(setUserInfo(res?.data.userInfo));
          saveDataLocal("user_info", JSON.stringify(res.data.userInfo));
          dispatch(setAuthenticated(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lobby" replace />} />
      <Route path="/character" element={<CharacterCustom />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/office/:id" element={<Workspace />} />
      <Route path="invites/:token" element={<PublicInvitation />} />
      <Route path="invites/token/:token" element={<PrivateInvitation />} />
      <Route path="/auth/activate/:token" element={<Active />} />

      {/* redirect */}
      <Route path="/auth/login" element={<Navigate to="/" replace />} />
      <Route path="/auth/register" element={<Navigate to="/" replace />} />
      <Route path="/auth/forgot" element={<Navigate to="/" replace />} />

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

function AuthenticatedMobileRoutes() {
  return (
    <Routes>
      <Route path="/webgl" element={<CharacterCustomMobile />} />
      <Route path="/webgl/office/:id" element={<WorkspaceMobile />} />
    </Routes>
  );
}

function UnauthenticatedRoutes() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = location.search.slice(1).split("&")[0]?.split("=")[1];
    const refreshToken = location.search.slice(1).split("&")[2]?.split("=")[1];
    if (accessToken && refreshToken) {
      saveDataLocal("access_token", accessToken);
      saveData("refresh_token", refreshToken);
    }
  }, [location]);

  useEffect(() => {
    ProfileProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          dispatch(setUserInfo(res?.data.userInfo));
          saveDataLocal("user_info", JSON.stringify(res.data.userInfo));
          dispatch(setAuthenticated(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/auth/forgot" element={<ForgotPassword />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/reset/:token" element={<ResetPassword />} />
      <Route path="/webgl" element={<CharacterCustomMobile />} />
      <Route path="*" element={<NotFound />} />

      {/* redirect */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route
        path="/character"
        element={<Navigate to="/auth/login" replace />}
      />
      <Route
        path="invites/:token"
        element={<Navigate to="/auth/login" replace />}
      />
      <Route
        path="invites/token/:token"
        element={<Navigate to="/auth/login" replace />}
      />
      <Route
        path="/office/:id"
        element={<Navigate to="/auth/login" replace />}
      />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

function App() {
  const [character, setCharacter] = useState<CharacterAppearance>({
    hairStyle: 0,
    eyeStyle: 0,
    hairColor: 0,
    skinColor: 0,
    shirtColor: 0,
    pantColor: 0,
    shoeColor: 0,
  });

  const changeAppearance = useCallback(
    (groupId: number, itemIdx: number) => {
      let newData: CharacterAppearance;

      switch (groupId) {
        case 0:
          newData = { ...character, skinColor: itemIdx };
          break;
        case 1:
          newData = { ...character, hairStyle: itemIdx };
          break;
        case 2:
          newData = { ...character, hairColor: itemIdx };
          break;
        case 3:
          newData = { ...character, eyeStyle: itemIdx };
          break;
        case 4:
          newData = { ...character, shirtColor: itemIdx };
          break;
        case 5:
          newData = { ...character, pantColor: itemIdx };
          break;
        case 6:
          newData = { ...character, shoeColor: itemIdx };
          break;
        default:
          newData = { ...character };
          break;
      }
      updateAppearance(newData);
      setCharacter(newData);
    },
    [character]
  );

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //     if (isAuthenticated) {
  //         getAppearance().then((data) => {
  //             setCharacter(data);
  //         })
  //     }
  // }, [isAuthenticated])
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
        changeCharacter: setCharacter,
        changeAppearance: changeAppearance,
      }}
    >
      <ToastContainer />
      <div className="App">
        <Router>
          {isAuthenticated ? (
            <>
              <AuthenticatedDesktopRoutes />
              <AuthenticatedMobileRoutes />
            </>
          ) : (
            <UnauthenticatedRoutes />
          )}
        </Router>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
