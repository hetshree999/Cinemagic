const mongoose = require("mongoose")
const Movie = require("../models/movieModel");
const router = require("express").Router();
const Show = require("../models/showModel")
const Book = require("../models/bookModel")
const Tadmin = mongoose.model('Theatreadmin')

router.post("/addBooking", async(req,res) => {
    // console.log(req.body)
    const seat = req.body.seat
    const movie = req.body.movie
    const theatre = req.body.theatre
    const time = req.body.time
    const price = req.body.price
    const total = req.body.total
    const showdate = req.body.showdate
    const bookingdate = Date.now()
    const userid = req.body.userid
    // console.log(seat)

    try{
        const findShow = await Show.findOne({movie:movie, theatreName:theatre, date:showdate, show:{$elemMatch:{timing:time}}})
        if(findShow){
            await Show.findOneAndUpdate(
                {movie:movie, theatreName:theatre, date:showdate, show:{$elemMatch:{timing:time}}},
                {$push: { "show.$.booked": { $each: seat }}}
            )

            const finalBooking = new Book({
                movie, theatre, time, bookingdate, showdate, price, total, seat, userid  
            })
            const storeData = finalBooking.save()
            res.status(201).json({ status:201, storeData })
            
        }
    } catch(error){
        res.status(422).json(error)
        console.log("catch block error")
    }

    
})

router.post("/getBookedSeat", async(req,res) => {
    const movie = req.body.movie
    const theatre = req.body.theatre
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