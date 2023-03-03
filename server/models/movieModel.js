const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    movieName: { type: String, required: true, trim: true },
    dimensions: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    description: { type: String, required: true },
    certificate: { type: String, required: true },
    duration: { type: String, required: true }, 
    // casts:[
    //     {
    //         castImage:{
    //             data: Buffer
    //         },
    //         castName:{
    //             type: String
    //         }
    //     }
    // ],
    // crews:[
    //     {
    //         crewImage:{
    //             data: Buffer
    //         },
    //         crewName:{
    //             type: String
    //         },
    //         crewProf:{
    //             type: String
    //         }
    //     }
    // ],
    genre: [String],
    image: String
});

const Movie = new mongoose.model("movies", MovieSchema);
module.exports = Movie;