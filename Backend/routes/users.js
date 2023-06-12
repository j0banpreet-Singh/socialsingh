const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { updateUser, deleteUser, getUser, getUsers, followUser, unfollow, searchResult } = require("../controllers/users")
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken")

// Update a user
router.put("/:id", verifyUser, updateUser);

// Delete a user
router.delete("/:id", verifyUser, deleteUser);

// Get a specific user
router.get("/:id", getUser)

// Get all users
router.get("/", verifyAdmin, getUsers)

// Follow a user
router.put("/:id/follow", followUser)

//unfollow a user
router.put("/:id/unfollow", unfollow)

// search a friend
router.get("/search/:username", searchResult)

module.exports = router;