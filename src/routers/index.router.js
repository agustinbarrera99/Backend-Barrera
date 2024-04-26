import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.router.js"
import ViewsRouter from "./views/index.view.js";

const api = new ApiRouter()
const views = new ViewsRouter()

class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", api.getRouter())
    this.router.use("/", views.getRouter())
  }
}

export default IndexRouter
