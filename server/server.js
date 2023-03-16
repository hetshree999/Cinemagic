const express = require('express')
const app = express()
const bodyParser = require("body-parser")
require('./database/connection')
require('dotenv').config();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const port = 5000
const router = require("express").Router();
router.use(express.static(__dirname + "/public/"))

const userRouter = require('./routes/auth')
const TadminRouter = require('./routes/theatreadmin')
const movieRouter = require('./routes/movie')
const adminRouter = require('./routes/admin')
const bookingRouter = require('./routes/booking')

app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(bodyParser.json({limit: "50mb"}));

app.use(express.json())
app.set("trust proxy",1)
app.use(cors({credentials:true}))
app.use(cookieParser())
app.use("/image", express.static('uploads'))
app.use(userRouter)
app.use(TadminRouter)
app.use(adminRouter)
app.use(movieRouter)
app.use(bookingRouter)

app.listen(port,()=>{
    console.log(`Server start at port no: ${port}`)
})