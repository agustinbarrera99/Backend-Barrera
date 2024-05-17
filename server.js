import env from "./src/utils/env.util.js";
import express from "express";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import IndexRouter from "./src/routers/index.router.js";
import cors from "cors"
import compression from "express-compression";
import { winston } from "./src/middlewares/winston.mid.js";
import logger from "./src/utils/logger/index.js";
import { options as swaggerOptions } from "./src/utils/swagger.util.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import cluster from "cluster"
import { cpus } from "os";


const server = express();

const PORT = env.PORT;

const specs = swaggerJSDoc(swaggerOptions)

const ready = () => {
  logger.INFO(`server ready on port ${PORT}`)
};

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(cookieParser(env.SECRET_KEY))
// server.use(expressSession({
//   secret: process.env.SECRET_KEY,
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({
//     ttl: 7 * 24 * 60 * 60,
//     mongoUrl: process.env.DB_LINK
//   }),
// }))

server.use("/api/docs", serve, setup(specs))
const router = new IndexRouter()
server.use(express.json());
server.use(cors({
  origin: true,
  credentials: true
}))
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
// server.use(morgan("dev"));
server.use(winston)
server.use(compression({
  brotli: {enabled: true, zlib: {}}
}))


server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

if (cluster.isPrimary) {
  const numberOfProcess = cpus().length
  for (let i = 1; i <= numberOfProcess; i++) {
    cluster.fork()
  }
} else {
  server.listen(PORT, ready);
}

