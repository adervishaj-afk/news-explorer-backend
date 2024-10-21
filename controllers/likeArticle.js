const Article = require("../models/article");

// Like an article (by articleId generated from title, publishedAt, and sourceName)
const likeArticle = (req, res) => {
  const articleId = decodeURIComponent(req.params.articleId); // Decoded articleId from request parameters
  const userId = req.user._id;
  // console.log("Received articleId:", articleId);
  // console.log("User ID:", userId);
  // console.log("Request body:", req.body);

  // Find the article by the generated articleId (title-publishedAt-sourceName combination)
  Article.findOne({ articleId })
    .then((article) => {
      if (!article) {
        // If the article doesn't exist, create a new one
        const { title, description, urlToImage, publishedAt, sourceName, url } =
          req.body;
        console.log("Article not found, creating a new one.");

        // Return the promise from Article.create so it continues the chain
        return Article.create({
          articleId, // Use the generated articleId as a field, not _id
          title,
          description,
          url, // Original article URL
          urlToImage,
          publishedAt,
          sourceName,
          bookmarkedBy: [userId], // Initially bookmark the article by the current user
        });
      } else {
        // If the article exists, update it to add the user to bookmarkedBy
        return Article.findByIdAndUpdate(
          article._id,
          { $addToSet: { bookmarkedBy: userId } }, // Add userId to bookmarkedBy
          { new: true } // Return the updated document
        );
      }
    })
    .then((updatedArticle) => {
      res.status(200).send(updatedArticle); // Send the updated or newly created article
    })
    .catch((err) => {
      console.error("Error in likeArticle:", err);
      res.status(500).send({ message: "Error liking article" });
    });
};

const deleteArticle = (req, res) => {
  const articleId = req.params.articleId; // This is now the string articleId
  const userId = req.user._id; // Ensure this comes from your auth middleware

  console.log("Received articleId from params:", articleId); // Log the article ID
  console.log("Received userId from token:", userId); // Log the user ID

  // Find the article by the custom articleId (not _id)
  Article.findOne({ articleId }) // Use findOne to search by articleId string
    .then((article) => {
      if (!article) {
        console.log("Article not found for articleId:", articleId);
        return res.status(404).send({ message: "Article not found" });
      }

      // If found, remove the user from the bookmarkedBy array
      return Article.findByIdAndUpdate(
        article._id,
        { $pull: { bookmarkedBy: userId } }, // Remove user from bookmarkedBy array
        { new: true } // Return the updated article
      );
    })
    .then((updatedArticle) => {
      if (!updatedArticle) return; // Ensure it doesn't proceed if not updated

      // If no users have bookmarked the article, delete it
      if (updatedArticle.bookmarkedBy.length === 0) {
        return Article.findByIdAndRemove(updatedArticle._id);
      }

      return res.status(200).send(updatedArticle); // Otherwise return the updated article
    })
    .then(() =>
      res.status(200).send({ message: "Article removed successfully" })
    )
    .catch((err) => {
      console.error("Error in deleteArticle:", err);
      res.status(500).send({ message: "Error unliking article" });
    });
};

module.exports = { likeArticle, deleteArticle };
