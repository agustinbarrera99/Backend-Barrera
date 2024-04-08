import repository from "../repositories/user.rep.js";
import sendEmail from "../utils/sendEmail.util.js";

class UsersService {
  constructor() {
    this.repository = repository
  }
  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  read = async({filter, sortAndPaginate}) => {
    try {
      const response = await this.repository.read({filter, sortAndPaginate})
      return response
    } catch (error) {
      throw error      
    }
  }
  readOne = async(id) => {
    try {
      const response = await this.repository.readOne(id)
      return response
    } catch (error) {
      throw error
    }
  }
  readByEmail = async(email) => {
    try {
      const response = await this.repository.readByEmail(email)
      return response
    } catch (error) {
      throw error
    }
  }
  update = async(id, data) => {
    try {
      const response = await this.repository.update(id, data)
      return response
    } catch (error) {
      throw error
    }
  }
  destroy = async(id) => {
    try {
      const response = await this.repository.destroy(id)
      return response
    } catch (error) {
      throw error
    }
  }
  register = async(data)=> {
    try {
      await sendEmail(data)
    } catch (error) {
      throw error
    }
  }
}

const service = new UsersService()
export default service
