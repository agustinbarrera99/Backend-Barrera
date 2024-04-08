import ProductDTO from "../dto/products.dto.js";
import dao from "../data/index.factory.js";
const { products } = dao;

class ProductsRep {
  constructor() {
    this.model = products;
  }
  create = async (data) => {
    data = new ProductDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async (filterAndOptions) => {
    const response = await this.model.read(filterAndOptions);
    return response;
  };
  readOne = async (id) => {
    const response = await this.model.readOne(id);
    return response;
  };
  update = async (id, data) => {
    const response = await this.model.update(id, data);
    return response;
  };
  destroy = async (id) => {
    const response = await this.model.destroy(id);
    return response;
  };
}

const repository = new ProductsRep();
export default repository;
