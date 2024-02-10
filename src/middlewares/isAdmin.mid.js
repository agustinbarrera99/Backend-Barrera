const isAdmin = (req, res, next) => {
  try {
    const { role } = req.session;
    if (role === 2) {
      return next();
    } else {
      const error = new Error("forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

export default isAdmin;
