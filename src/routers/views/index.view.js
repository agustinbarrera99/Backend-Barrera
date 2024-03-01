import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import registerRouter from "./register.views.js";
import loginRouter from "./login.views.js";
import productsFormRouter from "./productForm.views.js";
import { isAuth } from "../../middlewares/isAuth.js";
import { verifyToken } from "../../utils/token.util.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import ordersRouter from "./orders.views.js"

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
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
    console.log(user)

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

viewsRouter.use("/auth/login", loginRouter);
viewsRouter.use("/auth/register", registerRouter);
viewsRouter.use("/products/form", isAuth, isAdmin, productsFormRouter);
viewsRouter.use("/orders", isAuth, ordersRouter)

export default viewsRouter;
