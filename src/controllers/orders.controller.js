import orders from "../data/mongo/orders.mongo.js";
import users from "../data/mongo/users.mongo.js"
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";
import products from "../data/mongo/products.mongo.js";

class OrdersController {
  constructor() {
    this.model = orders;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      console.log(data)
      const product = await products.readOne(data.product_id);
      console.log(product)
      if (req.user.role === 2 && product.owner_id.toString() === req.user._id.toString()) {
        throw CustomError.new(errors.message("No puedes agregar tus propios productos al carrito"));
      }
  
      const response = await this.model.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read =  async (req, res, next) => {
    try {
      const user = req.user
      const filter = {
        user_id: user._id
      };
      const all = await this.model.read({ filter });
      if (all.docs.length > 0) {
        return res.success200(all);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  }
  update =  async (req, res, next) => {
    try {
      const { oid } = req.params
      const data = req.body
      const response = await this.model.update(oid, data)
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error)
    }
  }
  readOne =  async (req, res, next) => {
    try {
      const {uid} = req.params
  
      const response = await this.model.report(uid)
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      next(error)
    }
  }
  destroy = async(req, res, next) => {
    try {
      const { oid } = req.params
      const response = await this.model.destroy(oid)
      if (response ) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error)
    }
  
  }
}

export default OrdersController
const controller = new OrdersController()

export const {create, read, readOne, update, destroy } = controller
