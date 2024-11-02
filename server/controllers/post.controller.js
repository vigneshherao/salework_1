const jwt = require("jsonwebtoken");
const { User, Post, Chat, Message } = require("../models/model"); // Make sure this is using Mongoose models

const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await Post.find({
      city: query.city || undefined,
      type: query.type || undefined,
      property: query.property || undefined,
      bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
      price: {
        $gte: query.minPrice ? parseInt(query.minPrice) : undefined,
        $lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id)
      .populate("postDetail")
      .populate("user", "username avatar");

    const token = req.cookies?.token;

    let isSaved = false;
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const saved = await SavedPost.findOne({ userId: payload.id, postId: id });
      isSaved = !!saved;
    }

    res.status(200).json({ ...post.toObject(), isSaved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await Post.create({
      ...body.postData,
      userId: tokenUserId,
      postDetail: body.postDetail, // Adjust based on your schema
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

module.exports = { getPost, getPosts, addPost, updatePost, deletePost };
