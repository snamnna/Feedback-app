const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "oletus";

// generic function for token signing
function tokenSign(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// function for token decoding
function tokenDecode(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = { tokenSign, secretKey, tokenDecode };
