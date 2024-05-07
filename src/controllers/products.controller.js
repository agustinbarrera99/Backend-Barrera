import service from "../services/products.services.js"
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";
import logger from "../utils/logger/index.js";

class ProductsController {
  constructor() {
    this.service = service
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.owner_id = req.user._id
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
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const filterAndOptions = { filter, options };
      
      if (req.user.role === 2) {
        filter.owner_id = { $ne: req.user._id };
      }
  
      const all = await this.service.read(filterAndOptions);
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
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  }
  update = async (req, res, next) => {
    try {
      const user = req.user
      const { pid } = req.params;
      const data = req.body;
      const response = await this.service.update(pid, data, user);
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  }
  destroy = async (req, res, next) => {
    try {
      const user = req.user
      const { pid } = req.params;
      const response = await this.service.destroy(pid, user);
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  }
}

export default ProductsController
const controller = new ProductsController()
export const { create, read, readOne, update, destroy } = controller
