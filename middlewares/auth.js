const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("Auth middleware called");

  if (!authorization) {
    return next(new UnauthorizedError("Authorization header is missing"));
  }

  const token = authorization.replace("Bearer ", "");
  console.log("Token received:", token); 

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token payload:", payload);

    req.user = payload;
    console.log("User ID from token:", req.user._id);

    next(); // Pass the request to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};

module.exports = auth;
