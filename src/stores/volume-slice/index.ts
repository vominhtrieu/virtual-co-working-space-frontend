import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const volumeSlice = createSlice({
  name: "volume",
  initialState: {
    volume: 100,
  },
  reducers: {
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
  },
});

const getVolume = (state: RootState) => state.volume.volume;

export const volumeSelectors = {
  getVolume,
};

const { actions, reducer } = volumeSlice;
export const { setVolume } = actions;
export default reducer;
