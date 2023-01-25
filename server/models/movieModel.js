const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    movieName: { type: String, required: true, trim: true },
    price: { type: String, required: true },
    dimensions: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    description: { type: String, required: true },
    certificate: { type: String, required: true },
    duration: { type: String, required: true },
    casts:[
        {
            castImage:{
                data: Buffer
            },
            castName:{
                type: String, required: true 
            },
            castProf:{
                type: String, required: true 
            }
        }
    ],
    crews:[
        {
            crewImage:{
                data: Buffer
            },
            crewName:{
                type: String, required: true 
            },
            crewProf:{
                type: String, required: true 
            }
        }
    ],
    genre: [String],
    image: { data: Buffer, contentType: String }
});

const Movie = new mongoose.model("movies", MovieSchema);
module.exports = Movie;