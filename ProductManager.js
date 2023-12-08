class ProductManager {
    static #products = [];
    constructor() {}
    create(data) {
        try {
            const { title, photo, price, stock } = data;

            if (!title || !photo || !price || !stock ) {
                throw new Error("ingrese todos los datos (title, photo, price & stock)")
            }
            const product = {
                id: ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
                title,
                photo,
                price,
                stock
            };
            ProductManager.#products.push(product);
            return product;

        } catch (error) {
            return console.error(error.message)
        }
    }
    read() {
        try {
            if(ProductManager.#products.length < 1) {
                throw new Error("No hay productos creados")
            }
            return console.log(ProductManager.#products)
        } catch (error) {
            return error.message
        }
    }
    readOne(id) {
        try {
            let one = ProductManager.#products.find(x => x.id === (id))
            if (one) {
                return console.log(one)
            }
            throw new Error("producto no encontrado")
        } catch (error) {
            return error.message
        }
    }
}

const products = new ProductManager();

products.create({title:"microfono", photo: "url", price: 15, stock: 20})
products.create({title:"mouse", photo: "url", price: 20, stock: 15})
products.create({photo: "url", price: 30, stock:"50"})
products.read()
products.readOne(2)













