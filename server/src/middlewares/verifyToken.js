const { tokenDecode } = require("../utils/jwtUtils");
const CustomError = require("../utils/CustomError");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  if (!token) throw new CustomError(403, "Token missing");
  try {
    req.user = await tokenDecode(token);
    next();
  } catch (err) {
    throw new CustomError(403, "Invalid token");
  }
};

module.exports = verifyToken;
