import orders from "../data/mongo/orders.mongo.js";
import users from "../data/mongo/users.mongo.js"

class OrdersController {
  constructor() {
    this.model = orders;
  }

  create = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await this.model.create(data);
        return res.success201(response)
    } catch (error) {
      return next(error)
    }
  }
  read =  async (req, res, next) => {
    try {
      const token = req.cookies.token
      const userData = verifyToken(token)
      const user = await users.readByEmail(userData.email)
      console.log(user)
      const filter = {
        user_id: user._id
      };
      const all = await this.model.read({ filter });
      return res.success200(all)
    } catch (error) {
      return next(error);
    }
  }
  update =  async (req, res, next) => {
    try {
      const { oid } = req.params
      const data = req.body
      const response = await this.model.update(oid, data)
      return res.success200(response)
    } catch (error) {
      return next(error)
    }
  }
  readOne =  async (req, res, next) => {
    try {
      const {uid} = req.params
  
      const response = await this.model.report(uid)
      return res.success200(response)
    } catch (error) {
      next(error)
    }
  }
  destroy = async(req, res, next) => {
    try {
      const { oid } = req.params
      const response = await this.model.destroy(oid)
      return res.success200(response)
    } catch (error) {
      return next(error)
    }
  
  }
}

export default OrdersController
const controller = new OrdersController()

export const {create, read, readOne, update, destroy } = controller
