import { Router } from "express";
import { orders, users } from "../../data/mongo/manager.mongo.js";
import passCallbackMid from "../../middlewares/passCallBack.mid.js";
import { verifyToken } from "../../utils/token.util.js";

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
    if (all.docs.length >= 1) {
      return res.render("orders", { title: "MY CART", orders: all.docs });
    } else {
      return res.render("emptyCart")
    }
  } catch (error) {
      return next(error)
  }
});

export default ordersRouter