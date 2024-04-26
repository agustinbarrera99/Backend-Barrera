import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js";
import registerRouter from "./register.views.js";
import loginRouter from "./login.views.js";
import productsFormRouter from "./productForm.views.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import ordersRouter from "./orders.views.js"
import logger from "../../utils/logger/winstonProd.util.js";

class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/auth/login", loginRouter);
    this.router.use("/auth/register", registerRouter);
    this.router.use("/products/form", isAdmin, productsFormRouter);
    this.router.use("/orders", ordersRouter)
    this.read("/", ["PUBLIC"],async (req, res, next) => {
      try {
        const options = {
          limit: parseInt(req.query.limit) || 10,
          page: parseInt(req.query.page) || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await products.read({ filter, options });
        const user = req.cookies.token ? verifyToken(req.cookies.token) : null;
        logger.ERROR(error.message);
    
        const r = (u) => {
          if (u && u.role === 0) {
            return { usuarioComun: true, admin: false };
          } else if (u && u.role === 1) { 
            return { usuarioComun: false, admin: true };
          } else {
            return { usuarioComun: false, admin: false };
          }
        }
    
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          filter: req.query.title,
          user: user,
          usuarioComun: r(user),
          admin: r(user)
        });
      } catch (error) {
        next(error);
      }
    });
  }
}






export default ViewsRouter;
