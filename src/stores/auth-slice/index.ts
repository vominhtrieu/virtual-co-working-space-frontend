import { createSlice } from "@reduxjs/toolkit";
import { getDataLocal } from "../../helpers/localStorage";

const user_id = getDataLocal("user_id");
const user_info = getDataLocal("user_info");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: user_id ? true : false,
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

const { actions, reducer } = authSlice;
export const { setAuthenticated, setUserInfo } = actions;
export default reducer;
