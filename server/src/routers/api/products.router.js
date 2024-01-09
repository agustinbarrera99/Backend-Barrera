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
    const all = await product.read();
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

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await product.readOne(pid);
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

productsRouter.put('/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;

    const response = await product.update(pid, data);

    if (response instanceof Error) {
      return res.json({
        statusCode: 400,
        message: response.message,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error)
  }
});

productsRouter.delete('/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await product.destroy(pid);
    if (response instanceof Error) {
      return res.status(400).json({
        statusCode: 400,
        message: response.message,
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        message: 'Product deleted successfully',
      });
    }
  } catch (error) {
    return next(error)
  }
});


export default productsRouter;
