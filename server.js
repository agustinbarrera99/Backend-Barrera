import "dotenv/config.js"
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import product from "./src/data/fs/product.fs.js";
import dbConnection from "./src/utils/dbConnection.js";

const server = express();

const PORT = process.env.PORT;

const ready = () => {
  console.log(`server ready on port ${PORT}`)
  dbConnection()
};

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

socketServer.on("connection", async (socket) => {
  console.log(socket.id);
  socket.emit("products", await product.read());
  socket.on("newProduct", async (data) => {
    try {
      await product.create(data);
    } catch (error) {
      console.error(error);
    }
  });
  socket.emit("products", await product.read());
});

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views/");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
