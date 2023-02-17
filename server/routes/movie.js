const router = require("express").Router();
const Movie = require("../models/movieModel");

router.get("/movies", async(req,res) => {
    try {
        const movies = await Movie.find({});
        res.status(201).json({status:201,movies});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})

router.post("/addMovie", async(req,res) => {
    console.log(req.body)
    const {movieName, releaseDate, duration, description,genre,certificate,dimensions} = req.body
    
    try{
        const movieValid = await Movie.findOne({movieName:movieName})

        if(movieValid){
            res.status(422).json({error: "This movie already exist!"})
        } else {
            const finalMovie = new Movie({
                movieName, dimensions, releaseDate, description, certificate, duration, genre
            })

            const storeData = await finalMovie.save();
            res.status(201).json({status:201, storeData})
        }
    } catch(error){
        res.status(422).json(error);
        console.log("catch block error");
    }

})

module.exports = router