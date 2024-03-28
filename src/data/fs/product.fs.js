import fs from "fs"
import crypto from "crypto"
import notFoundOne from "../../utils/NotFoundOne.utils.js";

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
      console.error(error.message);
      return error; 
    }
  }

  async read({filter, options}) {
    //corregir luego el filtro y paginacion
    try {
      if(this.products.length === 0) {
        const error = new Error("NOT FOUND!")
        error.statusCode = 404
        throw error
      }
      return this.products
    } catch (error) {
      throw error
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
      throw error
    }
  }
}



const products = new ProductManager("./src/data/fs/files/products.json");

export default products
