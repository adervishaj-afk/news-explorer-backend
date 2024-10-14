const {NODE_ENV} = process.env;

const { JWT_SECRET = NODE_ENV === "production" ? JWT_SECRET : "dev-secret"} = process.env;

module.exports = {
  JWT_SECRET,
};
