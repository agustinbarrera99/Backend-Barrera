import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8chars from "../../middlewares/has8chars.mid.js";
import isValidPassMid from "../../middlewares/isValidPass.mid.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", has8chars, async (req, res, next) => {
  try {
    const data = req.body;
    await users.create(data);
    return res.json({
      statusCode: 201,
      message: "registered!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/login", isValidPassMid, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = 2;
      return res.json({
        statusCode: 200,
        message: "logged in",
      });
    }
    const error = new Error("bad Auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/me", async (req, res, next) => {
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

sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    req.session.destroy();
    return res.json({
      statusCode: 200,
      message: "signed out",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
