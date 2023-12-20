const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.init();
    this.path = path;
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
        id:
          this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1,
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

  read() {
    return fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        const parsedData = JSON.parse(res);
        console.log(parsedData);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  readOne(id) {
    return fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        const parsedData = JSON.parse(res);
        const one = parsedData.find((x) => x.id === id);
        if (!one) {
          throw new Error("Producto no encontrado");
        }
        console.log(one);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

const product = new ProductManager("./main/fs/data/products.json");

product.create({ title: "microfono", photo: "url", price: 40, stock: 15 });
product.read();
product.readOne(3);
