import argsUtil from "../utils/args.util.js";
import crypto from "crypto"
import { createHash } from "../utils/hash.util.js";

class UserDTO {
    constructor(data) {
        argsUtil.env === "test" && (this._id = crypto.randomBytes(12).toString("hex")),
        this._id = crypto.randomBytes(12).toString("hex"),
        this.name = data.name,
        this.photo = data.photo || "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg",
        this.email = data.email,
        this.role = data.role || 0
        this.password = createHash(data.password)
        this.verifyCode = data.verifyCode,
        this.verified = false,
        argsUtil.env === "test" && (this.updatedAt = new Date()),
        argsUtil.env === "test" && (this.createdAt = new Date())
    }
}

export default UserDTO