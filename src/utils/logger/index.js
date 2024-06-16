import argsUtil from "../../utils/args.util.js";
const environment = argsUtil.env;

let logger;

switch (environment) {
  case "prod":
    const { default: winstonProd } = await import("./winstonProd.util.js");
    logger = winstonProd;
    break;
  case "dev":
    const { default: winstonDev } = await import("./WinstonDev.util.js");
    logger = winstonDev;
    break;
  case "test":
    const { default: winstonTest } = await import("./WinstonDev.util.js");
    logger = winstonTest;
  default:
    break;
}

export default logger;
