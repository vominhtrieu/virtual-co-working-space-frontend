import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setAuthenticated: () => {},
    onLoginByEmailAndPassword() {},
    onLoginByGoogle() {},
    onLoginByFacebook() {},
    onLogout() {},
    onRegister() {},
  },
});

const { actions, reducer } = authSlice;
export const { setAuthenticated, onLoginByEmailAndPassword, onLoginByFacebook, onLoginByGoogle, onLogout, onRegister } =
  actions;
export default reducer;
