import { Router } from "express";

const productsFormRouter = Router()

productsFormRouter.get("/", (req, res, next) => {
    try {
        return res.render("formProduct")
    } catch (error) {
        next(error)
    }
})

export default productsFormRouter