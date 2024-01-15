import { Router } from "express";
import product from "../../data/fs/product.fs.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await product.create(data);
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
    const response = await product.read();
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
    const response = await product.readOne(pid);
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

    const response = await product.update(pid, data);
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
    const response = await product.destroy(pid);
      return res.status(200).json({
        statusCode: 200,
        response,
      });
  } catch (error) {
    return next(error)
  }
});


export default productsRouter;
