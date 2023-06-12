const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {createPost,updatePost,deletePost,likePost,getPost,getAllPosts,getTimeline} = require("../controllers/posts");
const {verifyUser, verifyToken} = require("../utils/verifyToken")

// Create Post
router.post("/",createPost);

// Update Post
router.put("/:id",verifyToken,updatePost);

// Delete post
router.delete("/:id",verifyToken,deletePost);

// Like a post
router.put("/:id/like",verifyToken,likePost);

// Get a post
router.get("/:id",getPost);

// Get individual's posts
router.get("/profile/all",verifyToken,getAllPosts)

//Get all timeline posts
router.get("/timeline/all/:id",verifyToken,getTimeline)
module.exports = router;