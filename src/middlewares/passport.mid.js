import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { users } from "../data/mongo/manager.mongo.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { verifyToken, createToken } from "../utils/token.util.js";
import { ExtractJwt, Strategy as JwtSrategry } from "passport-jwt";
const { GOOGLE_ID, GOOGLE_CLIENT } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let user = await users.create(data);
          return done(null, user);
        } else {
          return done(null, false, {
            message: "User already exists",
            statusCode: 400,
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user && verifyHash(password, user.password)) {
          const token = createToken({ email, role: user.role });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false, { message: "Bad auth!" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.readByEmail(profile.id);
        if (user) {
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        } else {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await users.create(user);
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtSrategry(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET,
    },
    async (payload, done) => {
      try {
        const user = await users.readByEmail(payload.email);
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
