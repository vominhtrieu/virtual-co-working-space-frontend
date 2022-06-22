import { RootState } from './../index';
import { GameState } from './../../types/game-state';
import { createSlice } from "@reduxjs/toolkit"

const GameSlice = createSlice({
    name: "game",
    initialState: {
        gameState: GameState.NOT_PLAYING
    },
    reducers: {
        setGameState: (state, action) => {
            state.gameState = action.payload;
        }
    }
})

const getGameState = (state: RootState) => state.game.gameState;

export const gameSelectors = {
    getGameState,
};

const { actions, reducer } = GameSlice;
export const { setGameState } = actions;
export default reducer;