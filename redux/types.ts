import { RoomsSliceState } from "./slices/roomSlice";

export type RootState = {
  user: UserSliceState;
  rooms: RoomsSliceState;
};
