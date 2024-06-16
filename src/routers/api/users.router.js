// import user from "../../data/fs/user.fs.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy, readByEmail, toggleUserRole } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"],create);
    
    this.read("/", ["PUBLIC"], read);
    
    this.read("/:uid", ["ADMIN"],readOne);
    
    this.read("/email/:email", ["ADMIN"],readByEmail)
    
    this.update("/:uid", ["ADMIN"],update)

    this.update("/premium/:uid", ["ADMIN", "PREM"], toggleUserRole)
    
    this.destroy("/:uid", ["ADMIN"],destroy)
  }
}

export default UsersRouter;
