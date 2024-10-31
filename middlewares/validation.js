const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message("Invalid URL format");
};

const validateArticleData = celebrate({
  body: Joi.object().keys({
    articleId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    urlToImage: Joi.string().optional().allow("").custom(validateURL),
    publishedAt: Joi.string().optional(),  // Allow as a string
    sourceName: Joi.string().optional(),
    keywords: Joi.array().items(Joi.string()).optional(),  // Allow an optional array of strings
    url: Joi.string().required().custom(validateURL),
  }),
});

// Validation for creating a user
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    // avatar: Joi.string().custom(validateURL).required(),
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
    articleId: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateId,
  validateUpdateUser,
  validateURL,
  validateArticleData
};
