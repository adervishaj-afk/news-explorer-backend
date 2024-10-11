const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message("Invalid URL format");
};

// Validation for creating an item
const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    imageUrl: Joi.string().custom(validateURL).required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

// Validation for creating a user
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().custom(validateURL).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().custom(validateURL).required(),
  }),
});

module.exports = {
  validateCreateItem,
  validateCreateUser,
  validateLogin,
  validateId,
  validateUpdateUser,
};
