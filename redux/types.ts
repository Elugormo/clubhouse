import { RoomsSliceState } from "./slices/roomSlice";
import { UserSliceState } from "./slices/userSlice";

export type RootState = {
  user: UserSliceState;
  rooms: RoomsSliceState;
};
