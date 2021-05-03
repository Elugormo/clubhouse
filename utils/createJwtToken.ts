import jwt from "jsonwebtoken";
import { UserData } from "../pages";
import { redis_client } from "../server/redis_connect";

export const createJwtToken = (user: UserData): string => {
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

  redis_client.get(user.id.toString(), (err, data) => {
    if (err) throw err;

    if (data) {
      return JSON.stringify(data);
    } else {
      redis_client.set(user.id.toString(), JSON.stringify(user.token));
    }
  });

  return token;
};
