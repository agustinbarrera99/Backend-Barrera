import { Router } from "express";
import has8chars from "../../middlewares/has8chars.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallbackMid from "../../middlewares/passCallBack.mid.js";
import CustomRouter from "../CustomRouter.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      has8chars,
      passCallbackMid("register"),
      async (req, res, next) => {
        try {
          return res.json({
            statusCode: 201,
            message: "Registered!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/login",
      passCallbackMid("login"),
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 60 * 60 * 24 * 7,
              httpOnly: true,
            })
            .json({
              statusCode: 200,
              message: "logged in!",
            });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create("/me", async (req, res, next) => {
      try {
        if (req.session.email) {
          return res.json({
            statusCode: 200,
            message: "session with email: " + req.session.email,
          });
        }
        const error = new Error("bad auth");
        throw error;
      } catch (error) {
        return next(error);
      }
    });

    this.create(
      "/signout",
      // passport.authenticate("jwt", {
      //   session: false,
      //   failureRedirect: "/api/sessions/signout/cb",
      // }),
      passCallbackMid("jwt"),
      async (req, res, next) => {
        try {
          return res.clearCookie("token").json({
            statusCode: 200,
            message: "signed out",
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create("/badauth", (req, res, next) => {
      try {
        return res.error401()
      } catch (error) {
        return next(error);
      }
    });

    this.create(
      "/google",
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.read(
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      (req, res, next) => {
        try {
          return res.json({
            statusCode: 200,
            message: "logged in with google",
            session: req.session,
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/signout/cb", (req, res, next) => {
      try {
        return res.json({
          statusCode: 401,
          message: "badauth",
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

export default SessionsRouter;
