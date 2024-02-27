import { verifyToken } from "../utils/token.util.js";

const isAdmin = (req, res, next) => {
  try {
    const userData = verifyToken(req.cookies.token)
    const { role } = userData;
    console.log(userData)
    if (role === 1) {
      return next();
    } else {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export default isAdmin;
