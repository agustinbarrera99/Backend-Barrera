import logger from "../../utils/logger/index.js"

class OrderManager {
    static #orders = [];
  
    create(data) {
      try {
        const { pid, uid, quantity, state } = data;
  
        if (!pid || !uid || !quantity || !state) {
          throw new Error("Complete all fields correctly (pid, uid, quantity, state)");
        }
  
        const order = {
          oid: OrderManager.#orders.length === 0 ? 1 : OrderManager.#orders[OrderManager.#orders.length - 1].oid + 1,
          pid,
          uid,
          quantity,
          state
        };
  
        OrderManager.#orders.push(order);
        return order;
      } catch (error) {
        logger.ERROR(error.message)
        return error.message;
      }
    }
  
    read() {
      try {
        if (OrderManager.#orders.length < 1) {
          throw new Error("There are no orders registered");
        }
        return OrderManager.#orders
      } catch (error) {
        logger.ERROR(error.message);
        return error.message;
      }
    }
  
    readOne(id) {
      try {
        const one = OrderManager.#orders.find((order) => order.oid === id);
        if (one) {
          return one;
        }
        throw new Error("Order not found");
      } catch (error) {
        logger.ERROR(error.message);
        return error.message;
      }
    }
  
    update(id, data) {
      try {
        const orderToUpdateIndex = OrderManager.#orders.findIndex((order) => order.oid === id);
        if (orderToUpdateIndex === -1) {
          throw new Error(`There is not any order with id: ${id}`);
        }
  
        const { pid, uid, quantity, state } = data;
  
        if (!pid && !uid && !quantity && !state) {
          throw new Error("Complete at least one field to update");
        }
  
        if (pid) {
          OrderManager.#orders[orderToUpdateIndex].pid = pid;
        }
  
        if (uid) {
          OrderManager.#orders[orderToUpdateIndex].uid = uid;
        }
  
        if (quantity) {
          OrderManager.#orders[orderToUpdateIndex].quantity = quantity;
        }
  
        if (state) {
          OrderManager.#orders[orderToUpdateIndex].state = state;
        }
  
        return OrderManager.#orders[orderToUpdateIndex];
      } catch (error) {
        logger.ERROR(error.message);
        return error.message;
      }
    }
  
    destroy(id) {
      try {
        const initialLength = OrderManager.#orders.length;
        OrderManager.#orders = OrderManager.#orders.filter((order) => order.oid !== id);
        
        if (initialLength === OrderManager.#orders.length) {
          throw new Error(`There is not any order with id: ${id}`);
        }
  
        return `Order with id ${id} has been deleted successfully`;
      } catch (error) {
        logger.ERROR(error.message);
        return error.message;
      }
    }
  }
  
  export const orders = new OrderManager();
  