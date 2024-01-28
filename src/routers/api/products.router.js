import { Router } from "express";
// import product from "../../data/fs/product.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
      return res.json({
        statusCode: 201,
        response,
      });
  } catch (error) {
    return next(error)
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const response = await products.read();
      return res.json({
        statusCode: 200,
        success: true,
        response
      });
  } catch (error) {
    return next(error)
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
