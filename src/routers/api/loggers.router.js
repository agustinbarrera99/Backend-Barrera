import CustomRouter from "../CustomRouter.js";
import logger from "../../utils/logger/index.js";

class LoggersRouter extends CustomRouter {
  init() {
    this.read("/http", ["PUBLIC"], async (req, res, next) => {
      try {
        logger.HTTP("log de http");
        return res.json({
          message: "log de http",
        });
      } catch (error) {
        next(error);
      }
    });
    this.read("/info", ["PUBLIC"], async (req, res, next) => {
      try {
        logger.INFO("log de info");
        return res.json({
          message: "log de info",
        });
      } catch (error) {
        next(error);
      }
    });
    this.read("/error", ["PUBLIC"], async (req, res, next) => {
      try {
        logger.ERROR("log de error");
        return res.json({
          message: "log de error",
        });
      } catch (error) {
        next(error);
      }
    });
    this.read("/fatal", ["PUBLIC"], async (req, res, next) => {
      try {
        logger.FATAL("log de fatal");
        return res.json({
          message: "log de fatal",
        });
      } catch (error) {
        next(error);
      }
    });
  }
}

export default LoggersRouter;
