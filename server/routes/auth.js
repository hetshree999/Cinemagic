const router = require("express").Router();
var bcrypt = require("bcryptjs");
const User = require("../models/userModel")

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

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                console.log(token)

                // cookiegenerate
                // res.cookie("usercookie",token,{
                //     expires:new Date(Date.now()+9000000),
                //     httpOnly:true
                // });

                // const result = {
                //     userValid,
                //     token
                // }
                // res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
})

module.exports = router