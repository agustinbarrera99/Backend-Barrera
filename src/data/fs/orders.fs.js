import fs from "fs";
import crypto from "crypto";
import logger from "../../utils/logger/index.js";
import OrderDTO from "../../dto/orders.dto.js";

class OrdersManager {
  constructor(pathToUsers, pathToProducts, pathToOrders) {
    this.pathToUsers = pathToUsers;
    this.pathToProducts = pathToProducts;
    this.pathToOrders = pathToOrders;
    this.orders = [];
    this.init();
  }

  init() {
    const fileExists = fs.existsSync(this.pathToOrders);
    if (fileExists) {
      const fileData = fs.readFileSync(this.pathToOrders, "utf-8");
      if (fileData.trim() !== "") {
        this.orders = JSON.parse(fileData);
      }
    } else {
      fs.writeFileSync(this.pathToOrders, JSON.stringify([], null, 2));
    }
  }

  async create(data) {
    try {
      const users = JSON.parse(fs.readFileSync(this.pathToUsers, "utf-8"));
      const userExists = users.some((user) => user._id === data.user_id);
      if (!userExists) {
        const notUserIdError = new Error(`There is not any user with ID: ${data.user_id}`);
        notUserIdError.statusCode = 400;
        throw notUserIdError;
      }
      
      const products = JSON.parse(fs.readFileSync(this.pathToProducts, "utf-8"));
      const productExists = products.some((product) => product._id === data.product_id);
      if (!productExists) {
        const notProductIdError = new Error(`There is not any product with ID: ${data.product_id}`);
        notProductIdError.statusCode = 400;
        throw notProductIdError;
      }

      data = new OrderDTO(data);
      this.orders.push(data);
      fs.writeFileSync(this.pathToOrders, JSON.stringify(this.orders, null, 2));

      return data;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async read({ filter, options }) {
    try {
      const all = this.orders.filter(order => 
        Object.keys(filter).every(key => order[key] === filter[key])
      );

      return { docs: all, ...options };
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = this.orders.find(order => order._id === id);
      if (!one) {
        const notOrderError = new Error(`No order found with ID ${id}`);
        notOrderError.statusCode = 400;
        throw notOrderError;
      }
      return one;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const index = this.orders.findIndex(order => order._id === id);
      if (index === -1) {
        const notOrderError = new Error(`No order found with ID ${id}`);
        notOrderError.statusCode = 400;
        throw notOrderError;
      }

      const updatedOrder = { ...this.orders[index], ...data };
      this.orders[index] = updatedOrder;
      fs.writeFileSync(this.pathToOrders, JSON.stringify(this.orders, null, 2));
      return updatedOrder;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const index = this.orders.findIndex(order => order._id === id);
      if (index === -1) {
        const notOrderError = new Error(`No order found with ID ${id}`);
        notOrderError.statusCode = 404;
        throw notOrderError;
      }

      const deletedOrder = this.orders.splice(index, 1)[0];
      fs.writeFileSync(this.pathToOrders, JSON.stringify(this.orders, null, 2));
      return deletedOrder;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async report(uid) {
    try {
      const userOrders = this.orders.filter(order => order.user_id === uid);

      const report = userOrders.reduce((acc, order) => {
        const product = JSON.parse(fs.readFileSync(this.pathToProducts, "utf-8"))
          .find(product => product._id === order.product_id);

        const price = parseFloat(product.price);
        const quantity = parseInt(order.quantity, 10);
        const subtotal = price * quantity;

        acc.total += subtotal;
        return acc;
      }, { user_id: uid, total: 0, date: new Date() });

      return report;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }
}

const orders = new OrdersManager(
  "./src/data/fs/files/users.json",
  "./src/data/fs/files/products.json",
  "./src/data/fs/files/orders.json"
);

export default orders;
