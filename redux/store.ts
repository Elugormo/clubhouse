import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers, Store } from "redux";
import { roomsReducer } from "./slices/roomSlice";
import { RootState } from "./types";

export const rootReducer = combineReducers({
  rooms: roomsReducer,
  user: userReducer,
});

export const makeStore = (): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
