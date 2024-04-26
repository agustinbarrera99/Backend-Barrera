import logger from "../utils/logger/index.js";

export const winston = (req, res, next) => {
  try {
    req.logger = logger;
    const message = `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
    req.logger.HTTP(message)
    next()
  } catch (error) {
    return next(error);
  }
};
