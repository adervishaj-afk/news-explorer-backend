const Article = require("../models/article");

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
      }
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
    })
    .then((article) => {
      res.status(200).send(article); // Send back the created/updated article
    })
    .catch((err) => {
      if (err.statusCode) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid data format" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID format" });
      }
      console.error("Error in likeArticle:", err); // Consider replacing with a logging library
      return res.status(500).send({ message: "Error liking article" });
    });
};

// Delete (or unlike) an article
const deleteArticle = (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  // Find the article by _id (not custom articleId)
  Article.findOne({ _id: articleId })
    .then((article) => {
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }

      // Remove the user from the bookmarkedBy array
      return Article.findByIdAndUpdate(
        article._id,
        { $pull: { bookmarkedBy: userId } },
        { new: true }
      );
    })
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return null; // This handles the case where the article was not found after the update
      }

      // If no users have bookmarked the article, delete it
      if (updatedArticle.bookmarkedBy.length === 0) {
        return Article.findByIdAndRemove(updatedArticle._id).then(() =>
          res
            .status(200)
            .send({ message: "Article unbookmarked and removed successfully" })
        );
      }

      // If other users have it bookmarked, simply return the updated article
      return res.status(200).send(updatedArticle);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID format" });
      }
      console.error("Error in deleteArticle:", err); // Consider replacing with a logging library
      return res.status(500).send({ message: "Error unliking article" });
    });
};

module.exports = { likeArticle, deleteArticle };
