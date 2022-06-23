import { RootState } from './../index';
import { GameState } from './../../types/game-state';
import { createSlice } from "@reduxjs/toolkit"

const GameSlice = createSlice({
    name: "game",
    initialState: {
        gameState: GameState.NOT_PLAYING,
        playerLeft: 0,
    },
    reducers: {
        setGameState: (state, action) => {
            state.gameState = action.payload;
        },
        setPlayerLeft: (state, action) => {
            state.playerLeft = action.payload;
            console.log(state.playerLeft)
        },
        playerOut: (state) => {
            if (state.playerLeft > 1) {
                state.playerLeft --;
            }
            if (state.playerLeft === 1) {
                state.gameState = GameState.NOT_PLAYING;
            }
            console.log(state.playerLeft)
        }
    }
})

const getGameState = (state: RootState) => state.game.gameState;
const getPlayerLeft = (state: RootState) => state.game.playerLeft;

export const gameSelectors = {
    getGameState,
    getPlayerLeft
};

const { actions, reducer } = GameSlice;
export const { setGameState, setPlayerLeft, playerOut } = actions;
export default reducer;