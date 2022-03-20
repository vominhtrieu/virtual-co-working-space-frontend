import { createSlice } from "@reduxjs/toolkit";
import RegisterProxy from "../../services/proxy/auth/register";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isRegister: false,
    user: null,
  },
  reducers: {
    setAuthenticated: () => {},
    onLoginByEmailAndPassword() {},
    onLoginByGoogle() {},
    onLoginByFacebook() {},
    onLogout() {},
    onRegister(state, action) {
      state.isRegister=true;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setAuthenticated, onLoginByEmailAndPassword, onLoginByFacebook, onLoginByGoogle, onLogout, onRegister } =
  actions;
export default reducer;
