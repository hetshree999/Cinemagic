const mongoose = require("mongoose")

const showSchema = new mongoose.Schema({
    movie: { type: String, required: true },
    show: [{
        timing: { type: String, required: true },
        price: { type: String, required: true },
        booked: [],
    }],
    theatreName: { type: String, required: true },
    date: { type: Date }
});

const Show = new mongoose.model("shows", showSchema);
module.exports = Show;