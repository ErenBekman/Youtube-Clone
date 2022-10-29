const jwt = require("jsonwebtoken");
const { createError } = require("./error");
const User = require(".././models/user");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, async (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = await User.findById(user.id);
    next();
  });
};

module.exports = authenticateToken;
