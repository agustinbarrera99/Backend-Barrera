import fs from "fs"
import crypto from "crypto"
import notFoundOne from "../../utils/errors/CustomError.util.js";
import logger from "../../utils/logger/index.js";

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
      return error; 
    }
  }

  async read({ filter = {}, options = {} }) {
    try {
      if (this.products.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      }

      let filteredProducts = this.products;
      if (Object.keys(filter).length > 0) {
        filteredProducts = this.products.filter(product => {
          return Object.keys(filter).every(key => product[key] === filter[key]);
        });
      }

      const { limit = 10, page = 1, sort = null } = options;
      let paginatedProducts = filteredProducts;

      if (sort) {
        const [sortField, sortOrder] = sort.split(' ');
        paginatedProducts = paginatedProducts.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
          } else {
            return a[sortField] < b[sortField] ? 1 : -1;
          }
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
        const one = this.products.find(x => x._id === id)
        if (!one) {
          const notFoundError = new Error("NOT FOUND!");
          notFoundError.statusCode = 404; 
          throw notFoundError;
        } else {
            return one;
        }
    } catch (error) {
      logger.ERROR(error.message);
        throw error
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
      this.products = this.products.filter(x => x._id !== id);
      const jsonData = JSON.stringify(this.events, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async update(eid, data) {
    try {
      const one = this.readOne(eid)
      notFoundOne(one)
      for (let x in data) {
        one[x] = data[x] 
      }
      const jsonData = JSON.stringify(this.products, null, 2)
      await fs.promises.writeFile(this.path, jsonData)
      return one
    } catch (error) {
      logger.ERROR(error.message);
      throw error
    }
  }
}



const products = new ProductManager("./src/data/fs/files/products.json");

export default products
