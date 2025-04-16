const mongoose = require('mongoose');

// Define the Post Schema
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postId: { type: String },
  likes: { type: Number, default: 0 }, // Add more fields as needed
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  name: {type: String , default: 'Your Name'},
  about: {type: String, default: 'Tell us about yourself!'},
  profilePic: {type: String, default: ''},
  reviews: {type: [{ type: reviewSchema, default: ['This Initial review by server, You can edit this or even post new.',] }]},
}, { timestamps: true });

const Userbookapp = mongoose.model('Userbookapp', userSchema);

module.exports = Userbookapp;
