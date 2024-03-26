import { users } from "../data/mongo/manager.mongo.js";

class UsersService {
  constructor() {
    this.model = users;
  }
  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  read = async({filter, sortAndPaginate}) => {
    try {
      const response = await this.model.read({filter, sortAndPaginate})
      return response
    } catch (error) {
      throw error      
    }
  }
  readOne = async(id) => {
    try {
      const response = await this.model.readOne(id)
      return response
    } catch (error) {
      throw error
    }
  }
  readByEmail = async(email) => {
    try {
      const response = await this.model.readByEmail(email)
      return response
    } catch (error) {
      throw error
    }
  }
  update = async(id, data) => {
    try {
      const response = await this.model.update(id, data)
      return response
    } catch (error) {
      throw error
    }
  }
  destroy = async(id) => {
    try {
      const response = await this.model.destroy(id)
      return response
    } catch (error) {
      throw error
    }
  }
}

const service = new UsersService()
export default service
