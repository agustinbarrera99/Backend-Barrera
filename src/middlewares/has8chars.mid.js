import has8charUtil from "../utils/has8char.util.js";

const has8chars = (req, res, next) => {
    try {        
        const { password } = req.body
        has8charUtil(password)
        return next()
    } catch (error) {
        return next(error)
    }
}

export default has8chars