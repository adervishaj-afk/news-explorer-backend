const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../utils/errors/NotFoundError");
const BadRequestError = require("../utils/errors/BadRequestError");
const ConflictError = require("../utils/errors/ConflictError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

// Environment variable for secret key (should be in .env)
const { NODE_ENV, JWT_SECRET } = process.env;

// Create a new user (signup)
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        password: hash,
      });
    })
    .then((user) => {
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password; // Do not send password back
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("User with this email already exists"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid user data"));
      } else {
        next(err);
      }
    });
};

// Login user (signin)
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password") // Password field is hidden by default in the schema
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Incorrect email or password");
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" } // Token valid for 7 days
        );

        // Send token to client
        res.send({ token });
      });
    })
    .catch(next);
};

// Get the current user's information
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.status(200).send(user);
    })
    .catch(next);
};

// Update user profile (name or avatar)
const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data for updating profile"));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, login, getCurrentUser, updateUser };
