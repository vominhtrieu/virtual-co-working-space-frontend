import { RootState } from '..';
import { createSlice } from '@reduxjs/toolkit';
import { io } from "socket.io-client";
import { getDataLocal } from '../../helpers/localStorage';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: io(`${process.env.REACT_APP_BASE_SOCKET_URL}`, {
            auth: (cb) => {
                cb({ accessToken: getDataLocal("access_token")})
            }
        })
    },
    reducers: {
        connect: (state) => {
            state.socket = io(`${process.env.REACT_APP_BASE_SOCKET_URL}`, {
                auth: (cb) => {
                    cb({ accessToken: getDataLocal("access_token")})
                }
            }) as any
        },
        // sendJoinOffice: (state, action) => {
        //     state.socket.emit("office_member:join", {
        //         officeId: action.payload
        //     })
        // },
        // sendMovement: (state, action) => {
        //     state.socket.emit("office_member:move", {
        //         ...action.payload
        //     })
        // }
    },
})

const getSocket = (state: RootState) => state.socket.socket;

export const socketSelector = {
    getSocket
}

const { actions, reducer } = socketSlice;
export const { connect } = actions;
export default reducer; 