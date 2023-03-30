const mongoose = require("mongoose")

const showSchema = new mongoose.Schema({
    movie: { type: String, required: true },
    show: [{
        timing: { type: String, required: true },
        normalPrice: { type: Number, required: true },
        executivePrice: { type: Number, required: true },
        premiumPrice: { type: Number, required: true },
        booked: [],
    }],
    theatreName: { type: String, required: true },
    date: { type: Date }
});

const Show = new mongoose.model("shows", showSchema);
module.exports = Show