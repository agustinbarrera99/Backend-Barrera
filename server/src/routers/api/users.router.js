import { Router } from "express";
import user from "../../data/fs/user.fs.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await user.create(data);
    if (response instanceof Error) {
      return res.json({
        statusCode: 400,
        message: response.message,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return next(error)
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await user.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        success: true,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        success: false,
        message: "not found",
      });
    }
  } catch (error) {
    return next(error)
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await user.readOne(uid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        success: true,
        response: one,
      });
    }
  } catch (error) {
    return next(error)
  }
});

export default usersRouter;
