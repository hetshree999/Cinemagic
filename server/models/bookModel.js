const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    moviename: { type: String, required: true },
    theatrename: { type: String, required: true },
    showtime: { type: String, required: true },
    bookingdate: { type:Date, required:true },
    showdate: { type:Date, required:true },
    normalprice: { type: Number, required: true },
    executiveprice: { type: Number, required: true },
    premiumprice: { type: Number, required: true },
    totalprice: {type: Number, required: true},
    seatnumber: [],
    userid: { type: String, required:true }
});

const Book = new mongoose.model("books", BookSchema);
module.exports = Book