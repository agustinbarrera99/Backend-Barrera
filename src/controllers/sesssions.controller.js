import service from "../services/users.services.js";
import repository from "../repositories/user.rep.js";
import crypto from "crypto";

class SessionsController {
  constructor() {
    this.service = service;
  }
  register = async (req, res, next) => {
    const { email, name } = req.body;
    const { verifyCode } = req.user;
    const user = await this.service.register({ email, name, verifyCode });
    console.log(user)
    try {
      return res.success201("registered");
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true };
      const user = await repository.readByEmail(req.user.email)
      return res.cookie("token", req.token, opts).success200({user, message: "Logged In"});
    } catch (error) {
      return next(error);
    }
  };
  google = async (req, res, next) => {
    try {
      return res.success200("Logged in with Google!");
    } catch (error) {
      return next(error);
    }
  };
  me = async (req, res, next) => {
    try {
      const isLogged = req.cookies.token ? true : false;
      if (isLogged) {
        const user = {
          email: req.user.email,
          role: req.user.role,
          photo: req.user.photo,
        };
        return res.success200(user);
      }
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };
  verifyAccount = async (req, res, next) => {
    try {
      const { verifyCode, email } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifyCode === verifyCode) {
        await service.update(user._id, { verified: true });
        return res.success200("Usuario verificado");
      } else {
        
        return res.error401();
      }
    } catch (error) {
      next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
export const { register, login, google, me, signout, badauth, verifyAccount } =
  controller;
