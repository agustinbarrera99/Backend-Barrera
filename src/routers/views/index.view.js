import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import registerRouter from "./register.views.js";
import loginRouter from "./login.views.js";
import productsFormRouter from "./productForm.views.js";

const viewsRouter = Router()
viewsRouter.get("/", async (req, res, next) => {
    try {
    const all = await products.read({})
    const productsData = all.docs.map(product => product.toObject())
    return res.render("index", {products: productsData})
    } catch (error) {
        next(error)
    }
})

viewsRouter.use("/auth/login", loginRouter)
viewsRouter.use("/auth/register", registerRouter)
viewsRouter.use("/products/form", productsFormRouter)

export default viewsRouter