const Article = require("../models/article");

// Like an article
const likeArticle = (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findByIdAndUpdate(
    articleId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((article) => {
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }
      res.send(article);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid article ID" });
      } else {
        res.status(500).send({ message: "Error liking article" });
      }
    });
};

// Dislike an article (remove like)
const dislikeArticle = (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findByIdAndUpdate(
    articleId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((article) => {
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }
      res.send(article);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid article ID" });
      } else {
        res.status(500).send({ message: "Error disliking article" });
      }
    });
};

module.exports = {
  likeArticle,
  dislikeArticle,
};