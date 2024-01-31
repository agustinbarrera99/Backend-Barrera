import handleCastError from "../../utils/handleCastError.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import User from "./models/user.model.js";
import notFoundOne from "../../utils/NotFoundOne.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read({filter, order}) {
    try {
      const all = await this.model.find(filter).sort(order)
      if (all.lenth === 0) {
        const error = new Error("there is not any document");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one)
      return one
    } catch (error) {
      handleCastError(error)
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      notFoundOne(one, "User not found");
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true }
      const one = await this.model.findByIdAndUpdate(id, data, opt)
      notFoundOne(one)
      return one
    } catch (error) {
      handleCastError(error)
      throw error
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id)
      notFoundOne(one)
      return one
    } catch (error) {
      handleCastError(error)
      throw error
    }
  }

  async stats({filter}) {
    try {
      let stats = await this.model.find(filter).explain("executionStats")
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis
      }
      return stats
    } catch (error) {
      throw error
    }
  }
}

const products = new MongoManager(Product)
const users = new MongoManager(User)
const orders = new MongoManager(Order)

export {products, users, orders}


