// import user from "../../data/fs/user.fs.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy, readByEmail, toggleUserRole } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"],create);
    
    this.read("/", read);
    
    this.read("/:uid", readOne);
    
    this.read("/email/:email", readByEmail)
    
    this.update("/:uid", update)

    this.update("/premium/:uid", ["ADMIN", "PREM"], toggleUserRole)
    
    this.destroy("/:uid", destroy)
  }
}





export default UsersRouter;
