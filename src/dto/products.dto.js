import argsUtil from "../utils/args.util.js";
import crypto from "crypto"

class ProductDTO {
    constructor(data) {
        argsUtil.env === "test" && (this._id = crypto.randomBytes(12).toString("hex")),
        this._id = crypto.randomBytes(12).toString("hex"),
        this.title = data.title,
        this.photo = data.photo || "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg",
        this.price = data.price,
        this.stock = data.stock,
        this.owner_id = data.owner_id,
        argsUtil.env === "test" && (this.updatedAt = new Date()),
        argsUtil.env === "test" && (this.createdAt = new Date())
    }
}

export default ProductDTO