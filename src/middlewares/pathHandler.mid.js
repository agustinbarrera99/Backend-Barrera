import winston from "../utils/logger/winstonProd.util.js"

function pathHandler(req, res, next) {
    winston.ERROR(`${req.method} ${req.url} not found path`)
    return res.json({
        statusCode: 404,
        message:`${req.method} ${req.url} not found endpoint`
    })
}

export default pathHandler