const router = require("express").Router();
const userRouter = require("./user");
const articleRouter = require("./article");

// Routes
router.use("/user", userRouter);
router.use("/article", articleRouter);

// Handle undefined routes
router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;
