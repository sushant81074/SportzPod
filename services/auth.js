const jwt = require("jsonwebtoken");
const secretKey = "!@#$%^&*()_+{}";

const createToken = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
};
const validateToken = async (token) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};

module.exports = { createToken, validateToken };
