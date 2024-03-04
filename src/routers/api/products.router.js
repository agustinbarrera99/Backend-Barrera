import CustomRouter from "../CustomRouter.js";
// import product from "../../data/fs/product.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import { isAuth } from "../../middlewares/isAuth.js";
import passport from "../../middlewares/passport.mid.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", passport.authenticate("jwt", {session: false}),isAdmin, async (req, res, next) => {
      try {
        const data = req.body;
        const response = await products.create(data);
          return res.succes201(response)
      } catch (error) {
        return next(error)
      }
    });
    
    this.read("/", async (req, res, next) => {
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
        return res.success200(all)
      } catch (error) {
        return next(error);
      }
    });
    
    this.read("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await products.readOne(pid);
          return res.success200(response)
      } catch (error) {
        return next(error)
      }
    });
    
    this.update('/:pid', async (req, res, next) => {
      try {
        const { pid } = req.params;
        const data = req.body;
    
        const response = await products.update(pid, data);
          return res.success200(response)
      } catch (error) {
        return next(error)
      }
    });
    
    this.destroy('/:pid', async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await products.destroy(pid);
          return res.success200(response)
      } catch (error) {
        return next(error)
      }
    });
  }
}




export default ProductsRouter;
