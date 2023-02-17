const router = require("express").Router();
const mongoose = require("mongoose")
const Tadmin = mongoose.model('Theatreadmin')
// const Tadmin = require("../models/TadminModel")

router.post("/request", async(req, res) => {
    console.log(req.body)
        const { tname, temail, tpassword,cpassword } = req.body;
        if (!tname || !temail || !tpassword || !cpassword) {
            res.status(422).json({ error: "fill all the details" })
        }
        try{
            const preuser = await Tadmin.findOne({ temail: temail });
            if (preuser) {
                res.status(422).json({ error: "This Email is Already Exist" })
            }
            else if(tpassword !== cpassword)
                res.status(422).json({ error: "Password and Confirm Password Not Match" })
            else{
                const finaltAdmin = new Tadmin({
                    tname, temail, tpassword
                });
                const storeData = await finaltAdmin.save();
                res.status(201).json({ status: 201, storeData })
            }
        }catch (error) {
            res.status(422).json(error);
            console.log("catch block error");
        }
})

module.exports = router