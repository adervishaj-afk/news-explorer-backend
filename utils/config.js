const { NODE_ENV, JWT_SECRET } = process.env;

const config = {
  JWT_SECRET: NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
};

module.exports = config;
