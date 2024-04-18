import { createLogger, format, transports, addColors } from "winston";

const { colorize, simple } = format;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };

const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "green" };
addColors(colors);

export default createLogger({
  levels,
  format: colorize(),
  transports: [
    new transports.Console({ level: "HTTP", format: simple() }),
    new transports.File({
      level: "WARN",
      format: simple(),
      filename: "./src/utils/errors/errors.log",
    }),
  ],
});
