const Article = require("../models/article.js");
const BadRequestError = require("../utils/errors/BadRequestError"); // Assuming you have a BadRequestError class

// Get all saved articles for the user (articles the user has liked/bookmarked)
const getArticles = (req, res) => {
  const userId = req.user._id; // Get the user's ID from the request (auth middleware)

  // Find all articles where the user's ID exists in the bookmarkedBy array
  Article.find({ bookmarkedBy: userId })
    .then((articles) => {
      if (!articles || articles.length === 0) {
        return res.status(404).send({ message: "No saved articles found" });
      }
      res.send(articles); // Send the articles to the client
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid ID format" });
      } else {
        console.error("Error in getArticles:", err);
        res.status(500).send({ message: "Error fetching saved articles" });
      }
    });
};

module.exports = {
  getArticles,
};