import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const officeSlice = createSlice({
  name: "office",
  initialState: {
    isOffice: false,
  },
  reducers: {
    setIsOffice: (state, action) => {
      state.isOffice = action.payload;
    },
  },
});

const getIsOffice = (state: RootState) => state.office.isOffice;

export const officeSelectors = {
  getIsOffice,
};

const { actions, reducer } = officeSlice;
export const { setIsOffice } = actions;
export default reducer;
