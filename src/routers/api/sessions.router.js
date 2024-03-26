import has8chars from "../../middlewares/has8chars.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallbackMid from "../../middlewares/passCallback.mid.js";
import CustomRouter from "../CustomRouter.js";
import {
  register,
  login,
  google,
  me,
  signout,
  badauth,
} from "../../controllers/sesssions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      has8chars,
      passCallbackMid("register"),
      register
    );

    this.create("/login", ["PUBLIC"], passCallbackMid("login"), login);

    this.create("/me", ["USER", "ADMIN", "PREM"], me);

    this.create(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallbackMid("jwt"),
      signout
    );

    this.create("/badauth", ["PUBLIC"], badauth);

    this.create(
      "/google",
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );

    this.create("/signout", ["USER", "ADMIN", "PREM"], signout);
  }
}

export default SessionsRouter;
