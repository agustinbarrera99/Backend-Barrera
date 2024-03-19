import env from "./src/utils/env.util.js";
import express from "express";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import dbConnection from "./src/utils/dbConnection.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session"
import MongoStore from "connect-mongo";
import IndexRouter from "./src/routers/index.router.js";
import args from "./src/utils/args.util.js"
import cors from "cors"

const server = express();

const PORT = env.PORT || 8080;

const ready = () => {
  console.log(`server ready on port ${PORT}`)
  dbConnection()
};

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.listen(PORT, ready);

server.use(cookieParser(process.env.SECRET_KEY))
server.use(expressSession({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    ttl: 7 * 24 * 60 * 60,
    mongoUrl: process.env.DB_LINK
  }),
}))

const router = new IndexRouter()

server.use(express.json());
server.use(cors({
  origin: true,
  credentials: true
}))
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);


