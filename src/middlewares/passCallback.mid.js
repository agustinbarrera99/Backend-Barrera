import passport from "passport";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

const passCallbackMid = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        // return res.json({
        //   statusCode: info.statusCode || 401,
        //   message: info.message || info.toString(),
        // });
        CustomError.new(errors.callbackPass(info.message || info.toString(), info.statusCode || 401))
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};

export default passCallbackMid 