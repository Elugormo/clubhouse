import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GithubStrategy } from "passport-github";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserData } from "../../pages";
import { createJwtToken } from "../../utils/createJwtToken";

dotenv.config();

const User = require("../../models").User;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "asd",
};

passport.use(
  "jwt",
  new JwtStrategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload.data);
  })
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "799a51a0becca71cb834",
      clientSecret: "2b20125b80273a3dac2d03f32dcc0f540882c17d",
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
    async (_: unknown, __: unknown, profile, done) => {
      try {
        let userData: UserData;

        const obj: Omit<UserData, "id"> = {
          fullname: profile.displayName,
          avatarUrl: profile.photos?.[0].value,
          isActive: 0,
          username: profile.username,
          phone: "",
        };
        console.log(User);
        const findUser = await User.findOne({
          where: {
            username: obj.username,
          },
        });

        if (!findUser) {
          const user = await User.create(obj);
          userData = user.toJSON();
        } else {
          userData = await findUser.toJSON();
        }

        done(null, {
          ...userData,
          token: createJwtToken(userData),
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    err ? done(err) : done(null, user);
  });
});

export { passport };
