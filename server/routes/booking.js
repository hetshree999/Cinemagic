const mongoose = require("mongoose")
const Movie = require("../models/movieModel");
const router = require("express").Router();
const Show = require("../models/showModel")
const Book = require("../models/bookModel")
const Tadmin = mongoose.model('Theatreadmin')

router.post("/addBooking", async(req,res) => {
    
    const seatnumber = req.body.seat
    const moviename = (req.body.movie).replace("%20", " ")
    const theatrename = (req.body.theatre).replace("%20", " ")
    const showtime = req.body.time
    const bookingprice = req.body.price
    const totalprice = req.body.total
    const showdate = req.body.showdate
    const bookingdate = Date.now()
    const userid = req.body.userid
    console.log(seatnumber)

    try{
        const findShow = await Show.findOne({movie:moviename, theatreName:theatrename, date:showdate, show:{$elemMatch:{timing:showtime}}})
        if(findShow){
            await Show.findOneAndUpdate(
                {movie:moviename, theatreName:theatrename, date:showdate, show:{$elemMatch:{timing:showtime}}},
                {$push: { "show.$.booked": { $each: seatnumber }}}
            )

            const finalBooking = new Book({
                moviename, theatrename, showtime, bookingdate, showdate, bookingprice, totalprice, seatnumber, userid  
            })
            console.log(finalBooking)
            const storeData = await finalBooking.save()
            res.status(201).json({ status:201, storeData })
            
        }
    } catch(error){
        res.status(422).json(error)
        console.log("catch block error")
    }

    
})

router.post("/getBookedSeat", async(req,res) => {
    const movie = (req.body.movie).replace("%20", " ")
    const theatre = (req.body.theatre).replace("%20", " ")
    const time = req.body.time
    const price = req.body.price
    const showdate = req.body.showdate
    try{
        const seat = await Show.findOne({movie:movie, theatreName:theatre, date:showdate, show:{$elemMatch:{timing:time}}},{show:{booked:1},_id:0})
        res.status(201).json({status:201,seat});
    } catch(error) {
        res.status(422).json(error)
    }
})

module.exports = router