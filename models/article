const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: "Invalid URL format for the image.",
    },
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  sourceName: {
    type: String,
    required: true,
  },
  bookmarkedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  keywords: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("article", articleSchema);
