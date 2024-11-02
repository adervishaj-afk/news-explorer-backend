const router = require("express").Router();
const userRouter = require("./user");
const articleRouter = require("./article");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");
const { login, createUser } = require("../controllers/user");

// Routes
router.use("/user", userRouter);
router.use("/article", articleRouter);
// Authentication routes for signing in and signing up
router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);


// Handle undefined routes
router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;
