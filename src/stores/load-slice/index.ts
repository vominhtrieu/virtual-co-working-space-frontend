import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const loadSlice = createSlice({
  name: "load",
  initialState: {
    isLoad: false,
  },
  reducers: {
    setIsLoad: (state, action) => {
      state.isLoad = action.payload;
    },
  },
});

const getIsLoad = (state: RootState) => state.load.isLoad;

export const loadSelectors = {
  getIsLoad,
};

const { actions, reducer } = loadSlice;
export const { setIsLoad } = actions;
export default reducer;
