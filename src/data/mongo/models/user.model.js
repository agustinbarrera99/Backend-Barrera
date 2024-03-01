import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: Number, default: 0 },
    photo: { type: String,default: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg"},
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const User = model(collection, schema);

export default User;
