const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateId } = require("../middlewares/validation");
const { likeArticle, deleteArticle } = require("../controllers/likeArticle");

const {
  getArticles, // Get all bookmarked articles
} = require("../controllers/article");

// Get all bookmarked articles for the authenticated user
router.get("/saved", auth, getArticles);

// Delete (Unsave) a bookmarked article
router.delete(
  "/:articleId/unlike",
  auth,
  //  validateId,
  deleteArticle
);
//  Saved a bookmarked article
router.put(
  "/:articleId/like",
  auth,
  // validateId,
  likeArticle
);

module.exports = router;
