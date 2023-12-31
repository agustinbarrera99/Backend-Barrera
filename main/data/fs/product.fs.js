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

  create(data) {
    try {
      const { title, photo, price, stock } = data;

      if (!title || !photo || !price || !stock) {
        throw new Error(
          "ingrese todos los datos (title, photo, price & stock)"
        );
      }
      const productExists = this.products.some(
        (product) => product.title === title
      );
      if (productExists) {
        throw new Error("El producto ya esta registrado en la base de datos");
      }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title,
        photo,
        price,
        stock,
      };
      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error(error.message);
    }
  }

  async read() {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const parsedData = JSON.parse(fileData);
      return parsedData;
    } catch (error) {
      error.message;
    }
  }

  async readOne(id) {
    try {
        const fileData = await fs.promises.readFile(this.path, "utf-8")
        const parsedData = JSON.parse(fileData)
        const one = parsedData.find(x => x.id === id)
        if (!one) {
            throw new Error("product not found");
        } else {
            return one;
        }
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
  }

  async destroy(id) {
    try {
      let one = this.products.find(x => x.id === id)
      if (!one) {
        throw new Error("there is not any product with id " + id)
      } else {
        this.products = this.products.filter(x => x.id !== id)
        const jsonData = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile(this.path, jsonData)
        return id 
      }
    } catch (error) {
      console.error(error.message)
      return error.message
    }
  }
}


const product = new ProductManager("./main/data/fs/files/products.json");

product.destroy("00eca66a69d21fc89f8a9ebf")

// product.create({title: "monitor", price: 50, stock: 40, photo: "url"})
// product.create({title: "teclado", price: 50, stock: 40, photo: "url"})
// product.create({title: "mouse", price: 50, stock: 40, photo: "url"})

export default product
