const { validateToken } = require("../services/auth");

const authenticate = (req, res, next) => {
  const token = req.cookie?.token;
  if (!token) return res.status(400).redirect("/login");

  try {
    const userInfo = validateToken(token);
    req.user = userInfo;
    next();
  } catch (error) {
    return res.status(500).redirect("/login");
  }
};
