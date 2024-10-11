const router = require("express").Router();
const { getCurrentUser, updateUser, createUser, login } = require("../controllers/user");
const { validateUpdateUser, validateLogin, validateCreateUser } = require("../middlewares/validation");
const auth = require("../middlewares/auth");

// Route to create a new user (sign up)
router.post("/signup", validateCreateUser, createUser);

// Route to login user (sign in)
router.post("/signin", validateLogin, login);

// Route to get the current user's profile, with authentication
router.get("/me", auth, getCurrentUser);

// Route to update user information, with validation and authentication
router.patch("/me", auth, validateUpdateUser, updateUser);

module.exports = router;




