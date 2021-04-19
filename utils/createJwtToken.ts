import jwt from "jsonwebtoken";
import { UserData } from "../pages";

export const createJwtToken = (user: UserData): string => {
  console.log(123);
  const token = jwt.sign(
    {
      data: user,
    },
    "secret" || "",
    {
      expiresIn: "30d",
      algorithm: "HS256",
    }
  );

  return token;
};
