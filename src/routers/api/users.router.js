import { Router } from "express";
// import user from "../../data/fs/user.fs.js";
import users from "../../data/mongo/users.mongo.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy, readByEmail } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", create);
    
    this.read("/", read);
    

    this.read("/:uid", readOne);
    
    this.read("/email/:email", readByEmail)
    
    this.update("/:uid", update)
    
    this.destroy("/:uid", destroy)
  }
}





export default UsersRouter;
