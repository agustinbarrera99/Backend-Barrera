import { Router } from "express";
// import user from "../../data/fs/user.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", async (req, res, next) => {
      try {
        const data = req.body;
        const response = await users.create(data);
          return res.success201(response)
      } catch (error) {
        return next(error)
      }
    });
    
    this.read("/", async (req, res, next) => {
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
    
        const response = await users.read({filter, sortAndPaginate});
          return res.success200(response)
      } catch (error) {
        return next(error)
      }
    });
    

    this.read("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await users.readOne(uid);
          return res.success200(response)
      } catch (error) {
        return next(error)
      }
    });
    
    this.read("/email/:email", async (req, res, next) => {
      try {
        const {email} = req.params
        const response = await users.readByEmail(email)
        return res.success200(response)
    
      } catch (error) {
        return next(error)
      }
    })
    
    this.update("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params
        const data = req.body
        const response = await users.update(uid, data)
        return res.success200(response)
      } catch (error) {
        return next(error)
      }
    })
    
    this.destroy("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params
        const response = await users.destroy(uid)
        return res.success200(response)
      } catch (error) {
        return next(error)
      }
    })
  }
}



export default UsersRouter;
