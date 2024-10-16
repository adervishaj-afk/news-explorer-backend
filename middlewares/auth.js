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
    const payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "dev-secret",);
    req.user = payload; // Add the payload to the request object
    next(); // Pass the request to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return next(new UnauthorizedError("Invalid or expired token"));
  }

  return null;
};

module.exports = auth;
