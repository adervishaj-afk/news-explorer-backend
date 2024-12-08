const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new UnauthorizedError("Authorization header is missing"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // Attach payload to req.user
    return next(); // Pass the request to the next middleware or route handler
  } catch (err) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};

module.exports = auth;