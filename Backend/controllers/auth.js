const User = require("../models/User")
const bcrypt = require("bcrypt");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken")

const register = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            password:hash,
            email:req.body.email
        })
    
        const user = await newUser.save();
        
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const login = async(req,res,next)=>{
    console.log(req.body)
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user) return next(createError(404,"User not found penchod"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(404,"wrong username or password"));

        const{isAdmin,password, ...otherDetails} = user._doc;
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json({...otherDetails});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}