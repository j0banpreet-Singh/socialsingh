const createError = require("../utils/error");
const Post = require("../models/Post");
const User = require("../models/User")

const createPost = async(req,res,next)=>{
    try {
        const post = new Post(req.body);
        const newPost = await post.save();

        res.status(200).json(newPost);
    } catch (error) {
        next(error)
    }
}

const updatePost = async(req,res,next)=>{
    try {
       const post = await Post.findById(req.params.id);
       if(post.userId === req.user.id){
            await post.updateOne({$set:req.body});
            res.status(200).json("post has been updated")
       }else{
        next(createError(403,"you can only update your post"))
       }
    } catch (error) {
        next(error)
    }
}

const deletePost = async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(req.user.id === post.userId){
            await post.deleteOne()
            res.status(200).json("post has been successfully deleted")
        }else{
            next(createError(403,"you can only delete your post"))
        }
    } catch (error) {
        next(error)
    }
}

const likePost = async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.user.id)){
           await post.updateOne({$push:{likes:req.user.id}})
           res.status(200).json("post has been liked")
        }else{
            await post.updateOne({$pull:{likes:req.user.id}})
            res.status(200).json("post has been disliked")
        }
    } catch (error) {
        next(error)
    }
}

const getPost = async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

const getAllPosts = async(req,res,next)=>{
    try {
        const userPosts = await Post.find({userId:req.user.id});
        res.send(userPosts)
    } catch (error) {
        next(error)
    }
}

const getTimeline = async(req,res,next)=>{
    try {
        const currentUser = await User.findById(req.params.id)
        const userPosts = await Post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId=>{
                return Post.find({userId:friendId})
            })
        )

        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getAllPosts,
    getTimeline
}