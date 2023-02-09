const mongoose = require('mongoose');

// Schéma de données pour les posts
const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  create: { type: Date, default: Date.now},
  update: { type: Date, default: Date.now}, 
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  
});
module.exports = mongoose.model('Post', postSchema);