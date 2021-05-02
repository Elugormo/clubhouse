import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Room, RoomApi, RoomType } from "../../api/RoomApi";
import { Axios } from "../../core/axios";
import { RootState } from "../types";

export type RoomsSliceState = {
  items: Room[];
};

const initialState: RoomsSliceState = {
  items: [],
};

export const fetchCreateRoom = createAsyncThunk<
  Room,
  { title: string; type: RoomType }
>("rooms/fetchCreateRoomStatus", async ({ title, type }) => {
  try {
    const room = await RoomApi(Axios).createRoom({
      title,
      type,
    });
    return room;
  } catch (error) {
    throw Error("Error while creating the room");
  }
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchCreateRoom.fulfilled.type,
        (state, action: PayloadAction<Room>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.items = action.payload.rooms.items;
      }),
});

export const { setRooms } = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
