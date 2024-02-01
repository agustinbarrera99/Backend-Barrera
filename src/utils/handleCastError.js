const handleCastError = (error) => {
  if (error.name === "CastError") {
    const notFoundError = new Error("Invalid ID format");
    notFoundError.statusCode = 404;
    throw notFoundError;
  }
  throw error;
};

export default handleCastError;
