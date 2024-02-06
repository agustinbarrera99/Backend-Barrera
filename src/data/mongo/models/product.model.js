import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products"

const schema = new Schema({
    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    photo: {type: String, default: "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg"}
}, 
    {timestamps: true})

schema.plugin(mongoosePaginate)
const Product = model(collection, schema)

export default Product