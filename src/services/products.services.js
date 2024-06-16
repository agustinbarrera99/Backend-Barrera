import repository from "../repositories/product.rep.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

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
  async update(id, data, user) {
    try {
      const product = await this.repository.readOne(id);
      if (!product) {
        CustomError.new(errors.notFound); 
      }
      if (user.role === 1 || (user.role === 2 && product.owner_id.toString() === user._id.toString())) {
        const response = await this.repository.update(product._id, data, { new: true });
        return response;
      } else {
        CustomError.new(errors.forbidden);  
      }
    } catch (error) {
      throw error;
    }
  }
  destroy = async(pid, user) => {
    try {
        const product = await this.repository.readOne(pid)

        if (user.role === 1) {
          const response = await this.repository.destroy(pid)
          return response
        }
        if (user.role === 2 && user._id.toString() === product.owner_id.toString()) {
          const response = await this.repository.destroy(pid)
          return response
        }
    } catch (error) {
        throw error
    }
  }
}

const service = new ProductsService()
export default service

