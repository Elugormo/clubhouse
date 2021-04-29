import { GetServerSidePropsContext } from "next";
import { Api } from "../api";
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
