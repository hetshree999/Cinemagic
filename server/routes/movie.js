const mongoose = require("mongoose")
const multer  = require('multer');
const express = require('express')
const Movie = require("../models/movieModel");
const router = require("express").Router();
const Show = require("../models/showModel")
const Tadmin = mongoose.model('Theatreadmin')

router.get("/movies", async(req,res) => {
    try {
        const movies = await Movie.find({});
        res.status(201).json({status:201,movies});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})

router.get("/dash", async(req,res) => {
    try {
        const movies = await Movie.find({}).limit(6);
        res.status(201).json({status:201,movies});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})

const Storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb)=>{
    cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({
    storage:Storage
}).single('poster')

router.post("/addMovie", upload, async(req,res) => {
    // console.log(req.body)
    try{
        const movieValid = await Movie.findOne({movieName:req.body.movieName})

        if(movieValid){
            res.status(422).json({status:422, message: "This movie already exist!"})
        } else {
            const finalMovie = new Movie({
                movieName: req.body.movieName, 
                dimensions: req.body.dimensions, 
                releaseDate: req.body.releaseDate, 
                description: req.body.description, 
                certificate: req.body.certificate, 
                duration: req.body.duration, 
                genre: req.body.genre,
                image: req.file.filename
            })
            const storeData = await finalMovie.save();
            res.status(201).json({status:201, storeData, message: "Movie added successfuly!"})
        }
    } catch(error){
        res.status(422).json(error);
        console.log("catch block error");
    }

})

// router.post("/addMovie", async(req,res) => {
//     console.log(req.body)
//     const {movieName, releaseDate, duration, description,genre,certificate,dimensions} = req.body
    
//     try{
//         const movieValid = await Movie.findOne({movieName:movieName})

//         if(movieValid){
//             res.status(422).json({status:422, error: "This movie already exist!"})
//         } else {
//             const finalMovie = new Movie({
//                 movieName, dimensions, releaseDate, description, certificate, duration, genre
//             })

//             const storeData = await finalMovie.save();
//             res.status(201).json({status:201, storeData})
//         }
//     } catch(error){
//         res.status(422).json(error);
//         console.log("catch block error");
//     }

// })

router.post("/getDetails", async(req,res) => {
    // console.log(req.body)
    const _id= req.body.id
    try {
        const detail = await Movie.findOne({_id:_id});
        res.status(201).json({status:201,detail});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})

router.post("/getShows", async(req,res) => {
    console.log(req.body)
    const movie = (req.body.name).replace("%20", " ")
    const date = req.body.showdate
    try {
        const theatres = await Tadmin.find({},{tname:1, _id:0})
        const detail = await Show.find({movie:movie, date:date}).sort({theatreName:1});
        res.status(201).json({status:201,detail,theatres});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})

router.put("/updateMovie/:id",upload, async(req, res) => {
    console.log(req.body);
    Movie.findOneAndUpdate(
        { _id: req.params.id }, 
        {   movieName: req.body.name, 
            dimensions: req.body.dimensions, 
            releaseDate: req.body.releaseDate, 
            description: req.body.description, 
            certificate: req.body.certificate, 
            duration: req.body.duration, 
            genre: req.body.genre,
            image: req.file.filename
        }, (err, data) => {
            if (err) {
                res.status(500).json({ status: 500, error: err })
            } else {
                res.status(200).json({ status: 200, data })
            }
        })
        // res.status(201).json({ status: 201, user })
})

module.exports = router