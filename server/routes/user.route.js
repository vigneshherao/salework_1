const express = require("express");
const {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
  getNotificationNumber,
} = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", getUsers);
// router.get("/search/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotificationNumber);

module.exports = router;
