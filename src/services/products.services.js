import repository from "../repositories/product.rep.js";

class ProductsService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  read = async (filterAndOptions) => {
    try {
      const response = await this.repository.read(filterAndOptions);
      console.log(filterAndOptions)
      return response;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (id) => {
    try {
      const response = await this.repository.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const response = await this.repository.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async(id) => {
    try {
        const response = await this.repository.destroy(id)
        return response
    } catch (error) {
        throw error
    }
  }
}

const service = new ProductsService()
export default service

