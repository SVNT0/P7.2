const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schéma de données pour les utilisateurs
const userSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prénom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: Number, default: 0},
  createAt: { type: Date, default: Date.now},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
