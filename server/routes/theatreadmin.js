const router = require("express").Router();
const mongoose = require("mongoose")
const Tadmin = mongoose.model('Theatreadmin')
const Movie = require("../models/movieModel");
const Show = require("../models/showModel")
const authenticate = require("../middleware/tauthenticate")
// const Tadmin = require("../models/TadminModel")

router.post("/request", async(req, res) => {
    const { tname, temail, tpassword, cpassword, gstNum, address, city, state, pincode, inspectionDate } = req.body;
    if (!tname || !temail || !tpassword || !cpassword || !gstNum || !address || !city || !state || !pincode || !inspectionDate) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        const preuser = await Tadmin.findOne({ temail: temail });
        const gstUser = await Tadmin.findOne({ gstNum: gstNum });
        if (preuser || gstUser) {
            res.status(422).json({ error: "Something went wrong" })
        } else if (tpassword !== cpassword)
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        else {
            const finaltAdmin = new Tadmin({
                tname,
                temail,
                tpassword,
                gstNum,
                address,
                city,
                state,
                pincode,
                inspectionDate
            });
            const storeData = await finaltAdmin.save();
            res.status(201).json({ status: 201, storeData })
        }
    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
})

router.post("/theatreadminlogin", async(req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await Tadmin.findOne({temail:email});
    //    res.status(201).json({ status: 201, userValid })
        if(userValid){
            const isMatch = await Tadmin.findOne({tpassword:userValid.tpassword});
            // console.log(isMatch)

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{
                const isValid = await Tadmin.findOne({tpassword:userValid.tpassword, isApproved: "approved"});
                if(isValid){
                    // console.log("login")
                const token = await userValid.generateAuthtoken();
                // console.log("token")
                // res.cookie("usercookie",token,{
                //     expires:new Date(Date.now()+9000000),
                //     httpOnly:true,
                // });

                const result = {
                    userValid,
                    token
                }
                // res.setHeader('userCookie','isLoggedIn=true')
                res.status(201).json({status:201,result})
                } else {
                    res.status(422).json({status: 422, error:"Your request has not been granted!!"})
                }
                
            }
        } else{
            res.status(422).json({error:"email doesn't exist"})
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
})

router.get("/options", async(req,res) => {
    try {
        const movies = await Movie.find({}).sort({movieName:1});
        res.status(201).json({status:201,movies});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})

// router.get("/validadmin",authenticate,async(req,res)=>{
//     try {
//         const ValidUserOne = await Tadmin.findOne({_id:req.userId});
//         res.status(201).json({status:201,ValidUserOne});
//     } catch (error) {
//         res.status(401).json({status:401,error});
//     }
//     // console.log("done")
// });
router.get("/validadmin",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await Tadmin.findOne({_id:req.userId, isApproved:'approved'});
        if(ValidUserOne)
            res.status(201).json({status:201,ValidUserOne});
        else
        {
            // console.log("else block");
            res.status(401).json({status:401, error: "You cannot add Show"})
        }
    } catch (error) {
        res.status(401).json({status:401,error});
    }
    // console.log("done")
});

router.get("/tlogout",authenticate,async(req,res)=>{
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

router.post("/addShow", async(req, res) => {
    let { movie, timing, normalPrice, executivePrice, premiumPrice, theatreName, date } = req.body;
    
    // const array = timing.split(":")
    
    // if(array[0] >= 12){
    //     timing = timing + 'PM'
    // } else {
    //     timing = timing + 'AM'
    // }
    const show = {timing, normalPrice, executivePrice, premiumPrice}

    try {
        const findShow = await Show.findOne({movie:movie, theatreName:theatreName, date:date})
        if(findShow){
            await Show.findOneAndUpdate(
                {movie:movie, theatreName:theatreName, date:date},
                {$push: { show: show }}
            )
            res.status(201).json({ status:201 })
        }
        else{
            const newShow = new Show({
                movie, show, theatreName, date
            })
            const storeData = await newShow.save();
            res.status(201).json({ status:201, storeData })
        }
        
    } catch(error){
        res.status(422).json(error)
        console.log("catch block error")
    }
})

module.exports = router