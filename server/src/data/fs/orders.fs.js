import fs from "fs";
import crypto from "crypto";

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
      const { uid, pid, quantity, state } = data;
  
      if (!uid || !pid || !quantity || !state) {
        throw new Error("Enter all necessary data (uid, pid, quantity, state)");
      }

      const users = JSON.parse(fs.readFileSync(this.pathToUsers, "utf-8"));
      const userExists = users.some((user) => user.id === uid);
      if (!userExists) {
        throw new Error(`There is not any user with ID: ${uid}`);
      }
      const products = JSON.parse(
        fs.readFileSync(this.pathToProducts, "utf-8")
      );
      const productExists = products.some((product) => product.id === pid);
      if (!productExists) {
        throw new Error(`There is not any product with ID: ${pid}`);
      }

      const newOrder = {
        oid: crypto.randomBytes(12).toString("hex"),
        uid,
        pid,
        quantity,
        state,
      };

      this.orders.push(newOrder);
      fs.writeFileSync(this.pathToOrders, JSON.stringify(this.orders, null, 2));

      return newOrder;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async read() {
    try {
      if(this.orders.length === 0) {
        throw new Error("there are not orders")
      }
      return this.orders;
    } catch (error) {
      console.error(error.message);
      return error
    }
  }

  async readOne(uid) {
    try {
      const orders = JSON.parse(fs.readFileSync(this.pathToOrders, "utf-8"))
      const userOrders = orders.filter((order) => order.uid === uid)
  
      if (userOrders.length === 0) {
        throw new Error(`the user with id: ${uid} doesn't have orders`);
      }
      return userOrders;
    } catch (error) {
      console.error(error.message);
      return error.message
    }
  }

  update(oid, quantity, state) {
    try {
      const orderToUpdate = this.orders.find((order) => order.oid === oid);
      if (!orderToUpdate) {
        throw new Error(`No order found with ID ${oid}`);
      }

      if (quantity !== undefined) {
        orderToUpdate.quantity = quantity;
      }

      if (state !== undefined) {
        orderToUpdate.state = state;
      }

      fs.writeFileSync(this.pathToOrders, JSON.stringify(this.orders, null, 2));
      return orderToUpdate;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  destroy(oid) {
    try {
      const initialLength = this.orders.length;
      this.orders = this.orders.filter((order) => order.oid !== oid);
      if (this.orders.length === initialLength) {
        throw new Error(`No order found with ID ${oid}`);
      }

      fs.writeFileSync(this.pathToOrders, JSON.stringify(this.orders, null, 2));
      return oid;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const orders = new OrdersManager(
  "./src/data/fs/files/users.json",
  "./src/data/fs/files/products.json",
  "./src/data/fs/files/orders.json"
);

// orders.update("a94a69127f9ecdb74a620444", 5)
// orders.destroy("a4a7cfa0861c99340f761315")

export default orders;
