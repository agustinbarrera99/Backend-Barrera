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

const server = express();

const PORT = env.PORT;

const ready = () => {
  console.log(`server ready on port ${PORT}`)
};

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.listen(PORT, ready);

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

const router = new IndexRouter()

server.use(express.json());
server.use(cors({
  origin: true,
  credentials: true
}))
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(compression({
  brotli: {enabled: true, zlib: {}}
}))


server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);


