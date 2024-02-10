import { Router } from "express";

const loginRouter = Router()

loginRouter.get("/", (req, res, next) => {
    try {
        return res.render("login")
    } catch (error) {
        next(error)
    }
})


export default loginRouter