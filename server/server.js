const express = require('express')
const app = express()
require('./database/connection')
require('dotenv').config();
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const userRouter = require('./routes/auth')
const TadminRouter = require('./routes/theatreadmin')
const movieRouter = require('./routes/movie')
const adminRouter = require('./routes/admin')
const cors = require("cors")
const port = 5000

// app.get("/", (req,res)=>{
//     res.status(201).json("server created")
// })

app.use(express.json())
app.set("trust proxy",1)
app.use(cors({credentials:true}))
app.use(userRouter)
app.use(TadminRouter)
app.use(adminRouter)
app.use(movieRouter)

app.listen(port,()=>{
    console.log(`Server start at port no: ${port}`)
})