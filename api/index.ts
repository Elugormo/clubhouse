import Cookies from "nookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import { UserApi } from "./UserApi";
import { RoomApi } from "./RoomApi";

type ApiReturnType = ReturnType<typeof UserApi> & ReturnType<typeof RoomApi>;

export const Api = (ctx): ApiReturnType => {
  const cookies = Cookies.get(ctx);
  const token = cookies.token;

  const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return [UserApi, RoomApi].reduce(
    (prev, f) => ({ ...prev, ...f(instance) }),
    {} as ApiReturnType
  );
};
