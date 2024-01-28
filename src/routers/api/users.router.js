import { Router } from "express";
// import user from "../../data/fs/user.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
      return res.json({
        statusCode: 201,
        response,
      });
  } catch (error) {
    return next(error)
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const response = await users.read();
      return res.json({
        statusCode: 200,
        success: true,
        response
      });
  } catch (error) {
    return next(error)
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.readOne(uid);
      return res.json({
        statusCode: 200,
        success: true,
        response,
      });
  } catch (error) {
    return next(error)
  }
});

usersRouter.get("/email/:email", async (req, res, next) => {
  try {
    const {email} = req.params
    const response = await users.readByEmail(email)
    return res.json({
      statusCode: 200,
      response,
    })

  } catch (error) {
    return next(error)
  }
})

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params
    const data = req.body
    const response = await users.update(uid, data)
    return res.json({
      statusCode: 200,
      success: true,
      response
    })
  } catch (error) {
    return next(error)
  }
})

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params
    const response = await users.destroy(uid)
    return res.json({
        statusCode: 200,
        success: true,
        response
      })
  } catch (error) {
    return next(error)
  }
})

export default usersRouter;
