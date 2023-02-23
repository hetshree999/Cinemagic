const mongoose = require("mongoose")

const showSchema = new mongoose.Schema({
    movie: { type: String, required: true },
    timing: { type: String, required: true },
    price: { type: String, required: true },
    theatreName: { type: String, required: true }
});

const Show = new mongoose.model("shows", showSchema);
module.exports = Show;