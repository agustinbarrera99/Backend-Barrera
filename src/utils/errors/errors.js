const errors = {
  error: { statusCode: 400, message: "Error!" },
  message: (message) => ({ statusCode: 400, message }),
  callbackPass: (message, statusCode) => ({ statusCode, message }),
  invalidId: { statusCode: 400, message: "Invalid ID format" },
  existsPass: { statusCode: 401 ,message: "User already exists" },
  badAuth: { statusCode: 401, message: "Bad Auth!" },
  forbidden: { statusCode: 403, message: "Forbidden" },
  notFound: { statusCode: 404, message: "Not found docs!" },
  fatal: { statusCode: 500, message: "Server error" },
};

export default errors;
