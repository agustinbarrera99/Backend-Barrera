import logger from "../../utils/logger/index.js"

class ProductManager {
  static #products = [];
  constructor() {}
  create(data) {
    try {
      const { title, photo, price, stock } = data;

      if (!title || !photo || !price || !stock) {
        throw new Error(
          "ingrese todos los datos (title, photo, price & stock)"
        );
      }
      const product = {
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id +
              1,
        title,
        photo,
        price,
        stock,
      };
      ProductManager.#products.push(product);
      return product;
    } catch (error) {
      return logger.ERROR(error.message);
    }
  }
  read() {
    try {
      if (ProductManager.#products.length < 1) {
        throw new Error("there is not any product");
      }
      return ProductManager.#products
    } catch (error) {
      logger.ERROR(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      let one = ProductManager.#products.find((x) => x.id === id);
      if (one) {
        return one;
      }
      throw new Error("product not found");
    } catch (error) {
      logger.ERROR(error.message);
      return error.message;
    }
  }
  update(id, data) {
    try {
      let productToUpdateIndex = ProductManager.#products.findIndex(
        (product) => product.id === id
      );
      if (productToUpdateIndex === -1) {
        throw new Error(`There is not any product with id: ${id}`);
      }

      const { title, photo, price, stock } = data;

      if (!title && !photo && !price && !stock) {
        throw new Error("Complete at least one field to update");
      }

      if (title) {
        const productWithTitleExists = ProductManager.#products.some(
          (product) => product.title === title && product.id !== id
        );
        if (productWithTitleExists) {
          throw new Error("The product title already exists");
        }
        ProductManager.#products[productToUpdateIndex].title = title;
      }

      if (photo) {
        ProductManager.#products[productToUpdateIndex].photo = photo;
      }

      if (price) {
        ProductManager.#products[productToUpdateIndex].price = price;
      }

      if (stock) {
        ProductManager.#products[productToUpdateIndex].stock = stock;
      }

      return ProductManager.#products[productToUpdateIndex];
    } catch (error) {
      logger.ERROR(error.message);
      return error.message;
    }
  }
  destroy(id) {
    try {
      const initialLength = ProductManager.#products.length;
      ProductManager.#products = ProductManager.#products.filter(
        (product) => product.id !== id
      );

      if (initialLength === ProductManager.#products.length) {
        throw new Error(`There is not any product with id: ${id}`);
      }

      return `Product with id ${id} has been deleted successfully`;
    } catch (error) {
      logger.ERROR(error.message);
      return error.message;
    }
  }
}

export const products = new ProductManager();
