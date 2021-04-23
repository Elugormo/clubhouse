import { GetServerSidePropsContext } from "next";
import Cookies from "nookies";
import { Api } from "../api";
import { UserApi } from "../api/UserApi";
import { Axios } from "../core/axios";
import { UserData } from "../pages";

export const checkAuth = async (
  ctx: GetServerSidePropsContext
): Promise<UserData | null> => {
  try {
    return await Api(ctx).getMe();
  } catch (err) {
    return null;
  }
};
