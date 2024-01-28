import { model, Schema } from "mongoose";

const collection = "products"

const schema = new Schema({
    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    photo: {type: String, default: "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg"}
}, 
    {timestamps: true})

const Product = model(collection, schema)

export default Product