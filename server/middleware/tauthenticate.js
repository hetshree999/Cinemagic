const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const Tadmin = mongoose.model('Theatreadmin')
// const userdb = require("../models/userModel");
const keysecret = process.env.JWTPRIVATEKEY


const tauthenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        // console.log(token)
        const verifytoken = jwt.verify(token,keysecret);
        // console.log(verifytoken)
        const rootUser = await Tadmin.findOne({_id:verifytoken._id});
        // console.log(rootUser)
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}


module.exports = tauthenticate