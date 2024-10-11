const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new UnauthorizedError("Authorization header is missing"));
    // return res
    //   .status(errorMessages.AUTHENTICATION_ERROR)
    //   .send({ message: errorMessages.AuthenticationError });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // Add the payload to the request object
    next(); // Pass the request to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return next(new UnauthorizedError("Invalid or expired token"));
    // return res
    //   .status(errorMessages.AUTHENTICATION_ERROR)
    //   .send({ message: errorMessages.AuthenticationError });
  }

  return null;
};

module.exports = auth;
