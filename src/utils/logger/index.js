import argsUtil from "../../utils/args.util.js";
//   si uso winston en la consola me sale [object, object]
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
  default:
    break;
}

export default logger;
