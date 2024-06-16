import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.router.js"

const api = new ApiRouter()

class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", api.getRouter())
  }
}

export default IndexRouter
