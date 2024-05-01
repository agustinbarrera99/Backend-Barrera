import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: {
      type: String,
      default: "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg",
    },
    owner_id: { type: Types.ObjectId, required: true, ref: "users" },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.pre("find", function () {
  this.populate("owner_id", "-password -createdAt -updatedAt -__v");
});
const Product = model(collection, schema);

export default Product;
