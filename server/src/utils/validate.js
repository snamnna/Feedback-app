const CustomError = require("./CustomError");

const validate = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new CustomError(400, error.message);
  }
};

module.exports = validate;
