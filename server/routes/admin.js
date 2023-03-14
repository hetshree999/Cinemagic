const router = require("express").Router();
const mongoose = require("mongoose")
const Tadmin = mongoose.model('Theatreadmin')
const Movie = require('../models/movieModel')
const User = require('../models/userModel')

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

router.get('/adminDash', async(req,res)=>{
    try{
        const userCount = await User.count()
        const movieCount = await Movie.count()
        const tadminCount = await Tadmin.count()
        res.status(201).json({status: 201, userCount, movieCount, tadminCount})
    } catch(error){
        res.status(422).json(error)
        console.log("catch block error")
    }
})

module.exports = router