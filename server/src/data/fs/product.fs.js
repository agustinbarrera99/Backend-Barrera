import fs from "fs"
import crypto from "crypto"

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
      const { title, photo, price, stock } = data;
        
      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title,
        photo,
        price,
        stock,
      };
  
      this.products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      return newProduct;
    } catch (error) {
      console.error(error.message);
      return error; 
    }
  }

  async read() {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const parsedData = JSON.parse(fileData);
      return parsedData;
    } catch (error) {
      throw error
    }
  }

  async readOne(id) {
    try {
        const fileData = await fs.promises.readFile(this.path, "utf-8")
        const parsedData = JSON.parse(fileData)
        const one = parsedData.find(x => x.id === id)
        if (!one) {
          const notFoundError = new Error("Product not found");
          notFoundError.statusCode = 400; 
          throw notFoundError;
        } else {
            return one;
        }
    } catch (error) {
        console.error(error.message);
        throw error
    }
  }

  async destroy(id) {
    try {
        const index = this.products.findIndex(x => x.id === id);
        if (index === -1) {
            const notIdError = new Error("There is not any product with id " + id);
            notIdError.statusCode = 400
            throw notIdError
        } else {
            this.products.splice(index, 1);
            const jsonData = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, jsonData);
            return id;
        }
    } catch (error) {
        console.error(error.message);
        throw error
    }
}

  async update(id, data) {
    try {
      let productToUpdateIndex = this.products.findIndex((product) => product.id === id);
      if (productToUpdateIndex === -1) {
        const notIdError = new Error(`There is not any product with id: ${id}`);
        notIdError.statusCode = 400
        throw notIdError
      }

      const { title, photo, price, stock } = data;

      if (!title && !photo && !price && !stock) {
        const notFieldComplete = new Error("complete at least one field to update");
        notFieldComplete.statusCode = 400
        throw notFieldComplete
      }

      if (title) {
        const productWithTitleExists = this.products.some(
          (product) => product.title === title && product.id !== id
        );
        if (productWithTitleExists) {
          const productExists = new Error("the product already exist");
          productExists.statusCode = 400
          throw productExists
        }
        this.products[productToUpdateIndex].title = title;
      }
      if (photo) {
        this.products[productToUpdateIndex].photo = photo;
      }

      if (price) {
        this.products[productToUpdateIndex].price = price;
      }

      if (stock) {
        this.products[productToUpdateIndex].stock = stock;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
      
      return this.products[productToUpdateIndex];
    } catch (error) {
      console.error(error.message);
      throw error
    }
  }
}



const product = new ProductManager("./src/data/fs/files/products.json");

// product.update("f2ecd3645303b901b8eccabb", {
//   title: "bicicleta",
//   stock: 1
// })

// product.create({title: "monitor", price: 50, stock: 40, photo: "url"})
// product.create({title: "teclado", price: 50, stock: 40, photo: "url"})
// product.create({title: "mouse", price: 50, stock: 40, photo: "url"})

export default product
