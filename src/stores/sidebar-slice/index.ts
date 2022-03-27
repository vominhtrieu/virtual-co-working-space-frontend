import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: "",
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

const getOpen = (state: RootState) => state.sidebar.open;

export const userSelectors = {
  getOpen
};

const { actions, reducer } = sidebarSlice;
export const { setOpen} = actions;
export default reducer;
