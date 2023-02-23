const router = require("express").Router();
const mongoose = require("mongoose")
const Tadmin = mongoose.model('Theatreadmin')

router.get('/getRequest', (req, res)=>{
    Tadmin.find((err,data)=>{
        if(err){
            res.status(500).json({error:err})
        }
        else{
            res.status(200).json(data)
        }
    })
});

module.exports = router