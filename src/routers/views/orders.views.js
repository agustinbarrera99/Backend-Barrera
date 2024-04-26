import { Router } from "express";
import orders from "../../data/mongo/orders.mongo.js";
import users from "../../data/mongo/users.mongo.js";
import passCallbackMid from "../../middlewares/passCallback.mid.js";

const ordersRouter = Router();

ordersRouter.get("/", passCallbackMid("jwt"), async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    const user = await users.readByEmail(req.user.email);
    const filter = {
      user_id: user._id,
    };
    const all = await orders.read({ filter, options });

    const userRole = req.cookies.token ? verifyToken(req.cookies.token) : null;

    const r = (u) => {
      if (u && u.role === 0) {
        return { usuarioComun: true, admin: false };
      } else if (u && u.role === 1) {
        return { usuarioComun: false, admin: true };
      } else {
        return { usuarioComun: false, admin: false };
      }
    };

    if (all.docs.length >= 1) {
      return res.render("orders", { 
        title: "MY CART", orders: all.docs,
        user: userRole,
        usuarioComun: r(userRole),
        admin: r(userRole)
      });
    } else {
      return res.render("emptyCart", {
        title: "MY CART", orders: all.docs,
        user: userRole,
        usuarioComun: r(userRole),
        admin: r(userRole)
      })
    }
  } catch (error) {
      return next(error)
  }
});

export default ordersRouter