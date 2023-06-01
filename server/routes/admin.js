const router = require("express").Router();
const mongoose = require("mongoose")
const Tadmin = mongoose.model('Theatreadmin')
const Movie = require('../models/movieModel')
const User = require('../models/userModel')

router.get('/getRequest', (req, res)=>{
    Tadmin.find({isApproved:"false"},(err,data)=>{
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

router.get('/users', async(req,res) => {
    const users = await User.find({},{_id:0})
    if(users){
        res.status(201).json({status:201, users})
    }
    else{
        res.status(404).json({ status:404})
    }
})

router.get('/getMovies', (req, res) => {
    Movie.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            res.status(200).json(data)
        }
    })
})

router.put("/approve/:id", (req, res) => {
    Tadmin.findOneAndUpdate({ _id: req.params.id }, { isApproved: 'approved' }, (err, data) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            res.status(200).json(data)
        }
    })
})


router.put("/decline/:id", (req, res) => {
    Tadmin.findOneAndUpdate({ _id: req.params.id }, { isApproved: 'declined' }, (err, data) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            res.status(200).json(data)
        }
    })
})

router.get('/getRequest', (req, res) => {
    Tadmin.find({ isApproved: "false" }, (err, data) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            res.status(200).json(data)
        }
    })
});

module.exports = router