import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
    async (_: unknown, __: unknown, profile, done) => {
      try {
        const obj = {
          fullname: profile.displayName,
          avatarUrl: profile.photos?.[0].value,
          isActive: 0,
          username: profile.username,
          phone: "",
        };
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {});

passport.deserializeUser(function (id, done) {});

export { passport };
