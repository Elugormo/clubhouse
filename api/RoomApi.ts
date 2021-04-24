import { AxiosInstance } from "axios";

export interface Room {
  id: number;
  title: string;
  speakers: any[];
  listenersCount: number;
}

type RoomFormType = {
  title: string;
  type: RoomType;
};

export type RoomType = "open" | "social" | "closed";

export const RoomApi = (instance: AxiosInstance) => {
  return {
    getRooms: async (): Promise<Room[]> => {
      const { data } = await instance.get("/rooms");
      return data;
    },
    getRoom: async (id: number): Promise<Room> => {
      const { data } = await instance.get(`/rooms/${id}`);
      return data;
    },
    createRoom: async (form: { title: string; type: RoomType}): Promise<Room> => {
      const { data } = await instance.post("/rooms", form);
      return data;
    },
    deleteRoom: async (id: number): Promise<void> =>
      instance.delete(`/rooms/${id}`),
  };
};
