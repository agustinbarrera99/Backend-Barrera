import { Router } from "express";
import realRouter from "./real.views.js";
import product from "../../data/fs/product.fs.js";
import formRouter from "./form.views.js"
import registerRouter from "./register.views.js";

const viewsRouter = Router()
viewsRouter.get("/", async (req, res, next) => {
    try {
    const all = await product.read()
    return res.render("index", {products: all})
    } catch (error) {
        next(error)
    }
})

viewsRouter.use("/real", realRouter)
viewsRouter.use("/form", formRouter)
viewsRouter.use("/register", registerRouter)

export default viewsRouter