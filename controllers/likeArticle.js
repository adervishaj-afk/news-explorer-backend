const Article = require("../models/article.js");
const BadRequestError = require("../utils/errors/BadRequestError"); // Assuming you have a BadRequestError class

// Like (or create) an article
const likeArticle = (req, res) => {
  const {
    articleId,
    title,
    description,
    urlToImage,
    publishedAt,
    sourceName,
    url,
  } = req.body;
  const userId = req.user._id;

  // First check if the article already exists in the database
  Article.findOne({ articleId })
    .then((article) => {
      if (!article) {
        // If article does not exist, create a new one
        console.log("Article not found, creating a new one.");
        return Article.create({
          articleId,
          title,
          description,
          url,
          urlToImage,
          publishedAt,
          sourceName,
          bookmarkedBy: [userId], // Add the current user as the first to bookmark it
        });
      } else {
        // If article exists, check if user has already bookmarked it
        if (article.bookmarkedBy.includes(userId)) {
          const newError = new Error("Article already bookmarked by user.");
          newError.statusCode = 409;
          throw newError;
        }
        // If not bookmarked yet, add user to bookmarkedBy
        return Article.findByIdAndUpdate(
          article._id,
          { $addToSet: { bookmarkedBy: userId } }, // Add the user to bookmarkedBy array
          { new: true }
        );
      }
    })
    .then((article) => {
      res.status(200).send(article); // Send back the created/updated article
    })
    .catch((err) => {
      if (err.statusCode) {
        res.status(err.statusCode).send({ message: err.message });
        return;
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid ID format" });
        return;
      }
      console.error("Error in likeArticle:", err);
      res.status(500).send({ message: "Error liking article" });
    });
};

// Delete (or unlike) an article
const deleteArticle = (req, res) => {
  const articleId = req.params.articleId;
  const userId = req.user._id;

  console.log("Received articleId from params:", articleId);
  console.log("Received userId from token:", userId);

  // Find the article by the custom articleId (not _id)
  Article.findOne({ _id: articleId })
    .then((article) => {
      console.log(article);
      if (!article) {
        console.log("Article not found for articleId:", articleId);
        return res.status(404).send({ message: "Article not found" });
      }

      // If found, remove the user from the bookmarkedBy array
      return Article.findByIdAndUpdate(
        article._id,
        { $pull: { bookmarkedBy: userId } },
        { new: true }
      );
    })
    .then((updatedArticle) => {
      if (!updatedArticle) return;

      // If no users have bookmarked the article, delete it
      if (updatedArticle.bookmarkedBy.length === 0) {
        return Article.findByIdAndRemove(updatedArticle._id);
      }

      return res.status(200).send(updatedArticle); // Otherwise return the updated article
    })
    .then(() => {
      res.status(200).send({ message: "Article removed successfully" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid ID format" });
      } else {
        console.error("Error in deleteArticle:", err);
        res.status(500).send({ message: "Error unliking article" });
      }
    });
};

module.exports = { likeArticle, deleteArticle };