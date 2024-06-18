import service from "../services/products.services.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.owner_id = req.user._id;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      
      if (req.user && req.user.role === 2) {
        filter.owner_id = { $ne: req.user._id };
      }
      
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
        filter.owner_id = { $ne: req.user._id };
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }


      const all = await this.service.read({ filter, options });
      if (all.docs.length > 0) {
        return res.success200(all);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.readOne(pid);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const user = req.user;
      const data = req.body;
      const { pid } = req.params;
      const product = await this.service.readOne(pid);

      if (user.role !== 1 && product.owner_id.toString() !== user._id.toString()) {
        throw CustomError.new(errors.message("No puedes editar productos que no te pertenecen"));
      }

      const response = await this.service.update(pid, data, user);
      if (response) {
        return res.success200(response);
      } else {
        throw CustomError.new(errors.notFound);
      }
    } catch (error) {
      if (error.statusCode === 403) {
        return res.error403();  
      }
      return next(error);
    }
  };
  
  destroy = async (req, res, next) => {
    try {
      const user = req.user;
      const { pid } = req.params;
      const product = await this.service.readOne(pid);

      if (user.role !== 1 && product.owner_id.toString() !== user._id.toString()) {
        throw CustomError.new(errors.message("No puedes eliminar productos que no te pertenecen"));
      }

      const response = await this.service.destroy(pid, user);
      if (response) {
        return res.success200(response);
      } else {
        throw CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
  readMe = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.user && req.user.role === 2) {
        filter.owner_id = { $eq: req.user._id };
      }
      const all = await this.service.read({ filter, options });
      if (all.docs.length > 0) {
        return res.success200(all);
      } else {
        CustomError.new(errors.notFound);
      }
      return res.success200(response)
    } catch (error) {
      next(error)
    }
  }
}

export default ProductsController;
const controller = new ProductsController();
export const { create, read, readOne, update, destroy, readMe } = controller;
