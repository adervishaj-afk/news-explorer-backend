const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateId,
  validateArticleData,
} = require("../middlewares/validation");
const { likeArticle, deleteArticle } = require("../controllers/likeArticle");

const {
  getArticles, // Get all bookmarked articles
} = require("../controllers/article");

// Get all bookmarked articles for the authenticated user
router.get("/saved", auth, getArticles);

// GET localhost:3001/articles
// POST .../articles

// Delete (Unsave) a bookmarked article
router.delete("/:articleId/delete", auth, validateId, deleteArticle);
//  Saved a bookmarked article
router.post(
  "/:articleId/like",
  auth,
  validateId,
  validateArticleData,
  likeArticle
);

module.exports = router;
