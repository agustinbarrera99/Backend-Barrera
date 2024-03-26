import { config } from "dotenv";

import args from "./args.util.js";

const { env } = args;

let path = "";

if (env === "prod") {
  path = "./.env.prod";
} else if (env === "test") {
  path = "./.env.test";
} else {
  path = "./.env.dev";
}

config({ path });

export default {
  PORT: 8080,

  DB_LINK:
    process.env.DB_LINK,

  SECRET_KEY: process.env.SECRET_KEY,

  SECRET: process.env.SECRET,

  GOOGLE_ID:
    process.env.GOOGLE_ID,

  GOOGLE_CLIENT: process.env.GOOGLE_CLIENT
};
