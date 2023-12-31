import express from "express"
import product from "./main/data/fs/product.fs.js"
import user from "./main/data/fs/user.fs.js"

const server = express()

const PORT = 8080

const ready = console.log(`server ready on port ${PORT}`)

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.listen(PORT, ready)

server.get("/api/products", async (req, res) => {
    try {
        const all = await product.read()
        if(Array.isArray(all)) {
            return res.json({
                statusCode: 200,
                success: true,
                response: all,
            }) 
        } else {
            return res.json({
                statusCode: 404,
                success: false,
                message: "not found"
            })
        }
    } catch (error) {
        console.error(error)
        return res.json({
            statusCode: 500,
            message: error.message
        })
    }
})

server.get("/api/users", async (req, res) => {
    try {
        const all = await user.read()
        if(Array.isArray(all)) {
            return res.json({
                statusCode: 200,
                success: true,
                response: all,
            }) 
        } else {
            return res.json({
                statusCode: 404,
                success: false,
                message: "not found"
            })
        }
    } catch (error) {
        console.error(error)
        return res.json({
            statusCode: 500,
            message: error.message
        })
    }
})

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const one = await product.readOne(pid)
        if (typeof one === "string") {
            return res.json({
                statusCode: 404,
                message: one,
            }) 
            } else {
                return res.json({
                    statusCode: 200,
                    success: true,
                    response: one
                })
            }
        }
    catch (error) {
        console.error(error)
        return res.json({
            statusCode: 500,
            message: error.message
        })
    }
})

server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const one = await user.readOne(uid)
        if (typeof one === "string") {
            return res.json({
                statusCode: 404,
                message: one,
            }) 
            } else {
                return res.json({
                    statusCode: 200,
                    success: true,
                    response: one
                })
            }
        }
    catch (error) {
        console.error(error)
        return res.json({
            statusCode: 500,
            message: error.message
        })
    }
})



