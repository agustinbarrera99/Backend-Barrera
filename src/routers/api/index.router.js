import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import ProductsRouter from "./products.router.js";
import SessionsRouter from "./sessions.router.js";
import OrdersRouter from "./orders.router.js";
import UsersRouter from "./users.router.js";

const product = new ProductsRouter()
const session = new SessionsRouter()
const order = new OrdersRouter()
const user = new UsersRouter()


class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/users", user.getRouter());
    this.router.use("/products", product.getRouter());
    this.router.use("/orders", order.getRouter());
    this.router.use("/sessions", session.getRouter());
  }
}

export default ApiRouter;
