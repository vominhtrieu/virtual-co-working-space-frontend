import { RootState } from './../index';
import { GameState } from './../../types/game-state';
import { createSlice } from "@reduxjs/toolkit"

const GameSlice = createSlice({
    name: "game",
    initialState: {
        gameState: GameState.NOT_PLAYING,
        playerLeft: 0,
        isWinner: false,
    },
    reducers: {
        setGameState: (state, action) => {
            state.gameState = action.payload;
            if (state.gameState === GameState.PLAYING && state.playerLeft === 1) {
                state.gameState = GameState.NOT_PLAYING;
            }
        },
        setPlayerLeft: (state, action) => {
            state.playerLeft = action.payload;
        },
        playerOut: (state) => {
            if (state.playerLeft > 1) {
                state.playerLeft --;
            }
            if (state.playerLeft === 1) {
                state.gameState = GameState.NOT_PLAYING;
            }
        },
        setIsWinner: (state, action) => {
            state.isWinner = action.payload;
        }
    }
})

const getGameState = (state: RootState) => state.game.gameState;
const getPlayerLeft = (state: RootState) => state.game.playerLeft;
const getIsWinner = (state: RootState) => state.game.isWinner;

export const gameSelectors = {
    getGameState,
    getPlayerLeft,
    getIsWinner
};

const { actions, reducer } = GameSlice;
export const { setGameState, setPlayerLeft, playerOut, setIsWinner } = actions;
export default reducer;