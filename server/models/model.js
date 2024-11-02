const mongoose = require("mongoose");

// Enum values for Type and Property
const TypeEnum = ["buy", "rent"];
const PropertyEnum = ["apartment", "house", "condo", "land"];

// PostDetail Schema
const postDetailSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  utilities: { type: String },
  pet: { type: String },
  income: { type: String },
  size: { type: Number },
  school: { type: Number },
  bus: { type: Number },
  restaurant: { type: Number },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    unique: true,
    required: true,
  },
});

// SavedPost Schema
const savedPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavedPost" }],
  chatIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

// Chat Schema
const chatSchema = new mongoose.Schema({
  userIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  lastMessage: { type: String },
});

// Message Schema
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  type: { type: String, enum: TypeEnum, required: true },
  property: { type: String, enum: PropertyEnum, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postDetail: postDetailSchema,
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavedPost" }],
});

// Models
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const PostDetail = mongoose.model("PostDetail", postDetailSchema);
const SavedPost = mongoose.model("SavedPost", savedPostSchema);
const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = {
  User,
  Post,
  PostDetail,
  SavedPost,
  Chat,
  Message,
};
