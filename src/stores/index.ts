import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth-slice/index";
import sidebarReducer from './sidebar-slice/index'
import volumeReducer from './volume-slice/index'
import officeReducer from './office-slice/index'
import loadReducer from './load-slice/index'
import socketReducer from './socket-slice/index'
import socketMiddleware from "./socket-middleware"
import GameReducer from "./game-slice/index"


const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    volume: volumeReducer,
    office: officeReducer,
    load: loadReducer,
    socket: socketReducer,
    game: GameReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['socket.socket']
    }
  }).concat(socketMiddleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
