import fs from "fs";
import crypto from "crypto";
import CustomError from "../../utils/errors/CustomError.util.js";
import logger from "../../utils/logger/index.js";
import errors from "../../utils/errors/errors.js";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  init() {
    const fileExists = fs.existsSync(this.path);
    if (fileExists) {
      const fileData = fs.readFileSync(this.path, "utf-8");
      if (fileData.trim() !== "") {
        this.products = JSON.parse(fileData);
      }
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  async create(data) {
    try {
      this.products.push(data);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      return data;
    } catch (error) {
      logger.ERROR(error.message);
      throw error; 
    }
  }

  async read({ filter = {}, options = {} }) {
    try {
      if (this.products.length === 0) {
        throw CustomError.new(errors.notFound);
      }

      let filteredProducts = this.products;

      if (filter.title) {
        filteredProducts = filteredProducts.filter(product =>
          new RegExp(filter.title, "i").test(product.title)
        );
      }

      if (filter.owner_id) {
        filteredProducts = filteredProducts.filter(product =>
          product.owner_id !== filter.owner_id
        );
      }

      const { limit = 10, page = 1, sort = {} } = options;
      let paginatedProducts = filteredProducts;

      if (sort.title) {
        const sortOrder = sort.title === "asc" ? 1 : -1;
        paginatedProducts = paginatedProducts.sort((a, b) => {
          if (a.title < b.title) return -1 * sortOrder;
          if (a.title > b.title) return 1 * sortOrder;
          return 0;
        });
      }

      const total = paginatedProducts.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = paginatedProducts.slice(startIndex, endIndex);

      return {
        docs: results,
        totalDocs: total,
        limit: limit,
        page: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      };
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = this.products.find(x => x._id === id);
      if (!one) {
        throw CustomError.new(errors.notFound);
      } else {
        return one;
      }
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.readOne(id);

      if (!one) {
        throw CustomError.new(errors.notFound);
      }
      this.products = this.products.filter(x => x._id !== id);
      await this.saveProducts();
      return one;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.readOne(id);
      for (let key in data) {
        one[key] = data[key];
      }
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }
  async saveProducts() {
    const jsonData = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, jsonData);
  }
}

const products = new ProductManager("./src/data/fs/files/products.json");

export default products;