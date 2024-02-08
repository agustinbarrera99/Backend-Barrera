import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import formRouter from "./form.views.js"
import registerRouter from "./register.views.js";

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

viewsRouter.use("/form", formRouter)
viewsRouter.use("/register", registerRouter)

export default viewsRouter