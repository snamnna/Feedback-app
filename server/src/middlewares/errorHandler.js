const CustomError = require("../utils/CustomError");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // todo: replace with logger when implemented
  //console.error(err.stack);

  return res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
