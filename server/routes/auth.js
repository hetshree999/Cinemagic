const router = require("express").Router();
var bcrypt = require("bcryptjs");
const User = require("../models/userModel")
const Movie = require("../models/movieModel");
const TAdmin = require("../models/TAdminModel");
const Booking = require("../models/bookModel")
const authenticate = require("../middleware/authenticate")
const tauthenticate = require("../middleware/tauthenticate")

//---------User Registration-------------//

router.post("/register", async(req, res) => {
    console.log(req.body)
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new User({
                name, email, password
            });

            // here password hasing
            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
})

//-----------User Login------------//

router.post("/login", async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await User.findOne({email:email});
        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);
            console.log(isMatch)

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{
                const token = await userValid.generateAuthtoken();
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true,
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        } else{
            res.status(422).json({error:"email doesn't exist"})
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
})

router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await User.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})





module.exports = router