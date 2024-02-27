import { Router } from "express";
// import product from "../../data/fs/product.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import { isAuth } from "../../middlewares/isAuth.js";
import passport from "../../middlewares/passport.mid.js";

const productsRouter = Router();

productsRouter.post("/", passport.authenticate("jwt", {session: false}),isAdmin, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
      return res.json({
        statusCode: 201,
        message: "product created!",
        response,
      });
  } catch (error) {
    return next(error)
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true
    };
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.sort === "desc") {
      options.sort.title = "desc";
    }
    const all = await products.read({ filter, options });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.readOne(pid);
      return res.json({
        statusCode: 200,
        success: true,
        response
      });
  } catch (error) {
    return next(error)
  }
});

productsRouter.put('/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;

    const response = await products.update(pid, data);
      return res.json({
        statusCode: 200,
        response,
      });
  } catch (error) {
    return next(error)
  }
});

productsRouter.delete('/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
      return res.json({
        statusCode: 200,
        response,
      });
  } catch (error) {
    return next(error)
  }
});


export default productsRouter;
