const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  id: { type: Number, unique: true },
  name: { type: String },
  avatar_url: { type: String },
  company: { type: String },
  location: { type: String },
  blog: { type: String },
  bio: { type: String },
  email: { type: String },
  public_repos: { type: Number },
  public_gists: { type: Number },
  followers: { type: Number },
  following: { type: Number },
  created_at: { type: Date },
  updated_at: { type: Date },
  isDeleted: { type: Boolean, default: false },
  friends: [String],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
