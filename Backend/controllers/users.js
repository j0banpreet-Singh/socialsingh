const User = require("../models/User")
const createError = require("../utils/error")

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been successfully deleted")
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(createError(404, "user not found"))
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const followUser = async (req, res, next) => {
    if (req.body.currentUserId != req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.currentUserId)

            if (!user.followers.includes(req.body.currentUserId)) {
                await user.updateOne({ $push: { followers: req.body.currentUserId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })
                res.status(200).json("user has been successfully added")
            } else {
                res.status(200).json("you already follow this user")
            }
        } catch (error) {
            next(error)
        }
    } else {
        res.status(403).json("you cannot follow yourself")
    }
}

const unfollow = async (req, res, next) => {
    console.log(req.body.currentUserId)
    console.log(req.params.id)
    if (req.body.currentUserId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.currentUserId);

            if (user.followers.includes(req.body.currentUserId)) {
                await user.updateOne({ $pull: { followers: req.body.currentUserId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json("you don't follow this user")
            }
        } catch (error) {
            next(error)
        }
    } else {
        res.status(403, "you cannot unfollow yourself")
    }
}

const searchResult = async (req,res,next) => {
    console.log(req.params.username)
    try {
        const data = await User.find({
            "$or": [
                { username: { $regex: "^" + req.params.username } }
            ]
        })

        res.json(data)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    followUser,
    unfollow,
    searchResult
}