import CustomError from "./errors/CustomError.util.js";
import errors from "./errors/errors.js";

const has8char = (password) => {
  if (password.length < 8) {
    // const error = new Error("the password must contain at least 8 characters")
    // error.statusCode = 400
    // throw error
    CustomError.new(
      errors.message("the password must contain at least 8 characters")
    );
  }
};

export default has8char;
