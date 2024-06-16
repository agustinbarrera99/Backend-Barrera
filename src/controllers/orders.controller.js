import service from "../services/orders.services.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";
import repository from "../repositories/product.rep.js";

class OrdersController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;

      const product = await repository.readOne(data.product_id);
      if (req.user.role === 2 && product.owner_id.toString() === req.user._id.toString()) {
        throw CustomError.new(errors.message("No puedes agregar tus propios productos al carrito"));
      }
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const user = req.user;
      const filter = { user_id: user._id };
      const all = await this.service.read({ filter });
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
      const { oid } = req.params;
      const response = await this.service.readOne(oid);
      if (response) {
        return res.success200(response);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const order = await this.service.readOne(oid);
      if (order.user_id.toString() !== req.user._id.toString()) {
        throw CustomError.new(errors.message("No puedes editar ordenes que no te pertenecen"));
      }
      const response = await this.service.update(oid, data);
      if (response) {
        return res.success200(response);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const order = await this.service.readOne(oid);

      if (order.user_id.toString() !== req.user._id.toString()) {
        throw CustomError.new(errors.message("No puedes eliminar ordenes de otros usuarios"));
      }
      const response = await this.service.destroy(oid);
      if (response) {
        return res.success200(response);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const user_id = req.user._id;
      const response = await this.service.report(user_id);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
export const { create, read, readOne, update, destroy, report } = controller;

