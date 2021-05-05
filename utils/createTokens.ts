import jwt from "jsonwebtoken";
export const CreateTokens = {
  createAccessToken: async function () {
    try {
      let { _id, username } = this;
      let accessToken = jwt.sign(
        { user: { _id, username } },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10m",
        }
      );
      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
  createRefreshToken: async function () {
    try {
      let { _id, username } = this;
      let refreshToken = jwt.sign(
        { user: { _id, username } },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      // set refresh token to redis redis.set();
      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
};
