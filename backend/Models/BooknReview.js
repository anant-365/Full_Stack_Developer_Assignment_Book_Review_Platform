const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Schema for book reviews
const commentSchema = new Schema({
  text: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Book Schema
const BookSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  genre: { type: String, trim: true },
  summary: { type: String, trim: true },
  coverImage: { type: String, trim: true }, // image URL
  publicationYear: { type: Number },
  isbn: { type: String, trim: true, unique: true },
  lastReviewed: { type: Date, default: Date.now },
  addedBy: { type: String, trim: true }, // username of uploader
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
}, { timestamps: true });

const BooknReview = mongoose.model('BooknReview', BookSchema);

module.exports = BooknReview;