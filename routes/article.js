const router = require('express').Router();
const auth = require("../middlewares/auth");
const { validateSaveArticle, validateId } = require("../middlewares/validation");

const {
  getArticles, // Get all bookmarked articles
  deleteArticle, // Unsave (delete) a bookmarked article
} = require("../controllers/article");

// Get all bookmarked articles for the authenticated user
router.get("/", auth, getArticles);

// Delete (Unsave) a bookmarked article
router.delete("/:articleId", auth, validateId, deleteArticle);

module.exports = router;