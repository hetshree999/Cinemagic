const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set("strictQuery", false);

// const DB = process.env.ATLAS_URL
// console.log(DB)


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connection established!");
})

// mongoose.connect(DB,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(()=> console.log("DataBase Connected")).catch((errr)=>{
//     console.log(errr);
// })