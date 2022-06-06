import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getDataLocal } from "../../helpers/localStorage";

const user_info = getDataLocal("user_info");
const accessToken = getDataLocal("access_token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: accessToken ? true : false,
    user: user_info ? JSON.parse(user_info) : null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

const getUserInfo = (state: RootState) => state.auth.user;
const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const userSelectors = {
  getUserInfo,
  getIsAuthenticated,
};

const { actions, reducer } = authSlice;
export const { setAuthenticated, setUserInfo } = actions;
export default reducer;
