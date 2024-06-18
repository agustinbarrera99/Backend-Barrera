import service from "../services/users.services.js";
import CustomError from "../utils/errors/CustomError.util.js";

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
      const options = {
        limit: parseInt(req.query.limit) || 10,
        page: parseInt(req.query.page) || 1,
        sort: req.query.sort ? { title: req.query.sort } : {},
        lean: true,
      };
      const filter = {};
      
      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), "i");
      }
      
      const all = await this.service.read({ filter, options });
      if (all.docs.length > 0) {
        return res.success200(all);
      } else {
        throw CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await this.service.readOne(uid);
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error)
    }
  }
  readByEmail = async (req, res, next) => {
    try {
      const {email} = req.params
      const response = await this.service.readByEmail(email)
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const { uid } = req.params
      const data = req.body
      const response = await this.service.update(uid, data)
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error)
    }
  }
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params
      const response = await this.service.destroy(uid)
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error)
    }
  }
  toggleUserRole = async (req, res, next) => {
    try {
      const {uid} = req.params
      const response = await this.service.toggleUserRole(uid)
      return res.success200(response)
    } catch (error) {
      
    }
  }
}

export default UsersController
const controller = new UsersController()
export const { create, read, readOne, update, destroy, readByEmail, toggleUserRole } = controller