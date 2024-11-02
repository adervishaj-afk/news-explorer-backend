require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { login, createUser } = require("./controllers/user"); // Adjusted for newsexplorer
const mainRouter = require("./routes/index");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001, DATABASE_URL } = process.env;
const app = express();

// Connect to MongoDB database for the newsexplorer
mongoose
  .connect(
    DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    // "mongodb://127.0.0.1:27017/newsexplorer"
  )
  .then(() => {
    console.log("Connected to DB"); // eslint-disable-line no-console
  })
  .catch(console.error);

// Enable CORS
app.use(cors());
app.use(express.json());

// Enable the request logger before all route handlers:
app.use(requestLogger);

// Crash test route for testing error handling (optional)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Authentication routes for signing in and signing up
app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

// Main routes for articles and users
app.use("/", mainRouter);

// Enable error logging before the error handler
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line no-console
});
