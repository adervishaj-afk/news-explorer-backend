const Article = require("../models/article");
// const NotFoundError = require("../errors/not-found-error");
// const ForbiddenError = require("../errors/forbidden-error");

// Get all saved articles for the user
const getArticles = (req, res) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.send(articles))
    .catch(() => res.status(500).send({ message: "Error fetching articles" }));
};

// Delete a saved article
const deleteArticle = (req, res) => {
  const { articleId } = req.params;
  const owner = req.user._id;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }
      if (article.owner.toString() !== owner) {
        return res
          .status(403)
          .send({
            message: "You don't have permission to delete this article",
          });
      }

      return Article.findByIdAndRemove(articleId);
    })
    .then(() => res.send({ message: "Article deleted successfully" }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid article ID" });
      } else {
        res.status(500).send({ message: "Error deleting article" });
      }
    });
};

module.exports = {
  getArticles,
  deleteArticle,
};
