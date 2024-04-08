import users from "../data/mongo/users.mongo.js";
import service from "../services/users.services.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
  
      const sortAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { email: 1 }
      }
  
      const filter = {}
  
      if(req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), 'i')
      }
  
      const response = await this.service.read({filter, sortAndPaginate});
        return res.success200(response)
    } catch (error) {
      return next(error)
    }
  }
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await this.service.readOne(uid);
        return res.success200(response)
    } catch (error) {
      return next(error)
    }
  }
  readByEmail = async (req, res, next) => {
    try {
      const {email} = req.params
      const response = await this.service.readByEmail(email)
      return res.success200(response)
  
    } catch (error) {
      return next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const { uid } = req.params
      const data = req.body
      const response = await this.service.update(uid, data)
      return res.success200(response)
    } catch (error) {
      return next(error)
    }
  }
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params
      const response = await this.service.destroy(uid)
      return res.success200(response)
    } catch (error) {
      return next(error)
    }
  }
}

export default UsersController
const controller = new UsersController()
export const { create, read, readOne, update, destroy, readByEmail } = controller